'use client';

import { useGameContext } from '@/context/gameContext';
import { Rounded } from '@/libs/fonts';
import { Option } from '@/types/types';

const PlayerDialogBallon = ({ dialog, adrenaline, engagement }: Option) => {
  const { playerData, setPlayerData, nextTurn, setIsOptionsVisible } = useGameContext();

  const clickHandler = () => {
    
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
        onClick={clickHandler}
        className={`cursor-pointer flex items-center justify-center ${Rounded.className} text-zinc-950 text-2xl font-extrabold leading-9 w-1/3 min-h-24 px-10 py-2 bg-neutral-50 rounded-full shadow-inner border-4 border-blue-600 hover:border-blue-400 focus:border-blue-400 hover:animate-[pulse_1s_ease-in-out_infinite]`}
      >
        {dialog}
      </div>
    </>
  );
};

export default PlayerDialogBallon;
