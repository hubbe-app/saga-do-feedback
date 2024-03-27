
'use client';

import { average } from '@/libs/avarege';
import { TurnsType, employeeCharacters, employerCharacters, turns } from '@/libs/gameData';
import { CharacterType, Option, RankingType } from '@/types/types';
import { useRouter } from 'next/navigation';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

type GameContextType = {
  nextTurn: () => void;
  playerData: PlayerDataType;
  setPlayerData: (e: PlayerDataType) => void;
  timeOver: boolean;
  setTimeOver: (e: boolean) => void;
  sendPowerUp: boolean;
  setSendPowerUp: (e: boolean) => void;
  isOptionsVisible: boolean;
  setIsOptionsVisible: (e: boolean) => void;
  averageAdrenaline: number;
  setAverageAdrenaline: (e: number) => void;
  averageEngagement: number;
  setAverageEngagement: (e: number) => void;
  cpuChoice: Option;
  setCpuChoice: (e: Option) => void;
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
  const [timeOver, setTimeOver] = useState(false);
  const [sendPowerUp, setSendPowerUp] = useState(false);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [averageAdrenaline, setAverageAdrenaline] = useState(0);
  const [averageEngagement, setAverageEngagement] = useState(0);
  const [cpuChoice, setCpuChoice] = useState<Option>({
    dialog: '',
    adrenaline: 100,
    engagement: 100,
  });
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
    if (playerData.turn === 'thirdTurn' || playerData.turn === 'fourthTurn' || playerData.turn === 'fifthTurn') {
      const luckyNum = Math.random() * 10;

      if (luckyNum > 0) {
        setSendPowerUp(true);
      }
    }

    if (playerData.turn === 'conclusion') {
      return;
    }
    const timer = setTimeout(() => {
      setIsOptionsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [playerData.turn]);

  useEffect(() => {
    if (cpuChoice?.engagement === 5 || cpuChoice?.engagement === 10 || cpuChoice?.engagement === 0) {
      const score = Math.abs(average({ values: playerData.engagement }) - average({ values: playerData.adrenaline }));

      const rankingList: RankingType[] = JSON.parse(localStorage.getItem('rankingList') || '[]');

      if (cpuChoice?.engagement === 5) {
        const result = Math.floor(score * 20);
        rankingList.push({ name: playerData.name, score: `${result}`, time: playerData.time });
      }
      if (cpuChoice?.engagement === 10) {
        const result = Math.floor(score * 30);
        rankingList.push({ name: playerData.name, score: `${result}`, time: playerData.time });
      }
      if (cpuChoice?.engagement === 0) {
        rankingList.push({ name: playerData.name, score: '0', time: playerData.time });
      }
      localStorage.setItem('rankingList', JSON.stringify(rankingList));
      setTimeout(() => {
        router.push('/mainScreen');
      }, 5000);
    }
  }, [cpuChoice]);

  const nextTurn = () => {
    const currentIndex = turns.indexOf(playerData.turn);
    const nextIndex = currentIndex + 1;
    if (nextIndex < turns.length) {
      const nextTurn = turns[nextIndex] as TurnsType;
      setPlayerData({ ...playerData, turn: nextTurn });
    }
  };



  return (
    <GameContext.Provider
      value={{
        nextTurn,
        playerData,
        setPlayerData,
        timeOver,
        setTimeOver,
        sendPowerUp,
        setSendPowerUp,
        isOptionsVisible,
        setIsOptionsVisible,
        averageAdrenaline,
        setAverageAdrenaline,
        averageEngagement,
        setAverageEngagement,
        cpuChoice,
        setCpuChoice,
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
