'use client';

import { DialogBallon, PlayerDialogOptions, Timer } from '@/components';
import { useGameContext } from '@/context/gameContext';
import { average } from '@/libs/avarege';
import { Option, TurnsType, backgrounds, employeeGame, employeeStartingPhase, turns } from '@/libs/gameData';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const BattleScreen = () => {
  const { playerData } = useGameContext();
  const [selectedBackground, setSelectedBackground] = useState('');
  const [cpuChoice, setCpuChoice] = useState<Option>();

  useEffect(() => {
    setSelectedBackground(backgrounds[Math.floor(Math.random() * backgrounds.length)]);
  }, []);

  useEffect(() => {
    findNextQuestion();
  }, [playerData.turn]);

  const findNextQuestion = () => {
    const averageEngagement = average({ values: playerData.engagement });
    const averageAdrenaline = average({ values: playerData.adrenaline });

    if (playerData.role === 'employee') {
      const options = employeeGame[playerData.turn as TurnsType].employer;

      if (options) {
        options.sort((a, b) => {
          const diffEngagementA = Math.abs(averageEngagement - a.engagement);
          const diffEngagementB = Math.abs(averageEngagement - b.engagement);
          const diffAdrenalineA = Math.abs(averageAdrenaline - a.adrenaline);
          const diffAdrenalineB = Math.abs(averageAdrenaline - b.adrenaline);

          if (averageAdrenaline > averageEngagement) {
            if (diffAdrenalineA !== diffAdrenalineB) {
              return diffAdrenalineA - diffAdrenalineB;
            } else {
              return diffEngagementA - diffEngagementB;
            }
          } else {
            if (diffEngagementA !== diffEngagementB) {
              return diffEngagementA - diffEngagementB;
            } else {
              return diffAdrenalineA - diffAdrenalineB;
            }
          }
        });

        const nextQuestion = options[0];
        setCpuChoice(nextQuestion);
        console.log(nextQuestion);
      }
    }
  };

  return (
    <>
      {selectedBackground && (
        <Image
          width={3000}
          height={2000}
          src={selectedBackground}
          className='absolute -z-40 bg-contain bg-center w-screen h-screen brightness-50 opacity-80'
          alt='background'
        />
      )}
      <Timer />
      <main className='flex flex-col min-h-full flex-grow justify-start items-center'>
        {playerData.turn === 'firstTurn' && (
          <div className='flex mt-8'>
            <DialogBallon content={employeeStartingPhase} />
          </div>
        )}
        {playerData.turn && employeeGame[playerData.turn] && 'employer' in employeeGame[playerData.turn] ? (
          <DialogBallon cpuName='Márcia' content={cpuChoice?.dialog as string} />
        ) : (
          ''
        )}
        {employeeGame[playerData.turn] && 'employee' in employeeGame[playerData.turn] && (
          <div className='flex justify-center w-full min-h-full flex-col flex-grow'>
            <PlayerDialogOptions options={employeeGame[playerData.turn].employee as Option[]} />
          </div>
        )}
      </main>
    </>
  );
};

export default BattleScreen;
