'use client';

import { useGameContext } from '@/context/gameContext';
import { Rounded } from '@/libs/fonts';
import { employeeConclusionMsg, employerConclusionMsg } from '@/libs/gameData';
import { ActionName } from '@/libs/gamepad';
import { useActionEffect, useComboEffect } from '@/libs/input';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const BattleResult = () => {
  const { selectedBattleBackground, cpuChoice, playerData } = useGameContext();

  const router = useRouter();

  useComboEffect([ActionName.ButtonY], (action) => {
    redirectHandler();
  });

  useActionEffect(
    ActionName.Confirm,
    () => {
      clickHandler();
    },
    []
  );

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key.toUpperCase() === 'A') {
        clickHandler();
      }
      if (event.key.toUpperCase() === 'Y') {
        redirectHandler();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (cpuChoice.engagement === 10) {
        new Audio('/sounds/good-result.wav').play();
      }
      if (cpuChoice.engagement === 5) {
        new Audio('/sounds/neutral-result.wav').play();
      }
      if (cpuChoice.engagement === 0) {
        new Audio('/sounds/bad-result.mp3').play();
      }
    }
  }, [cpuChoice]);

  const redirectHandler = () => {
    router.push('/objectiveScreen');
  };

  const clickHandler = () => {
    if (typeof window !== 'undefined') {
      new Audio('/sounds/start-click.wav').play();
    }
    router.push('/mainScreen');
  };

  return (
    <>
      {selectedBattleBackground && (
        <img
          src={selectedBattleBackground}
          className='absolute -z-40 bg-contain bg-center w-screen h-screen brightness-50 opacity-80'
          alt='background'
        />
      )}
      <div
        className={`absolute h-full w-full z-10 ${
          cpuChoice.engagement === 10
            ? 'bg-blue-950 bg-opacity-70'
            : cpuChoice.engagement === 5
            ? 'bg-blue-200 bg-opacity-70'
            : 'bg-red-950 bg-opacity-70'
        }`}
      />
      <main className={`${Rounded.className} absolute z-20 h-screen w-screen`}>
        {playerData.role === 'employee' ? (
          <div className={`w-1/2 mt-20 ml-28 text-white text-[52px] font-extrabold `}>
            {cpuChoice.engagement === 10 && employeeConclusionMsg.goodResult.mainMessage}
            {cpuChoice.engagement === 5 && employeeConclusionMsg.neutralResult.mainMessage}
            {cpuChoice.engagement === 0 && employeeConclusionMsg.badResult.mainMessage}
          </div>
        ) : (
          <div className={`w-1/2 mt-20 ml-28 text-white text-[52px] font-extrabold `}>
            {cpuChoice.engagement === 10 && employerConclusionMsg.goodResult.mainMessage}
            {cpuChoice.engagement === 5 && employerConclusionMsg.neutralResult.mainMessage}
            {cpuChoice.engagement === 0 && employerConclusionMsg.badResult.mainMessage}
          </div>
        )}
        <img
          className={`absolute ${
            playerData.role === 'employer' ? 'transform scale-x-[-1]' : ''
          } right-0 bottom-0 h-[90vh] flex object-contain`}
          src={playerData.playerCharacter.preview}
          alt='character preview'
        />

        <div className='absolute bottom-[110px] left-[50%] -translate-x-[50%] text-white text-xl'>
          Pressione
          <button
            onClick={redirectHandler}
            className='animate-bounce mt-2 px-4 py-2 text-white font-extrabold text-xl rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 shadow-xl mx-2'
          >
            Y
          </button>
          para jogar novamente
        </div>
        <div className='absolute bottom-10 left-[50%] -translate-x-[50%] text-white text-xl'>
          Pressione
          <button
            onClick={clickHandler}
            className='animate-bounce mt-2 px-4 py-2 text-white font-extrabold text-xl rounded-full bg-gradient-to-r from-green-500 via-green-600 to-green-700 shadow-xl mx-2'
          >
            A
          </button>
          para sair
        </div>
      </main>
    </>
  );
};

export default BattleResult;
