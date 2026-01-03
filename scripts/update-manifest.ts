import fs from 'fs';
import path from 'path';

const manifestPath = path.join(process.cwd(), 'public', 'tonconnect-manifest.json');

// Default to Vercel production URL if no argument provided
const defaultUrl = 'https://icc-t20-2026-cricket.vercel.app';

// Order of precedence:
// 1. Command line argument
// 2. NETLIFY URL (process.env.URL)
// 3. VERCEL URL (process.env.VERCEL_URL) - note: needs protocol
// 4. Default
let appUrl = process.argv[2];

if (!appUrl) {
    if (process.env.URL) {
        // Netlify
        appUrl = process.env.URL;
        console.log('Detected Netlify URL:', appUrl);
    } else if (process.env.VERCEL_URL) {
        // Vercel (usually comes without protocol)
        appUrl = `https://${process.env.VERCEL_URL}`;
        console.log('Detected Vercel URL:', appUrl);
    } else {
        appUrl = defaultUrl;
        console.log('Using default URL:', appUrl);
    }
} else {
    console.log('Using provided URL:', appUrl);
}

// Read existing manifest to preserve other fields
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Update fields
manifest.url = appUrl;
manifest.iconUrl = `${appUrl}/icon.svg`;

// Write back
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log(`Updated tonconnect-manifest.json for ${appUrl}`);
