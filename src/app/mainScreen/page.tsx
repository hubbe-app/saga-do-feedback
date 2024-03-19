'use client';
import { DefaultButton, RegisterForm } from '@/components';
import { Ranking } from '@/components/Ranking';
import { ActionName } from '@/libs/gamepad';
import { useActionEffect } from '@/libs/input';
import Image from 'next/image';
import { useState } from 'react';

const MainScreen = () => {
  const [count, setCount] = useState(0);

  // useActionEffect(ActionName.MoveUp, () => {
  //   setCount((c) => c + 1);
  // });

  // useActionEffect(ActionName.MoveDown, () => {
  //   setCount((c) => c - 1);
  // });

  return (
    <div className='absolute flex justify-center top-0 left-0 w-screen h-screen bg-slate-950 -z-50 overflow-hidden'>
      <Image
        width={3000}
        height={2000}
        src={'/bg_inicial.jpg'}
        className='absolute -z-40 bg-contain bg-center w-screen h-screen opacity-50'
        alt='background'
      />
      <div className='flex flex-col items-start justify-start max-w-[45%]'>
        <Image width={1218} height={546} src={'/logo.svg'} className='w-[80%] mt-12 mb-6' alt='logo' />
        <RegisterForm />
        <div className='flex justify-start max-h-44 w-full'>
          <Image width={199} height={176} src={'/logo-hubbe-png.png'} className='h-full aspect-video' alt='Hubbe' />
          <Image width={3500} height={2400} src={'logo-fstate.svg'} className='h-full w-[50%]' alt='Fluid State' />
        </div>
      </div>
      <div className='mt-96'>
      <Ranking />
      </div>
    </div>
  );
};

export default MainScreen;
