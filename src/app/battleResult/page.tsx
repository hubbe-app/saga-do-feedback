'use client';

import { useGameContext } from '@/context/gameContext';
import { Rounded } from '@/libs/fonts';
import { employeeConclusionMsg, employerConclusionMsg } from '@/libs/gameData';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const BattleResult = () => {
  const {
    selectedBattleBackground,
    cpuChoice,
    playerData,
    setTurn,
    setPlayerData,
    setAverageAdrenaline,
    setAverageEngagement,
    setCpuChoice,
  } = useGameContext();

  const router = useRouter();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key.toUpperCase() === 'A') {
        clickHandler();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const clickHandler = () => {
    router.push('/mainScreen');
    setTurn('firstTurn');
    setPlayerData({
      name: '',
      score: '',
      engagement: [],
      adrenaline: [],
      time: '',
      cpuCharacter: {
        avatar: '',
        fullBody: '',
        fullBodyOn: '',
        name: '',
        description: '',
        preview: '',
      },
      playerCharacter: {
        avatar: '/selectionScreen/ca2.png',
        fullBody: '/battle/c2leticia.png',
        fullBodyOn: '/battle/c2leticia_on.png',
        name: 'Letícia',
        description: 'Operadora de Máquina',
        preview: '',
      },
      role: 'employee',
    });
    setAverageAdrenaline(0);
    setAverageEngagement(0);
    setCpuChoice({
      dialog: '',
      adrenaline: 100,
      engagement: 100,
    });
  };

console.log({cpuChoice});


  return (
    <>
      {selectedBattleBackground && (
        <Image
          width={3000}
          height={2000}
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
          <div className={`w-1/2 mt-10 ml-28 text-white text-[52px] font-extrabold `}>
            {cpuChoice.engagement === 10 && employeeConclusionMsg.goodResult.mainMessage}
            {cpuChoice.engagement === 5 && employeeConclusionMsg.neutralResult.mainMessage}
            {cpuChoice.engagement === 0 && employeeConclusionMsg.badResult.mainMessage}
          </div>
        ) : (
          <div className={`w-1/2 mt-10 ml-28 text-white text-[52px] font-extrabold `}>
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
        <div className='w-[607px] ml-40 mt-28 px-12 py-6 bg-neutral-50 rounded-3xl border-2 border-blue-600 justify-center items-center gap-2.5 inline-flex'>
          {playerData.role === 'employee' ? (
            <div className='text-xl'>
              {cpuChoice.engagement === 10 && employeeConclusionMsg.goodResult.message}
              {cpuChoice.engagement === 5 && employeeConclusionMsg.neutralResult.message}
              {cpuChoice.engagement === 0 && employeeConclusionMsg.badResult.message}
            </div>
          ) : (
            <div className='text-xl'>
              {cpuChoice.engagement === 10 && employerConclusionMsg.goodResult.message}
              {cpuChoice.engagement === 5 && employerConclusionMsg.neutralResult.message}
              {cpuChoice.engagement === 0 && employerConclusionMsg.badResult.message}
            </div>
          )}
        </div>
        <div className='absolute bottom-10 left-[50%] -translate-x-[50%] text-white text-xl'>
          Pressione
          <button
            onClick={clickHandler}
            className='animate-bounce mt-2 px-4 py-2 text-white font-extrabold text-xl rounded-full bg-green-700 shadow-xl mx-2'
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
