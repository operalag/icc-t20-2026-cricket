import { mockMarkets } from '@/lib/data/mock-data';
import MarketClient from './MarketClient';

// Server-side function for static export
export function generateStaticParams() {
  return mockMarkets.map((market) => ({
    id: market.id,
  }));
}

export default function MarketPage() {
  return <MarketClient />;
}
