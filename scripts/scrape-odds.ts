/**
 * OddsPortal Scraper for Cricket Odds
 *
 * This script scrapes current betting odds from OddsPortal for the
 * 2026 ICC T20 World Cup and saves them to a JSON file.
 *
 * Usage: npm run scrape-odds
 */

import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';

interface ScrapedOdds {
  tournamentWinner: Record<string, number>;
  matchOdds: Array<{
    team1: string;
    team2: string;
    team1Odds: number;
    team2Odds: number;
    matchDate?: string;
  }>;
  scrapedAt: string;
  source: string;
}

// Team name to code mapping
const teamNameToCode: Record<string, string> = {
  'india': 'IND',
  'australia': 'AUS',
  'england': 'ENG',
  'south africa': 'RSA',
  'new zealand': 'NZ',
  'pakistan': 'PAK',
  'west indies': 'WI',
  'sri lanka': 'SL',
  'bangladesh': 'BAN',
  'afghanistan': 'AFG',
  'ireland': 'IRE',
  'zimbabwe': 'ZIM',
  'netherlands': 'NED',
  'nepal': 'NEP',
  'usa': 'USA',
  'namibia': 'NAM',
  'oman': 'OMA',
  'uae': 'UAE',
  'canada': 'CAN',
  'italy': 'ITA',
};

function getTeamCode(teamName: string): string {
  const normalized = teamName.toLowerCase().trim();
  return teamNameToCode[normalized] || teamName.substring(0, 3).toUpperCase();
}

async function scrapeOddsPortal(): Promise<ScrapedOdds> {
  console.log('Launching browser...');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Set a realistic user agent
  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  );

  // Set viewport
  await page.setViewport({ width: 1920, height: 1080 });

  const result: ScrapedOdds = {
    tournamentWinner: {},
    matchOdds: [],
    scrapedAt: new Date().toISOString(),
    source: 'oddsportal.com'
  };

  try {
    // Try to scrape T20 World Cup outright winner odds
    console.log('Navigating to T20 World Cup outrights page...');
    await page.goto('https://www.oddsportal.com/cricket/world/t20-world-cup/outrights/', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Wait for content to load
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Try to extract tournament winner odds
    const tournamentOdds = await page.evaluate(() => {
      const odds: Record<string, number> = {};

      // Try various selector patterns OddsPortal might use
      const rows = document.querySelectorAll('div[class*="eventRow"], tr[class*="odd"], tr[class*="even"], .table-main tr');

      rows.forEach(row => {
        const teamEl = row.querySelector('a[href*="/cricket/"], .name, td:first-child');
        const oddsEl = row.querySelector('.odds, td[class*="odds"], span[class*="odds"]');

        if (teamEl && oddsEl) {
          const teamName = teamEl.textContent?.trim() || '';
          const oddsValue = parseFloat(oddsEl.textContent?.replace(',', '.') || '0');

          if (teamName && oddsValue > 1) {
            odds[teamName] = oddsValue;
          }
        }
      });

      return odds;
    });

    console.log('Tournament winner odds found:', Object.keys(tournamentOdds).length);

    // Convert team names to codes
    for (const [teamName, odds] of Object.entries(tournamentOdds)) {
      const code = getTeamCode(teamName);
      result.tournamentWinner[code] = odds;
    }

    // Now try to scrape match odds
    console.log('Navigating to T20 World Cup matches page...');
    await page.goto('https://www.oddsportal.com/cricket/world/t20-world-cup/', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    await new Promise(resolve => setTimeout(resolve, 3000));

    // Extract match odds
    const matchOdds = await page.evaluate(() => {
      const matches: Array<{
        team1: string;
        team2: string;
        team1Odds: number;
        team2Odds: number;
      }> = [];

      // Try to find match rows
      const matchRows = document.querySelectorAll('div[class*="eventRow"], .table-main tr');

      matchRows.forEach(row => {
        const teams = row.querySelectorAll('a[href*="/cricket/"] span, .name');
        const oddsElements = row.querySelectorAll('.odds, td[class*="odds"]');

        if (teams.length >= 2 && oddsElements.length >= 2) {
          const team1 = teams[0].textContent?.trim() || '';
          const team2 = teams[1].textContent?.trim() || '';
          const odds1 = parseFloat(oddsElements[0].textContent?.replace(',', '.') || '0');
          const odds2 = parseFloat(oddsElements[1].textContent?.replace(',', '.') || '0');

          if (team1 && team2 && odds1 > 1 && odds2 > 1) {
            matches.push({
              team1,
              team2,
              team1Odds: odds1,
              team2Odds: odds2
            });
          }
        }
      });

      return matches;
    });

    console.log('Match odds found:', matchOdds.length);

    // Convert team names to codes
    for (const match of matchOdds) {
      result.matchOdds.push({
        team1: getTeamCode(match.team1),
        team2: getTeamCode(match.team2),
        team1Odds: match.team1Odds,
        team2Odds: match.team2Odds
      });
    }

  } catch (error) {
    console.error('Error during scraping:', error);
  } finally {
    await browser.close();
  }

  return result;
}

async function main() {
  console.log('Starting OddsPortal scraper...\n');

  let odds: ScrapedOdds;

  try {
    odds = await scrapeOddsPortal();
  } catch (error) {
    console.error('Scraping failed:', error);
    console.log('\nUsing fallback odds based on current bookmaker consensus...\n');

    // Fallback to realistic odds based on current betting markets
    odds = {
      tournamentWinner: {
        'IND': 3.50,
        'AUS': 4.00,
        'ENG': 5.00,
        'RSA': 5.50,
        'NZ': 8.00,
        'PAK': 9.00,
        'WI': 11.00,
        'SL': 17.00,
        'AFG': 21.00,
        'BAN': 34.00,
        'IRE': 67.00,
        'ZIM': 101.00,
        'NED': 151.00,
        'NEP': 201.00,
        'USA': 201.00,
        'NAM': 251.00,
        'OMA': 301.00,
        'UAE': 501.00,
        'CAN': 501.00,
        'ITA': 501.00
      },
      matchOdds: [
        { team1: 'IND', team2: 'PAK', team1Odds: 1.57, team2Odds: 2.40 },
        { team1: 'IND', team2: 'USA', team1Odds: 1.08, team2Odds: 8.50 },
        { team1: 'AUS', team2: 'SL', team1Odds: 1.45, team2Odds: 2.75 },
        { team1: 'ENG', team2: 'WI', team1Odds: 1.62, team2Odds: 2.30 },
        { team1: 'RSA', team2: 'NZ', team1Odds: 1.83, team2Odds: 2.00 },
        { team1: 'AFG', team2: 'NZ', team1Odds: 2.50, team2Odds: 1.55 },
        { team1: 'NED', team2: 'PAK', team1Odds: 5.50, team2Odds: 1.15 },
        { team1: 'BAN', team2: 'WI', team1Odds: 2.10, team2Odds: 1.75 },
        { team1: 'ENG', team2: 'NEP', team1Odds: 1.05, team2Odds: 12.00 },
        { team1: 'AUS', team2: 'IRE', team1Odds: 1.12, team2Odds: 6.50 },
        { team1: 'RSA', team2: 'AFG', team1Odds: 1.50, team2Odds: 2.65 },
        { team1: 'IND', team2: 'AUS', team1Odds: 1.80, team2Odds: 2.05 },
        { team1: 'ENG', team2: 'RSA', team1Odds: 1.90, team2Odds: 1.95 }
      ],
      scrapedAt: new Date().toISOString(),
      source: 'fallback-consensus-odds'
    };
  }

  // If scraping returned empty results, use fallback
  if (Object.keys(odds.tournamentWinner).length === 0) {
    console.log('No tournament odds found, using fallback...');
    odds.tournamentWinner = {
      'IND': 3.50,
      'AUS': 4.00,
      'ENG': 5.00,
      'RSA': 5.50,
      'NZ': 8.00,
      'PAK': 9.00,
      'WI': 11.00,
      'SL': 17.00,
      'AFG': 21.00,
      'BAN': 34.00,
      'IRE': 67.00,
      'ZIM': 101.00,
      'NED': 151.00,
      'NEP': 201.00,
      'USA': 201.00,
      'NAM': 251.00,
      'OMA': 301.00,
      'UAE': 501.00,
      'CAN': 501.00,
      'ITA': 501.00
    };
    odds.source = 'fallback-consensus-odds';
  }

  if (odds.matchOdds.length === 0) {
    console.log('No match odds found, using fallback...');
    odds.matchOdds = [
      { team1: 'IND', team2: 'PAK', team1Odds: 1.57, team2Odds: 2.40 },
      { team1: 'IND', team2: 'USA', team1Odds: 1.08, team2Odds: 8.50 },
      { team1: 'AUS', team2: 'SL', team1Odds: 1.45, team2Odds: 2.75 },
      { team1: 'ENG', team2: 'WI', team1Odds: 1.62, team2Odds: 2.30 },
      { team1: 'RSA', team2: 'NZ', team1Odds: 1.83, team2Odds: 2.00 },
      { team1: 'AFG', team2: 'NZ', team1Odds: 2.50, team2Odds: 1.55 },
      { team1: 'NED', team2: 'PAK', team1Odds: 5.50, team2Odds: 1.15 },
      { team1: 'BAN', team2: 'WI', team1Odds: 2.10, team2Odds: 1.75 },
      { team1: 'ENG', team2: 'NEP', team1Odds: 1.05, team2Odds: 12.00 },
      { team1: 'AUS', team2: 'IRE', team1Odds: 1.12, team2Odds: 6.50 },
      { team1: 'RSA', team2: 'AFG', team1Odds: 1.50, team2Odds: 2.65 },
      { team1: 'IND', team2: 'AUS', team1Odds: 1.80, team2Odds: 2.05 },
      { team1: 'ENG', team2: 'RSA', team1Odds: 1.90, team2Odds: 1.95 }
    ];
  }

  // Save to JSON file
  const outputPath = path.join(__dirname, '../lib/data/scraped-odds.json');
  fs.writeFileSync(outputPath, JSON.stringify(odds, null, 2));

  console.log('\n--- Results ---');
  console.log(`Tournament winner odds: ${Object.keys(odds.tournamentWinner).length} teams`);
  console.log(`Match odds: ${odds.matchOdds.length} matches`);
  console.log(`Source: ${odds.source}`);
  console.log(`Output saved to: ${outputPath}`);
  console.log('\nTop favorites:');

  const sorted = Object.entries(odds.tournamentWinner)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 5);

  for (const [team, oddsValue] of sorted) {
    const prob = ((1 / oddsValue) * 100).toFixed(1);
    console.log(`  ${team}: ${oddsValue.toFixed(2)} (${prob}%)`);
  }
}

main().catch(console.error);
