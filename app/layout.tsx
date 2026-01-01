import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { Header } from '@/components/layout/Header';
import { TradeSlip } from '@/components/trade-slip/TradeSlip';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = 'https://icc-t20-2026-cricket.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Cricket Prediction Markets | TON Blockchain | ICC T20 World Cup 2026',
    template: '%s | Cricket Prediction Markets',
  },
  description:
    'Decentralized cricket prediction markets on TON blockchain for ICC T20 World Cup 2026. Trade on India, Pakistan, Australia & 20 teams. Telegram-native crypto forecasts with transparent pricing. Popular in India & Indonesia.',
  keywords: [
    // Cricket keywords
    'cricket prediction market',
    'cricket trading',
    'ICC T20 World Cup 2026',
    'T20 cricket forecasting',
    'cricket pricing',
    'India cricket',
    'India vs Pakistan',
    'cricket match predictions',
    'IPL trading',
    'cricket world cup',

    // TON & Crypto keywords
    'TON blockchain',
    'TON prediction',
    'crypto prediction market',
    'decentralized trading',
    'blockchain trading',
    'TON wallet',
    'Toncoin trading',
    'Web3 forecasting',
    'DeFi prediction market',

    // Telegram keywords
    'Telegram prediction',
    'Telegram forecast',
    'Telegram crypto trading',
    'Telegram mini app',
    'TON Telegram',

    // Regional keywords
    'India markets',
    'Indonesia trading',
    'cricket markets India',
    'cricket forecasting Indonesia',
    'Asia cricket trading',
    'South Asia prediction market',

    // General
    'prediction market',
    'sports forecasting',
    'match winner prediction',
    'cricket forecast',
    'live cricket pricing',
  ],
  authors: [{ name: 'Cricket Prediction Markets' }],
  creator: 'Cricket Prediction Markets',
  publisher: 'Cricket Prediction Markets',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['hi_IN', 'id_ID'],
    url: siteUrl,
    siteName: 'Cricket Prediction Markets',
    title: 'Cricket Prediction Markets on TON | ICC T20 World Cup 2026',
    description:
      'Trade on ICC T20 World Cup 2026 with TON blockchain. Decentralized prediction markets for India, Pakistan, Australia & more. Telegram-native, transparent pricing.',
    images: [
      {
        url: '/images/cricket4.jpg',
        width: 1200,
        height: 630,
        alt: 'Cricket Prediction Markets - ICC T20 World Cup 2026',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cricket Prediction Markets | TON Blockchain Trading',
    description:
      'Decentralized cricket forecasting on TON. ICC T20 World Cup 2026 predictions. India, Indonesia & global. Telegram-native.',
    images: ['/images/cricket4.jpg'],
    creator: '@CricketMarkets',
  },
  verification: {
    // Add your verification codes when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'en-US': siteUrl,
      'hi-IN': `${siteUrl}/hi`,
      'id-ID': `${siteUrl}/id`,
    },
  },
  category: 'prediction markets',
  classification: 'Prediction Markets, Sports Trading, Cryptocurrency',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Cricket Markets',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#0088CC',
    'theme-color': '#0088CC',
    'telegram:channel': '@CricketPredictionMarkets',
    'geo.region': 'IN',
    'geo.placename': 'India',
    'ICBM': '20.5937, 78.9629',
  },
};

// JSON-LD structured data for rich snippets
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Cricket Prediction Markets',
  description: 'Decentralized cricket prediction markets on TON blockchain for ICC T20 World Cup 2026',
  url: siteUrl,
  applicationCategory: 'Sports, Finance',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    category: 'Prediction Markets',
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Cricket Fans, Sports Bettors, Crypto Users',
    geographicArea: ['India', 'Indonesia', 'Pakistan', 'Bangladesh', 'Sri Lanka', 'Australia', 'England'],
  },
  about: {
    '@type': 'SportsEvent',
    name: 'ICC T20 World Cup 2026',
    startDate: '2026-02-07',
    endDate: '2026-03-08',
    location: {
      '@type': 'Place',
      name: 'India & Sri Lanka',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <meta name="format-detection" content="telephone=no" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <Header />
            <main className="container mx-auto px-4 py-6 max-w-7xl">
              {children}
            </main>
            <TradeSlip />
          </div>
        </Providers>
      </body>
    </html>
  );
}
