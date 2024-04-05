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
    const scoreA = isNaN(parseInt(a.score)) ? 0 : parseInt(a.score);
    const scoreB = isNaN(parseInt(b.score)) ? 0 : parseInt(b.score);

    if (scoreA !== scoreB) {
      return scoreB - scoreA;
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
