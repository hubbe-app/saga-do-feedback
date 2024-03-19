import type { Metadata } from 'next';
import './globals.css';
import { Jakarta } from '@/libs/fonts';


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
      <body className={Jakarta.className}>{children}</body>
    </html>
  );
}
