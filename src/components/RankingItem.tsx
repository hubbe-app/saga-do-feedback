import Image from 'next/image';

type RankingItemProps = {
  name: string;
  score: string;
  index: number;
};

export const RankingItem = ({ name, score, index }: RankingItemProps) => {
  return (
    <>
      <div
        className={`${
          index === 1 ? 'bg-blue-600' : index === 2 || index === 3 ? 'bg-indigo-800' : 'bg-neutral-700'
        } font-bold flex gap-3 flex-nowrap justify-between items-center  rounded-xl w-full min-h-9 px-3 text-sm`}
      >
        <div>{index}</div>
        {index === 1 && <Image height={20} width={20} src={'crown.svg'} alt='crown' />}
        {index === 2 && <Image height={18} width={18} src={'crown-2nd.svg'} alt='crown' />}
        {index === 3 && <Image height={16} width={16} src={'crown-3rd.svg'} alt='crown' />}
        <div className='flex-grow'>{name}</div>
        <div className='font-normal'>{score} pts</div>
      </div>
    </>
  );
};
