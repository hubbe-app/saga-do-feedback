'use client';
import { useGameContext } from '@/context/gameContext';
import { useState } from 'react';

export const Intro = () => {
  const [videoEnded, setVideoEnded] = useState(false);
  const {step, next, canContinue} = useGameContext()


  const handleVideoEnd = () => {
    setVideoEnded(true);
    next();
  };
  return (
    <div className={`${videoEnded && 'hidden'} relative justify-center items-center z-50 flex w-screen h-screen overflow-hidden`}>
      <video
        className={'w-full h-full object-cover bg-[#071F24]'}
        autoPlay
        muted
        src='/intro6.mp4'
        onEnded={handleVideoEnd}
      />
    </div>
  );
};
