type DefaultButtonProps = {
  title: string;
  small?: boolean;
};

const DefaultButton = ({ title, small }: DefaultButtonProps) => {
  return (
    <button
      className={`relative ${
        small ? 'w-[150px] h-[68px] px-12 py-3' : 'w-[210px] h-[76px]'
      } px-12 py-4 text-center text-white text-[28px] font-extrabold uppercase bg-gradient-to-b from-cyan-500 to-sky-700 rounded-3xl shadow border-4 border-blue-950 justify-center items-center inline-flex`}
    >
      <div className='absolute w-2 h-2.5 top-1.5 left-2 rotate-[30deg] bg-sky-300 rounded-full' />
      <div className='absolute w-2 h-4 top-1 right-2 -rotate-45 bg-sky-300 rounded-full' />
      {title}
      <img
        className={`absolute bottom-1 w-[97%]`}
        src={'button-shadow.svg'}
        alt=''
      />
    </button>
  );
};

export default DefaultButton;
