import { RankingItem } from '.';

export const Ranking = () => {
  const rankingData = [
    { name: 'joão da silva', score: '50', time: '2:25' },
    { name: 'joão da silva pr', score: '50', time: '2:50' },
    { name: 'joão da silva', score: '20', time: '2:00' },
    { name: 'joão da silva', score: '33', time: '2:25' },
    { name: 'joão da silva', score: '35', time: '2:25' },
    { name: 'joão da silva', score: '32', time: '2:25' },
    { name: 'joão da silva', score: '32', time: '2:25' },
    { name: 'joão da silva', score: '32', time: '2:25' },
    { name: 'joão da silva', score: '32', time: '2:25' },
    { name: 'joão da silva', score: '20', time: '2:25' },
    { name: 'joão da silva', score: '34', time: '2:25' },
    { name: 'joão da silva', score: '44', time: '2:25' },
    { name: 'joão da silva', score: '47', time: '2:25' },
  ];

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
