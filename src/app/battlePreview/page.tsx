import Image from 'next/image';

const BattlePreview = () => {
  return (
    <>
      <Image
        width={3000}
        height={2000}
        src={'/battle-preview/bg.jpg'}
        className='absolute -z-10 bg-contain bg-center w-screen h-screen '
        alt='background'
      />
      
    </>
  );
};

export default BattlePreview;
