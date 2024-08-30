import { getCards } from '@core/api/dashboardApi';
import { CardServiceResponseDto } from '@core/dtos/dashboardDto';
import { useCallback, useEffect, useState } from 'react';

export default function useCards(columnId: number) {
  const [cardList, setCardList] = useState<CardServiceResponseDto[] | null>(
    null
  );

  const LoadCards = useCallback(async () => {
    const data = await getCards(columnId);
    const Cards: CardServiceResponseDto[] = data.cards;
    setCardList(Cards);
  }, [columnId]);

  useEffect(() => {
    if (Number.isNaN(columnId)) {
      return;
    }
    LoadCards();
  }, [columnId, LoadCards]);

  return { cardList };
}
