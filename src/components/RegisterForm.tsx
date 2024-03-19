'use client';
import loginFormHandler from '@/server-actions/loginFormHandler';
import { useState } from 'react';
import { DefaultButton } from '.';

export const RegisterForm = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    if ((e.target as HTMLElement).tagName !== 'INPUT') {
      setIsChecked(!isChecked);
    }
  };

  return (
    <form action={loginFormHandler}>
      <DefaultButton disabled={isChecked} title='iniciar' />
      <div className='mt-6 flex justify-center items-center w-96 bg-gray-900 bg-opacity-80 text-white rounded-3xl px-8 py-4'>
        <div className='flex flex-col gap-2 w-full '>
          <label htmlFor='name'>Nome</label>
          <input required className='bg-neutral-950 rounded-lg h-8 px-2' type='email' id='name' name='name' />
          <label htmlFor='email'>Email</label>
          <input required className='bg-neutral-950 rounded-lg h-8 px-2' type='text' id='email' name='email' />
          <label htmlFor='phone'>Telefone</label>
          <input required className='bg-neutral-950 rounded-lg h-8 px-2' type='tel' id='phone' name='phone' />
          <label htmlFor='company'>Empresa</label>
          <input required className='bg-neutral-950 rounded-lg h-8 px-2' type='text' id='company' name='company' />
          <label className='flex gap-2 items-center' onClick={toggleCheckbox}>
            <div
              className={`absolute w-[15px] h-[15px] hover:border focus:border border-white cursor-pointer flex justify-center text-center text-sm items-center bg-zinc-950 rounded`}
            >
              {isChecked && 'X'}
            </div>
            <input required type='checkbox' readOnly checked={isChecked} id='dataSharing' name='dataSharing' />
            <p>Aceito comportilhar meus dados.</p>
          </label>
        </div>
      </div>
    </form>
  );
};
