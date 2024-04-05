import Image from 'next/image';

type RankingItemProps = {
  name: string;
  score: string;
  index: number;
};

export const RankingItem = ({ name, score, index }: RankingItemProps) => {
  const formattedScore = isNaN(parseInt(score)) ? '0' : parseInt(score).toLocaleString();

  return (
    <>
      <div
        className={`${
          index === 1 ? 'bg-blue-600' : index === 2 || index === 3 ? 'bg-indigo-800' : 'bg-neutral-700'
        } font-bold flex gap-3 flex-nowrap justify-between items-center  rounded-xl w-full min-h-9 px-3 text-sm`}
      >
        <div>{index}</div>
        {index === 1 && <img className='h-[20px] w-[20px]' src={'crown.svg'} alt='crown' />}
        {index === 2 && <img className='h-[18px] w-[18px]' width={18} src={'crown-2nd.svg'} alt='crown' />}
        {index === 3 && <img className='h-[16px] w-[16px]' width={16} src={'crown-3rd.svg'} alt='crown' />}
        <div className='flex-grow overflow-hidden whitespace-nowrap text-ellipsis'>{name}</div>
        <div className='font-normal whitespace-nowrap'>{formattedScore} pts</div>
      </div>
    </>
  );
};
