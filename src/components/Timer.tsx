'use client';

import { useGameContext } from '@/context/gameContext';
import { Rounded } from '@/libs/fonts';
import { useState, useEffect } from 'react';

export const Timer = () => {
  const [time, setTime] = useState(4 * 60);
  const { setPlayerData, playerData, setTimeOver, turn } = useGameContext();

  useEffect(() => {
    if (time === 0 && turn !== 'conclusion') {
      setTimeOver(true);
      const receiver = { ...playerData, adrenaline: [...playerData.adrenaline, 100], time: '0:00' };

      setPlayerData(receiver);
    }
    if (turn === 'conclusion') {
      return;
    }

    if (time > 0) {
      const timerId = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [time]);

  useEffect(() => {
    if (turn === 'firstTurn') {
      setTime(4 * 60);
    }
    setPlayerData({ ...playerData, time: `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}` });
  }, [turn]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div
      className={`${Rounded.className} absolute bottom-10 left-1/2 transform -translate-x-1/2 text-4xl font-bold text-white`}
    >
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
};
