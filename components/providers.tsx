'use client';

import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { DisclaimerModal } from './DisclaimerModal';

// Always use the production Vercel URL for the manifest
// This is required because Tonkeeper wallet needs to fetch this URL
// and it can't access localhost from the mobile app
const MANIFEST_URL = 'https://icc-t20-2026-cricket.vercel.app/tonconnect-manifest.json';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TonConnectUIProvider manifestUrl={MANIFEST_URL}>
      <DisclaimerModal />
      {children}
    </TonConnectUIProvider>
  );
}
