'use client';

import { ActionName } from '@/libs/gamepad';
import { useActionEffect } from '@/libs/input';
import { useState } from 'react';
import MainScreen from './mainScreen/page';
import { Intro } from '@/components';

export default function Home() {
  return (
    <>
      {/* <Intro /> */}
      <MainScreen />
    </>
  );
}
