'use client';

import { TurnsType, turns } from '@/libs/gameData';
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
  playerAvatar: string;
  cpuAvatar: string;
  role: 'employee' | 'employer';
  turn: TurnsType;
};

export const GameProvider = ({ children }: GameProviderProps) => {
  const [step, setStep] = useState(2);
  const [canContinue, setCanContinue] = useState(false);
  const [playerData, setPlayerData] = useState<PlayerDataType>({
    name: 'Vinícius',
    score: '',
    engagement: [],
    adrenaline: [],
    time: '',
    playerAvatar: '',
    cpuAvatar: '',
    role: 'employee',
    turn: 'firstTurn',
  });

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
