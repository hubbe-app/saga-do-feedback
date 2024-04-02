import Image from "next/image";

const LoadingPage = () => {
  return (
    <>
      <div className='h-full w-full flex flex-col justify-center items-center overflow-hidden'>
      <div className='absolute -z-20 top-0 left-0 w-screen h-screen bg-slate-950 overflow-hidden'>
        <Image
          width={3000}
          height={2000}
          src={'/bg_inicial.jpg'}
          className='absolute -z-10 bg-contain bg-center w-screen h-screen opacity-50'
          alt='background'
        />
      </div>
        <img className='w-96 animate-pulse mb-3 aspect-auto' src='/logo.svg' alt='' loading='lazy' />
        <p className='text-3xl justify-center text-center items-center text-white'>Loading...</p>
      </div>
    </>
  );
};

export default LoadingPage;
