'use client';

import { BattleCore } from '@/components';
import { useGameContext } from '@/context/gameContext';
import { average } from '@/libs/avarege';
import { Rounded } from '@/libs/fonts';
import { TurnsType, employeeGame, employerGame } from '@/libs/gameData';
import { Option } from '@/types/types';
import { useEffect } from 'react';

const BattleScreen = () => {
  const {
    playerData,
    timeOver,
    averageAdrenaline,
    setCpuChoice,
    turn,
  } = useGameContext();

  useEffect(() => {
    findNextQuestion();
  }, [turn]);

  const findNextQuestion = () => {
    let options: Option[] | undefined = [];

    if (playerData.role === 'employee') {
      options = employeeGame[turn as TurnsType].employer;
    } else {
      options = employerGame[turn as TurnsType].employee;
    }
    if (options) {
      if (average({ values: playerData.adrenaline }) > average({ values: playerData.engagement })) {
        if (turn === 'conclusion') {
          options.sort((a, b) => b.adrenaline - a.adrenaline);
        } else {
          options.sort((a, b) => {
            const diffAdrenalineA = Math.abs(averageAdrenaline - a.adrenaline);
            const diffAdrenalineB = Math.abs(averageAdrenaline - b.adrenaline);

            return diffAdrenalineA - diffAdrenalineB;
          });
        }
      } else {
        options.sort((a, b) => {
          const diffEngagementA = Math.abs(average({ values: playerData.engagement }) - a.engagement);
          const diffEngagementB = Math.abs(average({ values: playerData.engagement }) - b.engagement);
          const diffAdrenalineA = Math.abs(average({ values: playerData.adrenaline }) - a.adrenaline);
          const diffAdrenalineB = Math.abs(average({ values: playerData.adrenaline }) - b.adrenaline);

          if (diffEngagementA !== diffEngagementB) {
            return diffEngagementA - diffEngagementB;
          } else {
            return diffAdrenalineA - diffAdrenalineB;
          }
        });
      }

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
        <BattleCore />
      )}
    </>
  );
};

export default BattleScreen;
