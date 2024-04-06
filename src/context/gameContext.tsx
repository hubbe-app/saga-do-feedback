'use client';

import { average } from '@/libs/avarege';
import { TurnsType, employeeCharacters, employerCharacters, turns } from '@/libs/gameData';
import { CharacterType, Option, RankingType } from '@/types/types';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';

type GameContextType = {
  nextTurn: () => void;
  gameReset: () => void;
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
  turn: TurnsType;
  setTurn: (e: TurnsType) => void;
  selectedBattleBackground: string;
  setSelectedBattleBackground: (e: string) => void;
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
};

export const GameProvider = ({ children }: GameProviderProps) => {
  const [timeOver, setTimeOver] = useState(false);
  const [sendPowerUp, setSendPowerUp] = useState(false);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [averageAdrenaline, setAverageAdrenaline] = useState(0);
  const [averageEngagement, setAverageEngagement] = useState(0);
  const [turn, setTurn] = useState<TurnsType>('firstTurn');
  const [selectedBattleBackground, setSelectedBattleBackground] = useState('');
  const [cpuChoice, setCpuChoice] = useState<Option>({
    dialog: '',
    adrenaline: 100,
    engagement: 100,
  });
  const [playerData, setPlayerData] = useState<PlayerDataType>({
    name: '',
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
    role: 'employee',
  });

  const router = useRouter();

  const pathname = usePathname();
  const audioRef = useRef(new Audio('/sounds/background-music.mp3'));

  useEffect(() => {
    if (pathname === '/objectiveScreen') {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
      audioRef.current.play();
    }
    if (pathname === '/battleResult') {
      audioRef.current.pause();
    }
  }, [pathname]);

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
    if (turn === 'thirdTurn' || turn === 'fourthTurn') {
      const luckyNum = Math.random() * 10;

      if (luckyNum > 6) {
        setSendPowerUp(true);
      }
    }

    if (turn === 'conclusion' || turn === 'firstTurn') {
      return;
    }
    const timer = setTimeout(() => {
      setIsOptionsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [turn]);

  useEffect(() => {
    if (turn === 'conclusion') {
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
      router.push('/battleResult');
    }
  }, [cpuChoice]);

  const nextTurn = () => {
    const currentIndex = turns.indexOf(turn);
    const nextIndex = currentIndex + 1;
    if (nextIndex < turns.length) {
      const nextTurn = turns[nextIndex] as TurnsType;
      setTurn(nextTurn);
    }
  };

  const gameReset = () => {
    setTurn('firstTurn');
    setPlayerData({
      name: '',
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
      role: 'employee',
    });
    setAverageAdrenaline(0);
    setAverageEngagement(0);
    setCpuChoice({
      dialog: '',
      adrenaline: 100,
      engagement: 100,
    });
  };

  return (
    <GameContext.Provider
      value={{
        nextTurn,
        gameReset,
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
        turn,
        setTurn,
        selectedBattleBackground,
        setSelectedBattleBackground,
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
