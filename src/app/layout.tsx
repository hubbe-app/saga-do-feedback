'use client'

import './globals.css';
import { Jakarta } from '@/libs/fonts';
import { GameProvider } from '@/context/gameContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <GameProvider>
        <body className={`${Jakarta.className} absolute w-screen h-screen`} >{children}</body>
      </GameProvider>
    </html>
  );
}
