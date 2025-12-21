import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { Header } from '@/components/layout/Header';
import { BetSlip } from '@/components/bet-slip/BetSlip';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cricket Prediction Markets - 2026 ICC T20 World Cup',
  description: 'Decentralized prediction markets for the 2026 ICC T20 World Cup on TON blockchain',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <Header />
            <main className="container mx-auto px-4 py-6 max-w-7xl">
              {children}
            </main>
            <BetSlip />
          </div>
        </Providers>
      </body>
    </html>
  );
}
