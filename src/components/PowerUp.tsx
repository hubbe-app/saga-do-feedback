'use client';
import { useGameContext } from '@/context/gameContext';
import { powerUps } from '@/libs/gameData';
import { ActionName } from '@/libs/gamepad';
import { useComboEffect } from '@/libs/input';
import { PowerUpType } from '@/types/types';
import { useEffect, useRef, useState } from 'react';

type ButtonOptionsType = {
  button: string;
  bgColor: string;
  name: string;
  borderColor: string;
};

export const PowerUp = () => {
  const [position, setPosition] = useState({
    startingPositionX: '0px',
    startingPositionY: '0px',
    direction: 'slide-right',
  });
  const { sendPowerUp, setSendPowerUp, playerData, setPlayerData } = useGameContext();

  const buttonOptions = [
    {
      button: ActionName.ButtonX,
      borderColor: '#1E88E5',
      bgColor: 'gradient-to-r from-blue-400 via-blue-500 to-blue-600',
      name: 'X',
    },
    {
      button: ActionName.ButtonY,
      borderColor: '#FFCF00',
      bgColor: 'gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600',
      name: 'Y',
    },
    {
      button: ActionName.ButtonB,
      borderColor: '#E53935',
      bgColor: 'gradient-to-r from-red-400 via-red-500 to-red-600',
      name: 'B',
    },
  ];

  const buttonSelectedRef = useRef<ButtonOptionsType>(buttonOptions[0]);

  const powerUpSelectedRef = useRef<PowerUpType>(powerUps[0]);

  useEffect(() => {
    buttonSelectedRef.current = buttonOptions[Math.floor(Math.random() * buttonOptions.length)];
    powerUpSelectedRef.current = powerUps[Math.floor(powerUps.length * Math.random())];

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key.toUpperCase() === buttonSelectedRef.current.name) {
        handleClick();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        new Audio('/sounds/powerUp-appeared.mp3').play();
      }
    }, 2900);

    const animation = ['slide-up', 'slide-down', 'slide-left', 'slide-right'];

    const randomDirection = animation[Math.floor(Math.random() * animation.length)];
    let startingPositionY = `${Math.random() * 60 + 15}%`;
    let startingPositionX = `${Math.random() * 60 + 15}%`;
    if (randomDirection === 'slide-right') {
      startingPositionX = '0';
    } else if (randomDirection === 'slide-left') {
      startingPositionX = '100%';
    } else if (randomDirection === 'slide-down') {
      startingPositionY = '0';
    } else if (randomDirection === 'slide-up') {
      startingPositionY = '100%';
    }

    setPosition({
      startingPositionY: `${startingPositionY}`,
      startingPositionX: `${startingPositionX}`,
      direction: randomDirection,
    });
  }, [sendPowerUp]);

  useComboEffect([ActionName.ButtonB, ActionName.ButtonX, ActionName.ButtonY], (action) => {
    if (action === buttonSelectedRef.current.button) {
      handleClick();
    }
  });

  const handleKeyPress = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (event.key.toUpperCase() === buttonSelectedRef.current.button) {
      handleClick();
    }
  };

  const handleClick = () => {
    if (typeof window !== 'undefined') {
      new Audio('/sounds/take-powerUp.mp3').play();
    }
    const receiver = playerData;

    receiver.adrenaline = [...receiver.adrenaline, powerUpSelectedRef.current.adrenaline as number];
    receiver.engagement = [...playerData.engagement, powerUpSelectedRef.current.engagement as number];

    setPlayerData(receiver);
    setSendPowerUp(false);
  };

  return (
    <>
      <div
        style={{ top: position.startingPositionY, left: position.startingPositionX }}
        onAnimationEnd={() => setSendPowerUp(false)}
        className={`absolute z-50 flex flex-col items-center overflow-hidden animate-${position.direction}`}
      >
        <div
          style={{ borderColor: buttonSelectedRef.current.borderColor }}
          className={`flex justify-center items-center rounded-full w-40 h-40 border-8 animate-pulse`}
        >
          <img src={powerUpSelectedRef.current.img} className='max-h-32' alt='Imagem' />
        </div>
        <button
          onClick={handleClick}
          onKeyDown={handleKeyPress}
          className={`bg-${buttonSelectedRef.current.bgColor} animate-bounce mt-2 px-4 py-2 text-white font-extrabold text-xl rounded-full`}
        >
          {buttonSelectedRef.current.name}
        </button>
      </div>
    </>
  );
};
