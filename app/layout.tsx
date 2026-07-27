import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Владислав Савчук — HRD / Head of Recruitment',
  description: 'Лендинг-портфолио Владислава Савчука — HRD, Head of Recruitment и Recruitment Team Lead.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}