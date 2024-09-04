import { useCallback, useEffect, useState } from 'react';

import { getCards } from '@core/api/cardApis';
import { CardServiceResponseDto } from '@core/dtos/CardsDto';

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
