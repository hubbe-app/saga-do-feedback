'use client';

import { useGameContext } from '@/context/gameContext';
import { DialogBallon, PlayerDialogOptions } from '.';
import { employeeGame, employeeStartingPhrase, employerGame, employerStartingPhrase } from '@/libs/gameData';
import { Option } from '@/types/types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useActionEffect } from '@/libs/input';
import { ActionName } from '@/libs/gamepad';
import { Rounded } from '@/libs/fonts';

export const BattleCore = () => {
  const { playerData, isOptionsVisible, cpuChoice, turn, setIsOptionsVisible } = useGameContext();
  const [currentOptions, setCurrentOptions] = useState<Option[]>([]);
  const [gameStarted, setGameStarted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (playerData.role === 'employee') {
      setCurrentOptions(employeeGame[turn].employee as Option[]);
    } else {
      setCurrentOptions(employerGame[turn].employer as Option[]);
    }

    if (turn === 'conclusion') {
      router.push('/battleResult');
    }
    if (playerData.name === '') {
      router.push('/mainScreen');
    }
  }, [turn]);

  useActionEffect(
    ActionName.Confirm,
    () => {
      if (turn !== 'firstTurn') {
        return;
      }
      new Audio('/sounds/click-answer.mp3').play();
      setGameStarted(true);
      setIsOptionsVisible(true);
    },
    [turn]
  );

  return (
    <main className='flex flex-col min-h-full flex-grow justify-start items-center pt-8'>
      {turn === 'firstTurn' ? (
        <>
          <div
            className={`${
              !isOptionsVisible ? 'transition-opacity duration-500 opacity-100' : 'opacity-0 hidden'
            } w-full`}
          >
            <DialogBallon content={playerData.role === 'employee' ? employeeStartingPhrase : employerStartingPhrase} />
          </div>
          {!isOptionsVisible && (
            <div
              className={`${Rounded.className} absolute bottom-36 left-[50%] -translate-x-[50%] text-white text-2xl`}
            >
              Pressione
              <button
                onClick={() => setIsOptionsVisible(true)}
                className='animate-bounce mt-2 px-4 py-2 text-white font-extrabold text-xl rounded-full bg-gradient-to-r from-green-500 via-green-600 to-green-700 shadow-xl mx-2'
              >
                A
              </button>
              para iniciar
            </div>
          )}
        </>
      ) : (
        <div
          className={`${
            !isOptionsVisible ? 'transition-opacity duration-500 opacity-100' : 'opacity-0 hidden'
          } w-full h-full flex justify-center`}
        >
          <div className='absolute right-0 bottom-0 '>
            <img src={playerData.playerCharacter.fullBody} alt='character' />
          </div>
          <div className={`${playerData.role === 'employer' && 'transform scale-x-[-1]'} absolute left-0 bottom-0 `}>
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
            options={currentOptions ? currentOptions : []}
          />
        </div>
      )}

      {gameStarted && (
        <>
          <div className=' absolute right-40 bottom-12 min-w-32 w-fit min-h-10 px-8 py-0.5 bg-blue-600 z-20 rounded-xl justify-center items-center flex text-white text-2xl font-extrabold'>
            {playerData.role === 'employee' ? 'Colaborador' : 'Gestor'}
          </div>
          <div className=' absolute left-40 bottom-12 min-w-32 w-fit min-h-10 px-8 py-0.5 bg-red-600 z-20 rounded-xl justify-center items-center flex text-white text-2xl font-extrabold'>
            {playerData.role === 'employee' ? 'Gestor' : 'Colaborador'}
          </div>
        </>
      )}
    </main>
  );
};
