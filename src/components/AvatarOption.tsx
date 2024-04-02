'use client';
import { useGameContext } from '@/context/gameContext';
import { Rounded } from '@/libs/fonts';
import { CharacterType } from '@/types/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type AvatarOptionProps = {
  character: CharacterType;
};

export const AvatarOption = ({ character }: AvatarOptionProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { setPlayerData, playerData } = useGameContext();
  const router = useRouter()

  const clickHandler = () => {
    setPlayerData({ ...playerData, playerCharacter: character });
    router.push('/battlePreview')
  };

  return (
    <div onClick={clickHandler} className='flex flex-col w-fit h-full items-center justify-center gap-6'>
      <div
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className='h-52 w-52 cursor-pointer rounded-3xl hover:border-4 hover:shadow border-blue-400 hover:backdrop-blur-md'
      >
        <img className='h-full w-full' src={character.avatar} alt={character.name} />
      </div>
      <div
        className={`${!isHovered ? 'hidden' : 'block'} ${
          Rounded.className
        } text-center w-52 p-4 gap-2 bg-gray-900 bg-opacity-60 rounded-3xl border border-gray-900 flex-col justify-center items-center inline-flex`}
      >
        <p className='text-blue-300 text-3xl font-extrabold'>{character.name}</p>
        <p className='text-white text-2xl font-extrabold'>{character.description}</p>
      </div>
      <div
        className={`${isHovered ? 'hidden' : 'block'} ${
          Rounded.className
        } text-center w-52 h-[142px] p-4 gap-2 rounded-3xl  flex-col justify-center items-center inline-flex`}
      ></div>
    </div>
  );
};
