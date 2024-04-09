'use client';

import { ObjectiveContainer } from '@/components';
import { PlayerDataType, useGameContext } from '@/context/gameContext';
import { employeeCharacters, employerCharacters } from '@/libs/gameData';
import { ActionName } from '@/libs/gamepad';
import { useActionEffect } from '@/libs/input';
import { useCycleValue } from '@/libs/math';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ObjectiveScreen = () => {
  const {
    playerData,
    setPlayerData,
    setAverageAdrenaline,
    setAverageEngagement,
    setTurn,
    setCpuChoice,
    setIsOptionsVisible,
  } = useGameContext();
  const router = useRouter();
  const [selectedIndex, bumpUpIndex, bumpDownIndex] = useCycleValue(0, 0, 1);

  useEffect(() => {
    setTurn('firstTurn');
    setIsOptionsVisible(false);
    setAverageAdrenaline(0);
    setAverageEngagement(0);
    setCpuChoice({
      dialog: '',
      adrenaline: 100,
      engagement: 100,
    });
    setPlayerData({
      ...playerData,
      score: '',
      engagement: [],
      adrenaline: [],
      time: '',
      cpuCharacter: {
        avatar: '',
        fullBody: '',
        fullBodyOn: '',
        name: '',
        description: '',
        preview: '',
      },
      playerCharacter: {
        avatar: '',
        fullBody: '',
        fullBodyOn: '',
        name: '',
        description: '',
        preview: '',
      },
      role: '',
    });
  }, []);

  useActionEffect(ActionName.MoveRight, () => bumpUpIndex(), [selectedIndex]);
  useActionEffect(ActionName.MoveLeft, () => bumpDownIndex(), [selectedIndex]);

  useActionEffect(
    ActionName.Confirm,
    () => {
      if (typeof window !== 'undefined') {
        new Audio('/sounds/click-avatar-obj.mp3').play();
      }

      if (selectedIndex === 0) {
        const receiver: PlayerDataType = {
          name: playerData.name,
          score: '',
          engagement: [],
          adrenaline: [],
          time: '',
          cpuCharacter: employerCharacters[Math.floor(Math.random() * employerCharacters.length)],
          playerCharacter: {
            avatar: '',
            fullBody: '',
            fullBodyOn: '',
            name: '',
            description: '',
            preview: '',
          },
          role: 'employee',
        };
        setPlayerData(receiver);
      } else {
        const receiver: PlayerDataType = {
          name: playerData.name,
          score: '',
          engagement: [],
          adrenaline: [],
          time: '',
          cpuCharacter: employeeCharacters[Math.floor(Math.random() * employeeCharacters.length)],
          playerCharacter: {
            avatar: '',
            fullBody: '',
            fullBodyOn: '',
            name: '',
            description: '',
            preview: '',
          },
          role: 'employer',
        };
        setPlayerData(receiver);
      }

      router.push('/charSelection');
    },
    [selectedIndex]
  );

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
