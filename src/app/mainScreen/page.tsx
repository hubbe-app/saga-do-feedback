'use client';
import DefaultButton from '@/components/DefaultButton';
import { ActionName } from '@/libs/gamepad';
import { useActionEffect } from '@/libs/input';
import Image from 'next/image';
import { useState } from 'react';

const MainScreen = () => {
  const [count, setCount] = useState(0);
  const [videoEnded, setVideoEnded] = useState(false);

//   useActionEffect(ActionName.MoveUp, () => {
//     setCount((c) => c + 1);
//   });

//   useActionEffect(ActionName.MoveDown, () => {
//     setCount((c) => c - 1);
//   });

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  return (
    <div className='relative justify-center items-center z-50 flex w-screen h-screen overflow-hidden'>
      {!videoEnded && (
        <video
          className={'w-fuul h-full object-cover bg-[#071F24] transform scale-[1.7] '}
          autoPlay
          muted
          src='/intro.mp4'
          onEnded={handleVideoEnd}
        />
      )}
      {videoEnded && (
        <div className='absolute top-0 left-0 w-screen h-screen'>
          <Image
            width={3000}
            height={2000}
            src={'/bg_inicial.jpg'}
            className='absolute -z-50 bg-contain bg-center w-screen h-screen'
            alt='background'
          />
          <div className='flex flex-col items-center justify-center'>
            <Image width={1218} height={546} src={'/logo.svg'} className='w-[45%] mt-20' alt='logo' />
            <DefaultButton title='iniciar' />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainScreen;
