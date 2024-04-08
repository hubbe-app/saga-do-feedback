'use client';

import { Plus_Jakarta_Sans, M_PLUS_Rounded_1c } from 'next/font/google';

export const Jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] });
export const Rounded = M_PLUS_Rounded_1c({
  weight: '800',
  subsets: ['latin'],
  fallback: ['sans-serif', 'Plus_Jakarta_Sans'],
  display: 'swap'
});
