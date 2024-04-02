'use client';

import { RankingType } from '@/types/types';
import { RankingItem } from '.';
import { useEffect, useState } from 'react';

export const Ranking = () => {
  const [rankingData, setRankingData] = useState<RankingType[]>([]);

  useEffect(() => {
    setRankingData(JSON.parse(localStorage.getItem('rankingList') || '[]'));
  }, []);

  const sortedRanking = rankingData
    .sort((a, b) => {
      if (parseInt(a.score) !== parseInt(b.score)) {
        return parseInt(b.score) - parseInt(a.score);
      }

      const [aMinutes, aSeconds] = a.time.split(':').map((num) => parseInt(num));
      const [bMinutes, bSeconds] = b.time.split(':').map((num) => parseInt(num));

      const aTotalSeconds = aMinutes * 60 + aSeconds;
      const bTotalSeconds = bMinutes * 60 + bSeconds;

      return bTotalSeconds - aTotalSeconds;
    })
    .slice(0, 10);

  return (
    <div className='flex flex-col gap-2 justify-start items-center w-72 min-h-[456px] bg-gray-900 bg-opacity-80 text-white rounded-3xl p-3'>
      {sortedRanking.map((item, index) => (
        <RankingItem key={item.name + item.score + index} name={item.name} score={item.score} index={index + 1} />
      ))}
    </div>
  );
};
