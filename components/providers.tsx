'use client';

import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { DisclaimerModal } from './DisclaimerModal';
import { useEffect, useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [manifestUrl, setManifestUrl] = useState<string | null>(null);

  useEffect(() => {
    // Set manifest URL on client side only
    setManifestUrl(`${window.location.origin}/tonconnect-manifest.json`);
  }, []);

  // Don't render TonConnect until we have the manifest URL
  if (!manifestUrl) {
    return (
      <>
        <DisclaimerModal />
        {children}
      </>
    );
  }

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <DisclaimerModal />
      {children}
    </TonConnectUIProvider>
  );
}
