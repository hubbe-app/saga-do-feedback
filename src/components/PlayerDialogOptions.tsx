'use client';
import { useGameContext } from '@/context/gameContext';
import { Rounded } from '@/libs/fonts';
import { Option } from '@/types/types';
import { DialogBallon, PlayerDialogBallon } from '.';
import { useEffect, useState } from 'react';
import { useActionEffect } from '@/libs/input';
import { ActionName } from '@/libs/gamepad';
import { useCycleValue } from '@/libs/math';

type PlayerDialogOptionsProps = {
  options: Option[];
  cpuQuestion?: string;
};

export const PlayerDialogOptions = ({ options, cpuQuestion }: PlayerDialogOptionsProps) => {
  const { playerData, turn } = useGameContext();
  const [randomizedOptions, setRandomizedOptions] = useState<Option[]>([]);

  const [selectedIndex, bumpUpIndex, bumpDownIndex] = useCycleValue(0, 0, 2);

  useActionEffect(ActionName.MoveDown, () => bumpUpIndex(), [selectedIndex]);
  useActionEffect(ActionName.MoveUp, () => bumpDownIndex(), [selectedIndex]);

  useEffect(() => {
    setRandomizedOptions([...options].sort(() => Math.random() - 0.5));
  }, [options]);

  return (
    <>
      <div className='absolute right-0 bottom-0 '>
        <img src={playerData.playerCharacter.fullBodyOn} alt='character' />
      </div>
      <div className='absolute left-0 bottom-0 '>
        <img src={playerData.cpuCharacter.fullBody} alt='character' />
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
          {playerData.playerCharacter.name}
        </div>
        {options &&
          randomizedOptions.map((option, index) => (
            <PlayerDialogBallon
              selected={selectedIndex === index}
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
