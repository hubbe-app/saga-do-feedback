'use client';
import { useGameContext } from '@/context/gameContext';
import { Rounded } from '@/libs/fonts';
import { useRouter } from 'next/navigation';

type ObjectiveContainerProps = {
  text: string;
  avatar: string;
  role: 'employee' | 'employer';
};

export const ObjectiveContainer = ({ text, avatar, role }: ObjectiveContainerProps) => {
  const { setPlayerData, playerData } = useGameContext();
  const router = useRouter();

  const clickHandler = () => {
    const receiver = playerData;
    receiver.role = role;

    setPlayerData(receiver);
    router.push('/charSelection');
  };

  return (
    <div
      onClick={clickHandler}
      className='overflow-hidden flex flex-col p-4 justify-center items-center w-1/4 h-[700px] rounded-3xl shadow border-blue-400 focus:bg-gray-900 focus:bg-opacity-30 focus:border-4 focus:backdrop-blur-md hover:bg-gray-900 hover:bg-opacity-30 hover:border-4 hover:backdrop-blur-md cursor-pointer'
    >
      <img className='object-contain w-48' src={avatar} alt='' />
      <p className={`${Rounded.className} text-4xl font-extrabold text-center text-white`}>{text}</p>
    </div>
  );
};
