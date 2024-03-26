'use client';

import { average } from '@/libs/avarege';
import { TurnsType, employeeCharacters, employerCharacters, turns } from '@/libs/gameData';
import { CharacterType, RankingType } from '@/types/types';
import { useRouter } from 'next/navigation';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

type GameContextType = {
  canContinue: boolean;
  setCanContinue: (e: boolean) => void;
  step: number;
  setStep: (e: number) => void;
  next: () => void;
  nextTurn: () => void;
  playerData: PlayerDataType;
  setPlayerData: (e: PlayerDataType) => void;
  timeOver: boolean;
  setTimeOver: (e: boolean) => void;
  sendPowerUp: boolean;
  setSendPowerUp: (e: boolean) => void;
  isOptionsVisible: boolean;
  setIsOptionsVisible: (e: boolean) => void;
};

export const GameContext = createContext<GameContextType | null>(null);

type GameProviderProps = {
  children: ReactNode;
};

type PlayerDataType = {
  name: string;
  score: string;
  engagement: number[];
  adrenaline: number[];
  time: string;
  playerCharacter: CharacterType;
  cpuCharacter: CharacterType;
  role: 'employee' | 'employer';
  turn: TurnsType;
};

export const GameProvider = ({ children }: GameProviderProps) => {
  const [step, setStep] = useState(2);
  const [canContinue, setCanContinue] = useState(false);
  const [timeOver, setTimeOver] = useState(false);
  const [sendPowerUp, setSendPowerUp] = useState(false);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [playerData, setPlayerData] = useState<PlayerDataType>({
    name: 'Vinícius',
    score: '',
    engagement: [],
    adrenaline: [],
    time: '',
    cpuCharacter: {
      avatar: '/selectionScreen/ga2.png',
      fullBody: '/battle/g2ana.png',
      fullBodyOn: '/battle/g2ana_on.png',
      name: 'Ana',
      description: 'Gestora de RH',
    },
    playerCharacter: {
      avatar: '/selectionScreen/ca2.png',
      fullBody: '/battle/c2leticia.png',
      fullBodyOn: '/battle/c2leticia_on.png',
      name: 'Letícia',
      description: 'Operadora de Máquina',
    },
    role: 'employee',
    turn: 'firstTurn',
  });
  const router = useRouter();

  useEffect(() => {
    if (playerData.role === 'employee') {
      setPlayerData({
        ...playerData,
        cpuCharacter: employerCharacters[Math.floor(Math.random() * employerCharacters.length)],
      });
    } else {
      setPlayerData({
        ...playerData,
        cpuCharacter: employeeCharacters[Math.floor(Math.random() * employeeCharacters.length)],
      });
    }
  }, [playerData.role]);

  useEffect(() => {
    if (playerData.turn === 'conclusion') {
      const score = Math.floor(
        (average({ values: playerData.engagement }) - average({ values: playerData.adrenaline })) * 50
      );
      const rankingList: RankingType[] = JSON.parse(localStorage.getItem('rankingList') || '[]');
      if (score < 0) {
        rankingList.push({ name: playerData.name, score: '0', time: playerData.time });
      } else {
        rankingList.push({ name: playerData.name, score: `${score}`, time: playerData.time });
      }
      localStorage.setItem('rankingList', JSON.stringify(rankingList));
    }

    router.push('/mainScreen');
  }, [playerData.turn]);

  const nextTurn = () => {
    const currentIndex = turns.indexOf(playerData.turn);
    const nextIndex = currentIndex + 1;
    if (nextIndex < turns.length) {
      const nextTurn = turns[nextIndex] as TurnsType;
      setPlayerData({ ...playerData, turn: nextTurn });
    }
  };

  const next = () => {
    setStep(step + 1);
  };

  return (
    <GameContext.Provider
      value={{
        step,
        setStep,
        canContinue,
        setCanContinue,
        next,
        nextTurn,
        playerData,
        setPlayerData,
        timeOver,
        setTimeOver,
        sendPowerUp,
        setSendPowerUp,
        isOptionsVisible,
        setIsOptionsVisible,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};
