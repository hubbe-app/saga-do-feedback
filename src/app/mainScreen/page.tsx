'use client';

import { Ranking, RegisterForm } from '@/components';
import { useGameContext } from '@/context/gameContext';
import Image from 'next/image';
import { useEffect } from 'react';

const MainScreen = () => {
  const { gameReset } = useGameContext();

  useEffect(() => {
    gameReset();
  }, []);

  return (
    <>
      <div className='absolute -z-20 top-0 left-0 w-screen h-screen bg-slate-950 overflow-hidden'>
        <Image
          width={3000}
          height={2000}
          src={'/bg_inicial.jpg'}
          className='absolute -z-10 bg-contain bg-center w-screen h-screen opacity-50'
          alt='background'
        />
      </div>
      <div className='flex justify-center h-screen w-screen overflow-hidden'>
        <div className='flex flex-col items-start justify-start max-w-[45%]'>
          <img src={'/logo.svg'} className='w-[80%] mt-12 mb-6' alt='logo' />
          <RegisterForm />
          <div className='flex gap-20 justify-start max-h-44 w-full'>
            <img src={'/logo-hubbe-png.png'} className='h-full aspect-auto' alt='Hubbe' />
            <img src={'logo-fstate.svg'} className='h-full w-[50%]' alt='Fluid State' />
          </div>
        </div>
        <div className='mt-96'>
          <Ranking />
        </div>
      </div>
    </>
  );
};

export default MainScreen;
