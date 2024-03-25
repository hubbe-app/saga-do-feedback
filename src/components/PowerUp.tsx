import { useEffect, useState } from 'react';

export const PowerUp = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [position, setPosition] = useState('0px');
  const [powerUpButton, setPowerUpButton] = useState<ButtonOptionsType>({ button: 'A', bgColor: 'bg-green-700' });

  type ButtonOptionsType = {
    button: string;
    bgColor: string;
  };

  useEffect(() => {
    const buttonOptions = [
      { button: 'X', bgColor: 'bg-blue-600' },
      { button: 'Y', bgColor: 'bg-yellow-600' },
      { button: 'B', bgColor: 'bg-red-600' },
      { button: 'A', bgColor: 'bg-green-600' },
    ];
    setPosition(`${Math.random() * 80}vh`);
    setPowerUpButton(buttonOptions[Math.floor(Math.random() * 4)]);
  }, []);

  const handleClick = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      style={{ top: position }}
      onAnimationEnd={() => setIsVisible(false)}
      className='absolute flex flex-col items-center w-full overflow-hidden animate-slide-right'
    >
      <div className='rounded-full w-36 h-36 border-8 animate-pulse'>
        <img src='/logo-hubbe-png.png' className=' ' alt='Imagem' />
      </div>
      <button onClick={handleClick} className={`${powerUpButton.bgColor} animate-bounce mt-2 px-4 py-2 text-white font-extrabold text-xl rounded-full`}>
        {powerUpButton.button}
      </button>
    </div>
  );
};
