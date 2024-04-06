'use client'

import { Rounded } from "@/libs/fonts";

type DialogBallonProps = {
  content: string;
  cpuName?: string;
};

export const DialogBallon = ({ content, cpuName }: DialogBallonProps) => {
  return (
    <div className= {`${Rounded.className} w-full flex flex-col justify-center items-center text-zinc-950 text-2xl font-extrabold leading-[30px]`}>
      {cpuName && (
        <div className='w-2/5'>
          <div className='ml-8 self-start min-w-32 min-h-10 px-8 py-0.5 bg-red-600 rounded-xl justify-center items-center gap-2.5 inline-flex text-white text-2xl font-extrabold leading-9'>
            {cpuName}
          </div>
          <div className="w-full h-28 flex px-12 py-6 bg-neutral-50 rounded-3xl shadow-inner border-4 border-red-600 justify-center items-center gap-2.5'>">
            {content}
          </div>
        </div>
      )}

      {!cpuName && (
        <div className='w-3/5 h-28 px-12 py-6 bg-neutral-50 rounded-3xl shadow-inner border-2 border-indigo-800 justify-center items-center gap-2.5 inline-flex '>
          {content}
        </div>
      )}

      
    </div>
  );
};
