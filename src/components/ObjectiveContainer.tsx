'use client';
import { useGameContext } from '@/context/gameContext';
import { Rounded } from '@/libs/fonts';
import { employeeCharacters, employerCharacters } from '@/libs/gameData';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type ObjectiveContainerProps = {
  text: string;
  avatar: string;
  role: 'employee' | 'employer';
  selected: boolean;
};

export const ObjectiveContainer = ({ text, avatar, role, selected }: ObjectiveContainerProps) => {
  const { setPlayerData, playerData } = useGameContext();
  const [isFirstRender, setIsFirstRender] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (isFirstRender) {
      return setIsFirstRender(false);
    }
    if (typeof window !== 'undefined') {
      new Audio('/sounds/select-objective.mp3').play();
    }
  }, [selected]);

  const divRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    if (selected && divRef.current) {
      divRef.current.focus();
    }
  }, [selected]);

  return (
    <div
      ref={divRef}
      autoFocus={true}
      className={`
        ${selected && 'bg-opacity-30 border-4 backdrop-blur-md'}
          'overflow-hidden flex flex-col p-4 justify-center border-blue-400 items-center w-1/4 h-[700px] rounded-3xl cursor-pointer hover:bg-opacity-30 hover:border-4 hover:backdrop-blur-md
      `}
    >
      <img className='object-contain w-48' src={avatar} alt='' />
      <p className={`${Rounded.className} max-w-[440px] text-4xl font-extrabold text-center text-white`}>{text}</p>
    </div>
  );
};
