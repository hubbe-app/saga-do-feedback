import { Rounded } from '@/libs/fonts';
import { CharacterType } from '@/types/types';

type PreviewFaceOffProps = {
  mirrored?: boolean;
  character: CharacterType;
  role: string;
};

export const PreviewFaceOff = ({ mirrored, character, role }: PreviewFaceOffProps) => {

  return (
    <div className={`${Rounded.className} flex h-full w-full`}>
      {mirrored ? (
        <>
          <img
            className={`absolute ${
              role === 'Gestor' ? 'transform scale-x-[-1]' : ''
            } right-0 bottom-0 h-[90vh] flex object-contain`}
            src={character.preview}
            alt='character preview'
          />
          <div className='absolute flex flex-col items-center right-0 bottom-10'>
            <div className='min-w-32 w-fit min-h-10 px-8 py-0.5 bg-red-600 z-20 rounded-xl justify-center items-center flex text-white text-2xl font-extrabold'>
              {role}
            </div>
            <div className='h-[87px] px-[100px] py-2.5 bg-neutral-50 rounded-l-3xl justify-center items-center -mt-1'>
              <div className='text-neutral-700 text-[40px] font-extrabold '>{character.name}</div>
            </div>
          </div>
        </>
      ) : (
        <>
          <img
            className={`absolute ${
              role === 'Colaborador' ? 'transform scale-x-[-1]' : ''
            } left-0 bottom-0 h-[90vh] flex object-contain`}
            src={character.preview}
            alt='character preview'
          />
          <div className='absolute flex flex-col items-center left-0 bottom-10'>
            <div
              className={` flex items-center justify-center text-2xl min-w-32 w-fit min-h-10 z-20 px-8 bg-blue-600 rounded-xl text-white`}
            >
              {role}
            </div>
            <div className='h-[87px] px-[100px] py-2.5 bg-neutral-50 rounded-r-3xl justify-center items-center -mt-1'>
              <div className='text-neutral-700 text-[40px] font-extrabold '>{character.name}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
