'use client';

import { ActionName } from '@/libs/gamepad';
import { useActionEffect } from '@/libs/input';
import { useState } from 'react';
import MainScreen from './mainScreen/page';
import { Intro } from '@/components';
import BattleScreen from './battleScreen/page';
import { useGameContext } from '@/context/gameContext';

export default function Home() {
  const { step, next } = useGameContext();

  return (
    <>
      <Intro />
    </>
  );
}
