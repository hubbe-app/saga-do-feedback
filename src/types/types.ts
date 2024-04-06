'use client'

export type Option = { dialog: string; adrenaline: number; engagement: number };

export type Turn = {
  employee?: Option[];
  employer?: Option[];
};

export type GameType = {
  firstTurn: Turn;
  secondTurn: Turn;
  thirdTurn: Turn;
  fourthTurn: Turn;
  fifthTurn: Turn;
  conclusion: Turn;
};

export type PowerUpType = {
  img: string;
  adrenaline: number;
  engagement: number;
};

export type CharacterType = {
  avatar: string;
  fullBody: string;
  fullBodyOn: string;
  name: string;
  description: string;
  preview: string;
};

export type RankingType = {
  name: string;
  score: string;
  time: string;
};
