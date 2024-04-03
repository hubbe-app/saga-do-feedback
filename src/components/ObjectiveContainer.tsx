'use client';
import { useGameContext } from '@/context/gameContext';
import { Rounded } from '@/libs/fonts';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

type ObjectiveContainerProps = {
  text: string;
  avatar: string;
  role: 'employee' | 'employer';
  selected: boolean;
};

export const ObjectiveContainer = ({ text, avatar, role, selected }: ObjectiveContainerProps) => {
  const { setPlayerData, playerData } = useGameContext();
  const router = useRouter();

  const divRef = useRef<HTMLDivElement>(null);

  const clickHandler = () => {
    const receiver = playerData;
    receiver.role = role;

    setPlayerData(receiver);
    router.push('/charSelection');
  };

  useEffect(() => {
    if (selected && divRef.current) {
      divRef.current.focus();
      console.log(text, selected);
    }
  }, [selected])



  return (
    <div
      onClick={clickHandler}
      ref={divRef}
      autoFocus={true}
      className={
        selected ? 
          'overflow-hidden flex flex-col p-4 justify-center items-center w-1/4 h-[700px] rounded-3xl shadow border-blue-400 focus:bg-gray-900 focus:bg-opacity-30 focus:border-4 focus:backdrop-blur-md hover:bg-gray-900 hover:bg-opacity-30 hover:border-4 hover:backdrop-blur-md cursor-pointer' : 
          'overflow-hidden flex flex-col p-4 justify-center items-center w-1/4 h-[700px] rounded-3xl shadow border-blue-400 bg-gray-900 bg-opacity-30 border-4 backdrop-blur-md cursor-pointer'
      }
    >
      <img className='object-contain w-48' src={avatar} alt='' />
      <p className={`${Rounded.className} text-4xl font-extrabold text-center text-white`}>{text}</p>
    </div>
  );
};
