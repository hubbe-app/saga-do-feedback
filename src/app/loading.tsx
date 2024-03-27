const LoadingPage = () => {
  return (
    <>
      <div className='absolute top-0 left-0 z-40 h-full w-full flex flex-col justify-center items-center overflow-hidden hide-scrollbar'>
        <img className='w-96 animate-pulse mb-3 aspect-auto' src='/logo.svg' alt='' loading='lazy' />
        <p className='text-3xl justify-center text-center items-center text-white'>Loading...</p>
      </div>
    </>
  );
};

export default LoadingPage;
