'use client';

import { DialogBallon, PlayerDialogOptions, PowerUp, Timer } from '@/components';
import { useGameContext } from '@/context/gameContext';
import { average } from '@/libs/avarege';
import { Rounded } from '@/libs/fonts';
import {
  Option,
  TurnsType,
  backgrounds,
  employeeGame,
  employeeStartingPhrase,
  employerGame,
  employerStartingPhrase,
  turns,
} from '@/libs/gameData';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const BattleScreen = () => {
  const { playerData, timeOver } = useGameContext();
  const [selectedBackground, setSelectedBackground] = useState('');
  const [cpuChoice, setCpuChoice] = useState<Option>();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setSelectedBackground(backgrounds[Math.floor(Math.random() * backgrounds.length)]);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [playerData.turn]);

  useEffect(() => {
    findNextQuestion();
  }, [playerData.turn]);

  const findNextQuestion = () => {
    const averageEngagement = average({ values: playerData.engagement });
    const averageAdrenaline = average({ values: playerData.adrenaline });

    console.log({ averageAdrenaline, averageEngagement });

    let options: Option[] | undefined = [];

    if (playerData.role === 'employee') {
      options = employeeGame[playerData.turn as TurnsType].employer;
    } else {
      options = employerGame[playerData.turn as TurnsType].employee;
    }
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
    }
  };

  return (
    <div className='flex flex-col absolute inset-0 overflow-hidden'>
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
      <PowerUp />
      {timeOver ? (
        <div
          className={`${Rounded.className} flex text-7xl gap-10 text-white h-full w-full flex-col justify-center items-center bg-red-600 bg-opacity-45`}
        >
          <p>Seu tempo acabou</p>
          <p>Tente novamente</p>
        </div>
      ) : (
        <>
          {playerData.role === 'employee' ? (
            <main className='flex flex-col min-h-full flex-grow justify-start items-center pt-8'>
              {playerData.turn === 'firstTurn' && (
                <div className={`${!isVisible ? 'transition-opacity duration-500 opacity-100' : 'opacity-0'} w-full`}>
                  <DialogBallon content={employeeStartingPhrase} />
                </div>
              )}
              {playerData.turn && employeeGame[playerData.turn] && 'employer' in employeeGame[playerData.turn] && (
                <div className={`${!isVisible ? 'transition-opacity duration-500 opacity-100' : 'opacity-0'} w-full`}>
                  <DialogBallon cpuName={playerData.cpuAvatar} content={cpuChoice?.dialog as string} />
                </div>
              )}
              {employeeGame[playerData.turn] &&
                'employee' in employeeGame[playerData.turn] &&
                playerData.time !== '0:00' && (
                  <div
                    onClick={() => setIsVisible(false)}
                    className={` ${
                      isVisible ? 'transition-opacity duration-500 opacity-100' : 'opacity-0'
                    }  flex justify-center w-full h-full flex-col flex-grow`}
                  >
                    <PlayerDialogOptions
                      cpuQuestion={
                        playerData.turn === 'firstTurn' ? employeeStartingPhrase : (cpuChoice?.dialog as string)
                      }
                      options={employeeGame[playerData.turn].employee as Option[]}
                    />
                  </div>
                )}
            </main>
          ) : (
            <main className='flex flex-col min-h-full flex-grow justify-start items-center pt-8'>
              {playerData.turn === 'firstTurn' && <DialogBallon content={employerStartingPhrase} />}
              {playerData.turn && employerGame[playerData.turn] && 'employee' in employerGame[playerData.turn] ? (
                <DialogBallon cpuName='Márcia' content={cpuChoice?.dialog as string} />
              ) : (
                ''
              )}
              {employerGame[playerData.turn] && 'employer' in employerGame[playerData.turn] && (
                <div className='flex justify-center w-full h-full flex-col flex-grow'>
                  <PlayerDialogOptions options={employerGame[playerData.turn].employer as Option[]} />
                </div>
              )}
            </main>
          )}
        </>
      )}
    </div>
  );
};

export default BattleScreen;
