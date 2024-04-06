'use client';
import { AvatarOption } from '@/components';
import { useGameContext } from '@/context/gameContext';
import { employeeCharacters, employerCharacters } from '@/libs/gameData';
import { ActionName } from '@/libs/gamepad';
import { useActionEffect, useAxisEffect } from '@/libs/input';
import { useCycleValue } from '@/libs/math';
import { CharacterType } from '@/types/types';
import { useRouter } from 'next/navigation';

const CharSelection = () => {
  const { playerData, setPlayerData } = useGameContext();
  const router = useRouter();

  const [selectedIndex, bumpUpIndex, bumpDownIndex] = useCycleValue(0, 0, 3);

  useActionEffect(ActionName.MoveRight, () => bumpUpIndex(), [selectedIndex]);
  useActionEffect(ActionName.MoveLeft, () => bumpDownIndex(), [selectedIndex]);

  useActionEffect(
    ActionName.Confirm,
    () => {
      new Audio('/sounds/click-avatar-obj.mp3').play();

      if (playerData.role === 'employee') {
        setPlayerData({ ...playerData, playerCharacter: employeeCharacters[selectedIndex] });
      } else {
        const receiver = playerData;

        receiver.playerCharacter = employerCharacters[selectedIndex];
        setPlayerData(receiver);
      }

      router.push('/battlePreview');
    },
    [selectedIndex]
  );

  return (
    <>
      <div className='absolute -z-20 top-0 left-0 w-screen h-screen bg-slate-950 overflow-hidden'>
        <img
          src={'/selection-screen/bg_avatar.jpg'}
          className='absolute -z-10 bg-contain bg-center w-screen h-screen opacity-50'
          alt='background'
        />
      </div>
      <main className='flex flex-col h-screen w-screen overflow-hidden'>
        <img className='h-16 mt-24 object-contain' src='/selection-screen/title.png' alt='' />
        <div className='flex h-full gap-4 justify-center items-center'>
          {playerData.role === 'employee'
            ? employeeCharacters.map((char: CharacterType, index) => (
                <AvatarOption selected={selectedIndex === index} key={char.name} character={char} />
              ))
            : employerCharacters.map((char: CharacterType, index) => (
                <AvatarOption selected={selectedIndex === index} key={char.name} character={char} />
              ))}
        </div>
      </main>
    </>
  );
};

export default CharSelection;
