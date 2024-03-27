import { useGameContext } from '@/context/gameContext';
import { powerUps } from '@/libs/gameData';
import { PowerUpType } from '@/types/types';
import { useEffect, useState } from 'react';

export const PowerUp = () => {
  const [position, setPosition] = useState({
    startingPositionX: '0px',
    startingPositionY: '0px',
    direction: 'slide-right',
  });
  const [powerUp, setPowerUp] = useState<PowerUpType>();
  const [powerUpButton, setPowerUpButton] = useState<ButtonOptionsType>({ button: 'B', bgColor: 'bg-red-600' });
  const { sendPowerUp, setSendPowerUp, playerData, setPlayerData } = useGameContext();

  type ButtonOptionsType = {
    button: string;
    bgColor: string;
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key.toUpperCase() === powerUpButton.button) {
        handleClick();
      }
    };
  
    window.addEventListener('keydown', handleKeyPress);
  
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [powerUpButton.button]);
  

  useEffect(() => {
    if (!sendPowerUp) {
      return;
    }

    setPowerUp(powerUps[Math.floor(powerUps.length * Math.random())]);

    const buttonOptions = [
      { button: 'X', bgColor: '#1E88E5' },
      { button: 'Y', bgColor: '#FFCF00' },
      { button: 'B', bgColor: '#E53935' },
    ];
    const animation = ['slide-up', 'slide-down', 'slide-left', 'slide-right'];

    const randomDirection = animation[Math.floor(Math.random() * animation.length)];
    let startingPositionY = `${Math.random() * 70 + 15}%`;
    let startingPositionX = `${Math.random() * 70 + 15}%`;
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

    setPowerUpButton(buttonOptions[Math.floor(Math.random() * buttonOptions.length)]);
  }, [sendPowerUp]);

  const handleKeyPress = (event:React.KeyboardEvent<HTMLButtonElement>) => {
    
    if (event.key.toUpperCase() === powerUpButton.button) {
      handleClick();
    }
  };

  const handleClick = () => {
    const receiver = {
      ...playerData,
      adrenaline: [...playerData.adrenaline, powerUp?.adrenaline as number],
      engagement: [...playerData.engagement, powerUp?.engagement as number],
    };
    
    setPlayerData(receiver);
    setSendPowerUp(false);
  };

  return (
    <>
      {sendPowerUp && (
        <div
          style={{ top: position.startingPositionY, left: position.startingPositionX }}
          onAnimationEnd={() => setSendPowerUp(false)}
          className={`absolute z-50 flex flex-col items-center bg-yell overflow-hidden animate-${position.direction}`}
        >
          <div
            style={{ borderColor: powerUpButton.bgColor }}
            className={`flex justify-center items-center rounded-full w-40 h-40 border-8 animate-pulse`}
          >
            <img src={powerUp && powerUp.img} className='max-h-32' alt='Imagem' />
          </div>
          <button
            style={{ backgroundColor: powerUpButton.bgColor }}
            onClick={handleClick}
            onKeyDown={handleKeyPress}
            className={`animate-bounce mt-2 px-4 py-2 text-white font-extrabold text-xl rounded-full`}
          >
            {powerUpButton.button}
          </button>
        </div>
      )}
    </>
  );
};
