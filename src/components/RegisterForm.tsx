'use client';

import { FormEvent, useEffect, useState } from 'react';
import { DefaultButton } from '.';
import { PhoneInput } from './PhoneInput';
import { useGameContext } from '@/context/gameContext';
import { useRouter } from 'next/navigation';
import { useActionEffect } from '@/libs/input';
import { ActionName } from '@/libs/gamepad';
import { Rounded } from '@/libs/fonts';

type FormData = {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
};

export const RegisterForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [formValid, setformValid] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
  });
  const { playerData, setPlayerData } = useGameContext();
  const router = useRouter();

  useEffect(() => {
    isFormValid();
  }, [formData, isChecked]);

  const toggleCheckbox = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    if ((e.target as HTMLElement).tagName !== 'INPUT') {
      setIsChecked(!isChecked);
    }
  };

  const isEmailValid = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const isFormValid = () => {
    if (
      formData.nome.length > 4 &&
      isEmailValid(formData.email) &&
      formData.telefone.length >= 14 &&
      formData.empresa.length > 3 &&
      isChecked === true
    ) {
      setformValid(true);
      return true;
    } else {
      setformValid(false);
      return false;
    }
  };

  useActionEffect(
    ActionName.Confirm,
    () => {
      if (!formValid) {
        return;
      }
      new Audio('/sounds/start-click.wav').play();

      handleSubmit();
    },
    [formValid]
  );

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key.toUpperCase() === 'A') {
        if (!formValid) {
          return;
        }
        new Audio('/sounds/start-click.wav').play();

        handleSubmit();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [formValid]);

  const handleSubmit = (event?: FormEvent) => {
    event?.preventDefault();
    setPlayerData({ ...playerData, name: formData.nome });

    const userList = JSON.parse(localStorage.getItem('users') || '[]') as FormData[];

    userList.push(formData);

    localStorage.setItem('users', JSON.stringify(userList));

    router.push('/objectiveScreen');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='flex gap-4'>
          <DefaultButton disabled={formValid} title='iniciar' />
          {formValid && (
            <div className={`${Rounded.className} text-white text-xl `}>
              Pressione
              <button className='animate-bounce mt-2 px-4 py-2 text-white font-extrabold text-xl rounded-full bg-gradient-to-r from-green-500 via-green-600 to-green-700 shadow-xl mx-2'>
                A
              </button>
              para iniciar
            </div>
          )}
        </div>
        <div className='mt-6 flex justify-center items-center w-96 bg-gray-900 bg-opacity-80 text-white rounded-3xl px-8 py-4'>
          <div className='flex flex-col gap-2 w-full '>
            <label htmlFor='name'>Nome</label>
            <input
              className='bg-neutral-950 rounded-lg h-8 px-2'
              type='text'
              id='name'
              name='name'
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            />
            <label htmlFor='email'>Email</label>
            <input
              className='bg-neutral-950 rounded-lg h-8 px-2'
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <PhoneInput
              valueHandler={(e) => setFormData({ ...formData, telefone: e })}
              className='bg-neutral-950 rounded-lg h-8 px-2'
            />
            <label htmlFor='company'>Empresa</label>
            <input
              className='bg-neutral-950 rounded-lg h-8 px-2'
              type='text'
              id='company'
              name='company'
              value={formData.empresa}
              onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
            />
            <label className='flex gap-2 items-center' onClick={toggleCheckbox}>
              <div
                className={`absolute w-[15px] h-[15px] hover:border focus:border border-white cursor-pointer flex justify-center text-center text-sm items-center bg-zinc-950 rounded`}
              >
                {isChecked && 'X'}
              </div>
              <input type='checkbox' readOnly checked={isChecked} id='dataSharing' name='dataSharing' />
              <p>Aceito comportilhar meus dados.</p>
            </label>
          </div>
        </div>
      </form>
    </>
  );
};
