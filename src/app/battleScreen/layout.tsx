'use client';
import { PowerUp, Thermometer, Timer } from '@/components';
import { useGameContext } from '@/context/gameContext';
import { average } from '@/libs/avarege';
import { Rounded } from '@/libs/fonts';
import { backgrounds } from '@/libs/gameData';
import { useEffect } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    averageAdrenaline,
    setAverageAdrenaline,
    averageEngagement,
    setAverageEngagement,
    playerData,
    selectedBattleBackground,
    setSelectedBattleBackground,
    sendPowerUp
  } = useGameContext();

  useEffect(() => {
    setSelectedBattleBackground(backgrounds[Math.floor(Math.random() * backgrounds.length)]);
  }, []);

  useEffect(() => {
    setAverageEngagement(average({ values: playerData.engagement }));
    setAverageAdrenaline(average({ values: playerData.adrenaline }));
  }, [playerData.adrenaline, playerData.engagement]);

  return (
    <div className='flex flex-col absolute inset-0 overflow-hidden'>
      {selectedBattleBackground && (
        <img
          src={selectedBattleBackground}
          className='absolute -z-40 bg-contain bg-center w-screen h-screen brightness-50 opacity-80'
          alt='background'
        />
      )}
      <Timer />
      <div className='absolute bottom-8 left-[55%] flex items-center gap-2 w-80'>
        <div className='flex flex-col justify-start items-start gap-2'>
          <p className={`${Rounded.className} text-white`}>Adrenalina:</p>
          <p className={`${Rounded.className} text-white`}>Engajamento:</p>
        </div>
        <div className='flex flex-col justify-center gap-4 w-full'>
          <Thermometer type='adrenaline' value={averageAdrenaline} />
          <Thermometer type='engagement' value={averageEngagement} />
        </div>
      </div>
      {sendPowerUp && <PowerUp />}
      {children}
    </div>
  );
}
