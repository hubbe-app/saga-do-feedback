'use client';
import { useGameContext } from '@/context/gameContext';
import PlayerDialogBallon from './PlayerDialogBallon';
import { Rounded } from '@/libs/fonts';
import { Option } from '@/libs/gameData';

type PlayerDialogOptionsProps = {
  options: Option[];
};

export const PlayerDialogOptions = ({ options }: PlayerDialogOptionsProps) => {
  const { playerData } = useGameContext();

  return (
    <div className='flex flex-col w-full justify-center items-center gap-4'>
      <div
        className={`${Rounded.className} flex items-center justify-center text-2xl min-w-32 min-h-10 px-8 bg-blue-600 rounded-xl text-white`}
      >
        {playerData.name}
      </div>
      {options.map((option) => (
        <PlayerDialogBallon
          key={option.dialog}
          dialog={option.dialog}
          adrenaline={option.adrenaline}
          engagement={option.engagement}
        />
      ))}
    </div>
  );
};
