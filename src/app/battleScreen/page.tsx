'use client';

import { DialogBallon, PlayerDialogOptions, PowerUp, Thermometer, Timer } from '@/components';
import { useGameContext } from '@/context/gameContext';
import { average } from '@/libs/avarege';
import { Rounded } from '@/libs/fonts';
import {
  TurnsType,
  backgrounds,
  employeeGame,
  employeeStartingPhrase,
  employerGame,
  employerStartingPhrase,
} from '@/libs/gameData';
import { Option } from '@/types/types';
import { useEffect } from 'react';

const BattleScreen = () => {
  const {
    playerData,
    timeOver,
    isOptionsVisible,
    averageAdrenaline,
    setAverageAdrenaline,
    averageEngagement,
    setAverageEngagement,
    cpuChoice,
    setCpuChoice,
  } = useGameContext();

  useEffect(() => {
    findNextQuestion();
  }, [playerData.turn]);

  
  const findNextQuestion = () => {
    setAverageEngagement(average({ values: playerData.engagement }));
    setAverageAdrenaline(average({ values: playerData.adrenaline }));

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
    <>
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
                <div
                  className={`${
                    !isOptionsVisible ? 'transition-opacity duration-500 opacity-100' : 'opacity-0 hidden'
                  } w-full`}
                >
                  <DialogBallon content={employeeStartingPhrase} />
                </div>
              )}
              {playerData.turn && employeeGame[playerData.turn] && 'employer' in employeeGame[playerData.turn] && (
                <div
                  className={`${
                    !isOptionsVisible ? 'transition-opacity duration-500 opacity-100' : 'opacity-0 hidden'
                  } w-full h-full flex justify-center`}
                >
                  <div className='absolute right-0 bottom-0 '>
                    <img src={playerData.playerCharacter.fullBody} alt='character' />
                  </div>
                  <div className='absolute left-0 bottom-0 '>
                    <img src={playerData.cpuCharacter.fullBodyOn} alt='character' />
                  </div>
                  <DialogBallon cpuName={playerData.cpuCharacter.name} content={cpuChoice?.dialog as string} />
                </div>
              )}
              {employeeGame[playerData.turn] &&
                'employee' in employeeGame[playerData.turn] &&
                playerData.time !== '0:00' && (
                  <div
                    className={` ${
                      isOptionsVisible ? 'transition-opacity duration-500 opacity-100' : 'opacity-0'
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
                  <PlayerDialogOptions
                    options={employerGame[playerData.turn].employer?.sort(() => Math.random() - 0.5) as Option[]}
                  />
                </div>
              )}
            </main>
          )}
        </>
      )}
    </>
  );
};

export default BattleScreen;
