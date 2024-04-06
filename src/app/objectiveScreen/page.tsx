'use client';

import { ObjectiveContainer } from '@/components';
import { useGameContext } from '@/context/gameContext';
import { ActionName } from '@/libs/gamepad';
import { useActionEffect, useAxisEffect } from '@/libs/input';
import { useCycleValue } from '@/libs/math';
import { useRouter } from 'next/navigation';

const ObjectiveScreen = () => {
  const { playerData, setPlayerData } = useGameContext();
  const router = useRouter();
  const [selectedIndex, bumpUpIndex, bumpDownIndex] = useCycleValue(0, 0, 1);

  useActionEffect(ActionName.MoveRight, () => bumpUpIndex(), [selectedIndex]);
  useActionEffect(ActionName.MoveLeft, () => bumpDownIndex(), [selectedIndex]);

  useActionEffect(
    ActionName.Confirm,
    () => {
      new Audio('/sounds/click-avatar-obj.mp3').play();

      const receiver = playerData;
      if (selectedIndex === 0) {
        receiver.role = 'employee';
      } else {
        receiver.role = 'employer';
      }

      setPlayerData(receiver);
      router.push('/charSelection');
    },
    [selectedIndex]
  );

  useAxisEffect([0], (axis, value) => {
    if (value > 0.98) {
      bumpUpIndex();
    } else if (value < 0.98) {
      bumpDownIndex();
    }
  });

  return (
    <>
      <div className='absolute -z-20 top-0 left-0 w-screen h-screen bg-slate-950 overflow-hidden'>
        <img
          src={'/objective-selection/bg_obj.jpg'}
          className='absolute -z-10 bg-contain bg-center w-screen h-screen opacity-50'
          alt='background'
        />
      </div>
      <main className='flex flex-col h-screen w-screen overflow-hidden'>
        <img className='h-16 mt-24 object-contain' src='/objective-selection/title.png' alt='' />
        <div className='flex h-full justify-around items-center max-w-full mt-6'>
          <ObjectiveContainer
            role='employee'
            text='Avançar na carreira como colaborador'
            avatar='/objective-selection/employee.png'
            selected={selectedIndex === 0}
          />
          <ObjectiveContainer
            role='employer'
            text='Defender a cultura como gestor'
            avatar='/objective-selection/employer.png'
            selected={selectedIndex === 1}
          />
        </div>
      </main>
    </>
  );
};

export default ObjectiveScreen;
