const LoadingPage = () => {
    return (
      <>
        <div className='z-30 absolute top-0 left-0 flex justify-center items-center h-full w-full backdrop-blur-md bg-black opacity-30 overflow-hidden hide-scrollbar'/>
        <div className='absolute top-0 left-0 z-40 h-full w-full flex flex-col justify-center items-center overflow-hidden hide-scrollbar'>
          <img className='w-40 mb-3 aspect-auto' src='/logo.svg' alt='' loading='lazy' />
          <p className='text-3xl justify-center text-center items-center text-white'>Loading...</p>
        </div>
      </>
    );
  };
  
  export default LoadingPage;
  