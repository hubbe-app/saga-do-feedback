'use client';

import { useGameContext } from '@/context/gameContext';
import { DialogBallon, PlayerDialogOptions } from '.';
import { employeeGame, employeeStartingPhrase, employerGame, employerStartingPhrase } from '@/libs/gameData';
import { Option } from '@/types/types';
import { useEffect, useState } from 'react';

export const BattleCore = () => {
  const { playerData, isOptionsVisible, cpuChoice, turn } = useGameContext();
  const [currentOptions, setCurrentOptions] = useState<Option[]>([]);

  useEffect(() => {
    if (playerData.role === 'employee') {
      setCurrentOptions(employeeGame[turn].employee as Option[]);
    } else {
      setCurrentOptions(employerGame[turn].employer as Option[]);
    }
  }, [turn]);

  return (
    <main className='flex flex-col min-h-full flex-grow justify-start items-center pt-8'>
      {turn === 'firstTurn' ? (
        <div
          className={`${!isOptionsVisible ? 'transition-opacity duration-500 opacity-100' : 'opacity-0 hidden'} w-full`}
        >
          <DialogBallon content={playerData.role === 'employee' ? employeeStartingPhrase : employerStartingPhrase} />
        </div>
      ) : (
        <div
          className={`${
            !isOptionsVisible ? 'transition-opacity duration-500 opacity-100' : 'opacity-0 hidden'
          } w-full h-full flex justify-center`}
        >
          <div className='absolute right-0 bottom-0 '>
            <img src={playerData.playerCharacter.fullBody} alt='character' />
          </div>
          <div className='absolute left-0 bottom-0 '>
            <img src={playerData.cpuCharacter.fullBodyOn} alt='character' />
          </div>
          <DialogBallon cpuName={playerData.cpuCharacter.name} content={cpuChoice?.dialog as string} />
        </div>
      )}
      {playerData.time !== '0:00' && (
        <div
          className={` ${
            isOptionsVisible ? 'transition-opacity duration-500 opacity-100' : 'opacity-0'
          }  flex justify-center w-full h-full flex-col flex-grow`}
        >
          <PlayerDialogOptions
            cpuQuestion={
              turn === 'firstTurn'
                ? playerData.role === 'employee'
                  ? employeeStartingPhrase
                  : employerStartingPhrase
                : (cpuChoice?.dialog as string)
            }
            options={currentOptions}
          />
        </div>
      )}
    </main>
  );
};
