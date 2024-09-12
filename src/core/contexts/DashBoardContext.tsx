import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useParams } from 'next/navigation';

import { getCards, getMembers } from '@core/api/cardApis';
import { getColumns, getDashboardDetail } from '@core/api/columnApis';
import { CardServiceResponseDto } from '@core/dtos/CardsDto';
import { ColumnServiceResponseDto } from '@core/dtos/ColumnsDto';
import { MemberApplicationServiceResponseDto } from '@core/dtos/MembersDto';

export interface CardList2D {
  columnId: number;
  cardList: CardServiceResponseDto[];
}

export interface DashBoardContextValue {
  cardList2D: CardList2D[];
  setCardList2D: React.Dispatch<React.SetStateAction<CardList2D[]>>;
  columnList: ColumnServiceResponseDto[];
  setColumnList: React.Dispatch<
    React.SetStateAction<ColumnServiceResponseDto[]>
  >;
  dashboardColor: string;
  members: MemberApplicationServiceResponseDto[];
  moveCard: (
    beforeColumnId: number,
    afterMoveCard: CardServiceResponseDto
  ) => void;
}

const DEFAULT_VALUE: DashBoardContextValue = {
  cardList2D: [
    {
      columnId: 0,
      cardList: [
        {
          id: 0,
          title: '',
          description: '',
          tags: [],
          dueDate: null,
          assignee: null,
          imageUrl: null,
          teamId: '',
          columnId: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    },
  ],
  setCardList2D: () => {},
  columnList: [
    {
      id: 0,
      title: '',
      teamId: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],

  setColumnList: () => {},
  dashboardColor: '',
  members: [],
  moveCard: () => {},
};

export const DashBoardContext =
  createContext<DashBoardContextValue>(DEFAULT_VALUE);

function DashBoardProvider({ children }: PropsWithChildren) {
  const [cardList2D, setCardList2D] = useState<CardList2D[]>(
    DEFAULT_VALUE.cardList2D
  );
  const [columnList, setColumnList] = useState<ColumnServiceResponseDto[]>(
    DEFAULT_VALUE.columnList
  );
  const [dashboardColor, setDashboardColor] = useState<string>('');
  const [members, setMembers] = useState<MemberApplicationServiceResponseDto[]>(
    []
  );

  const { dashboardid } = useParams();
  const loadCards = useCallback(async (columnId: number) => {
    const nextCards = await getCards(columnId);
    if (nextCards.length) {
      setCardList2D(prev => [...prev, { columnId, cardList: nextCards }]);
    } else {
      setCardList2D(prev => [...prev, { columnId, cardList: [] }]);
    }
  }, []);

  const moveCard = useCallback(
    (beforeColumnId: number, afterMoveCard: CardServiceResponseDto) => {
      const { columnId: afterColumnId } = afterMoveCard;
      setCardList2D(prevCardList2D => {
        return prevCardList2D.map(prevCardList => {
          if (prevCardList.columnId === beforeColumnId) {
            const removedCardList = prevCardList.cardList.filter(
              prevCard => prevCard.id !== afterMoveCard.id
            );
            return { ...prevCardList, cardList: removedCardList };
          }

          if (prevCardList.columnId === afterColumnId) {
            const addedCardList = [...prevCardList.cardList, afterMoveCard];
            return { ...prevCardList, cardList: addedCardList };
          }

          return prevCardList;
        });
      });
    },
    [setCardList2D]
  );
  const loadColumnsAndCards = useCallback(async () => {
    const { data } = await getColumns(Number(dashboardid));
    setColumnList(data);
    const loadCardsPromises = data.map(column => loadCards(column.id));
    await Promise.all(loadCardsPromises);
  }, [dashboardid, loadCards]);
  const loadDashboardColor = useCallback(async () => {
    const { color } = await getDashboardDetail(Number(dashboardid));
    setDashboardColor(color);
  }, [dashboardid]);

  const loadMembers = useCallback(async () => {
    const nextMembers = await getMembers(Number(dashboardid));
    if (!nextMembers) {
      return;
    }
    setMembers(nextMembers as MemberApplicationServiceResponseDto[]);
  }, [dashboardid]);
  useEffect(() => {
    loadColumnsAndCards();
    loadDashboardColor();
    loadMembers();
  }, [loadColumnsAndCards, dashboardid, loadDashboardColor, loadMembers]);
  const contextValue = useMemo(
    () => ({
      cardList2D,
      setCardList2D,
      columnList,
      setColumnList,
      dashboardColor,
      members,
      moveCard,
    }),
    [
      cardList2D,
      setCardList2D,
      columnList,
      setColumnList,
      dashboardColor,
      members,
      moveCard,
    ]
  );
  return (
    <DashBoardContext.Provider value={contextValue}>
      {children}
    </DashBoardContext.Provider>
  );
}

export default DashBoardProvider;