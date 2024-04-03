'use client';

import { ObjectiveContainer } from '@/components';
import { ActionName } from '@/libs/gamepad';
import { useActionEffect, useAxisEffect } from '@/libs/input';
import { useCycleValue } from '@/libs/math';
import Image from 'next/image';

const ObjectiveScreen = () => {

  const [selectedIndex, bumpUpIndex, bumpDownIndex] = useCycleValue(0, 0, 1);
console.log({selectedIndex});

  useActionEffect(ActionName.MoveRight, () => bumpUpIndex(), [selectedIndex]);
  useActionEffect(ActionName.MoveLeft, () => bumpDownIndex(), [selectedIndex]);
  
  
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
        <Image
          width={3000}
          height={2000}
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
