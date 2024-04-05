'use client';

import { useGameContext } from '@/context/gameContext';
import { Rounded } from '@/libs/fonts';
import { ActionName } from '@/libs/gamepad';
import { useActionEffect } from '@/libs/input';
import { Option } from '@/types/types';
import { useEffect, useRef, useState } from 'react';

type PlayerDialogBallonProps = Option & {
  selected: boolean;
};

export const PlayerDialogBallon = ({ dialog, adrenaline, engagement, selected }: PlayerDialogBallonProps) => {
  const { playerData, setPlayerData, nextTurn, setIsOptionsVisible } = useGameContext();
  const [isFirstRender, setIsFirstRender] = useState(true);


  useEffect(() => {
    if (isFirstRender) {
      return setIsFirstRender(false);
    }
    new Audio('/sounds/select-answer.mp3').play();
  }, [selected]);

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected && divRef.current) {
      divRef.current.focus();
    }
  }, [selected]);

  const clickHandler = () => {

    new Audio('/sounds/click-answer.mp3').play();

    const receiver = playerData;
    receiver.adrenaline = [...playerData.adrenaline, adrenaline];
    receiver.engagement = [...playerData.engagement, engagement];

    setPlayerData(receiver);
    nextTurn();
    setIsOptionsVisible(false);
  };

  return (
    <>
      <div
        ref={divRef}
        autoFocus={true}
        onClick={clickHandler}
        className={`${selected && 'border-blue-400 animate-[pulse_1s_ease-in-out_infinite]'} cursor-pointer flex items-center justify-center ${Rounded.className} text-zinc-950 text-2xl font-extrabold leading-9 w-1/3 min-h-24 px-10 py-2 bg-neutral-50 rounded-full shadow-inner border-4 border-blue-600 hover:border-blue-400 focus:border-blue-400 hover:animate-[pulse_1s_ease-in-out_infinite]`}
      >
        {dialog}
      </div>
    </>
  );
};
