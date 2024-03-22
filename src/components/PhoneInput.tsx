'use client';

import { ChangeEvent, useState } from 'react';

type PhoneInputType = {
  className?: string;
  label?: string;
  placeholder?: string;
  valueHandler?: (e: string) => void;
};

export const PhoneInput = ({ className, label, placeholder, valueHandler }: PhoneInputType) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let val = event.target.value;
    const isDeleting = val.length < phoneNumber.length;

    if (!isDeleting) {
      val = val.replace(/\D/g, '');
      if (val.length > 10) {
        val = val.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
      } else if (val.length > 5) {
        val = val.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
      } else if (val.length > 2) {
        val = val.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
      } else if (val.length > 0) {
        val = val.replace(/^(\d{0,2})/, '($1');
      }
    }
    setPhoneNumber(val);
    valueHandler && valueHandler(val);
  };

  return (
    <>
      <label htmlFor='phone'>
        {label ? label : 'Telefone:'}
      </label>
      <input
        placeholder={placeholder}
        maxLength={15}
        minLength={14}
        value={phoneNumber}
        onChange={handleChange}
        className={className && className}
        type='tel'
        id='phone'
        name='phone'
        inputMode='numeric'
        required
      />
    </>
  );
};
