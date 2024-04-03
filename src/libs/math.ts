import { useState } from "react";



export const clamp = (value: number, min: number, max: number) => {
   return Math.min(Math.max(value, min), max);
}

export const useClampValue = (value: number, min: number, max: number, step: number = 1) => {
   const [_value, setValue] = useState(value);
   const bumpUp = () => setValue(clamp(_value + step, min, max));
   const bumpDown = () => setValue(clamp(_value - step, min, max));
   return [
      _value,
      bumpUp,
      bumpDown
   ];
}

export const useCycleValue = (value: number, min: number, max: number, step: number = 1): [number, () => void, () => void] => {
   const [_value, setValue] = useState(value);
   const bumpUp = () => {
      const newValue = _value + step;
      setValue(newValue > max ? min : newValue);
   };
   const bumpDown = () => {
      const newValue = _value - step;
      setValue(newValue < min ? max : newValue);
   };
   return [_value, bumpUp, bumpDown];
}