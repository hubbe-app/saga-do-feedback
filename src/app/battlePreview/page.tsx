'use client';

import { PreviewFaceOff } from '@/components';
import { useGameContext } from '@/context/gameContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const BattlePreview = () => {
  const { playerData } = useGameContext();
  const router = useRouter();

  useEffect(() => {
    new Audio('/sounds/battle-preview.mp3').play();
    const timer = setTimeout(() => {
      router.push('/battleScreen');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <img
        src={'/battle-preview/bg.jpg'}
        className='absolute -z-10 bg-contain bg-center w-screen h-screen '
        alt='background'
      />

      <div className='flex flex-col items-center h-screen w-screen overflow-hidden'>
        <div className='w-1/2 mt-12'>
          {playerData.role === 'employee' ? (
            <img src={'/battle-preview/obj-employee.png'} alt='' />
          ) : (
            <img src={'/battle-preview/obj-employer.png'} alt='' />
          )}
        </div>
        <div className='flex justify-between w-full h-full'>
          <div className='w-full h-full animate-prev-slide-left'>
            <PreviewFaceOff
              character={playerData.playerCharacter}
              role={playerData.role === 'employee' ? 'Colaborador' : 'Gestor'}
            />
          </div>
          <div className='w-full h-full animate-prev-slide-right'>
            <PreviewFaceOff
              mirrored
              character={playerData.cpuCharacter}
              role={playerData.role === 'employee' ? 'Gestor' : 'Colaborador'}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BattlePreview;
