'use client';

import { ActionName } from '@/libs/gamepad';
import { useActionEffect } from '@/libs/input';
import { useState } from 'react';
import MainScreen from './mainScreen/page';

export default function Home() {
  return (
    <>
      <MainScreen />
    </>
  );
}
