'use client';
import { useGameContext } from '@/context/gameContext';
import { Rounded } from '@/libs/fonts';
import { Option } from "@/types/types";
import { DialogBallon, PlayerDialogBallon } from '.';

type PlayerDialogOptionsProps = {
  options: Option[];
  cpuQuestion?: string;
};

export const PlayerDialogOptions = ({ options, cpuQuestion }: PlayerDialogOptionsProps) => {
  const { playerData, turn } = useGameContext();

  return (
    <>
    <div className='absolute right-0 bottom-0 '>
      <img src={playerData.playerCharacter.fullBodyOn} alt="character" />
    </div>
    <div className='absolute left-0 bottom-0 '>
      <img src={playerData.cpuCharacter.fullBody} alt="character" />
    </div>
      <div className='flex justify-center opacity-60 scale-75 h-full'>
        <DialogBallon
          cpuName={turn === 'firstTurn' ? '' : playerData.cpuCharacter.name}
          content={cpuQuestion as string}
        />
      </div>

      <div className={`flex flex-col w-full justify-center items-center gap-4 mb-32`}>
        <div
          className={`${Rounded.className} flex items-center justify-center text-2xl min-w-32 min-h-10 px-8 bg-blue-600 rounded-xl text-white`}
        >
          {playerData.name}
        </div>
        {options && options.map((option) => (
          <PlayerDialogBallon
            key={option.dialog}
            dialog={option.dialog}
            adrenaline={option.adrenaline}
            engagement={option.engagement}
          />
        ))}
      </div>
    </>
  );
};
