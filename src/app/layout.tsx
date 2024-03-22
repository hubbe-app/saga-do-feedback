import type { Metadata } from 'next';
import './globals.css';
import { Jakarta } from '@/libs/fonts';
import { GameProvider } from '@/context/gameContext';

export const metadata: Metadata = {
  title: 'Saga do Feedback',
  description: 'Jogo desenvolvido pela Hubbe.app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <GameProvider>
        <body className={`${Jakarta.className} w-screen h-screen`} >{children}</body>
      </GameProvider>
    </html>
  );
}
