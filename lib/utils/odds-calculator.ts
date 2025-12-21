/**
 * LMSR (Logarithmic Market Scoring Rule) Odds Calculator
 *
 * This implements the AMM pricing model for prediction markets.
 */

export class LMSROddsCalculator {
  private liquidityParameter: number;

  constructor(liquidityParameter: number = 100) {
    this.liquidityParameter = liquidityParameter;
  }

  /**
   * Calculate implied probabilities for each outcome
   *
   * @param shares - Array of cumulative shares for each outcome
   * @returns Array of probabilities (sum = 1.0)
   */
  calculateProbabilities(shares: number[]): number[] {
    const expTerms = shares.map(s => Math.exp(s / this.liquidityParameter));
    const sum = expTerms.reduce((a, b) => a + b, 0);
    return expTerms.map(exp => exp / sum);
  }

  /**
   * Convert probabilities to decimal odds
   *
   * @param probabilities - Array of probabilities
   * @returns Array of decimal odds
   */
  probabilitiesToOdds(probabilities: number[]): number[] {
    return probabilities.map(p => (p > 0 ? 1 / p : 999));
  }

  /**
   * Calculate odds from shares
   *
   * @param shares - Array of shares for each outcome
   * @returns Array of decimal odds
   */
  calculateOdds(shares: number[]): number[] {
    const probabilities = this.calculateProbabilities(shares);
    return this.probabilitiesToOdds(probabilities);
  }

  /**
   * Calculate cost to purchase desired shares
   * Uses LMSR cost function: C(q) = b * ln(Σ e^(q_i/b))
   *
   * @param currentShares - Current share distribution
   * @param outcomeIndex - Index of outcome to buy
   * @param desiredShares - Number of shares to purchase
   * @returns Cost in base currency
   */
  calculateCost(
    currentShares: number[],
    outcomeIndex: number,
    desiredShares: number
  ): number {
    const costBefore = this.costFunction(currentShares);

    const newShares = [...currentShares];
    newShares[outcomeIndex] += desiredShares;

    const costAfter = this.costFunction(newShares);

    return costAfter - costBefore;
  }

  /**
   * LMSR cost function
   *
   * @param shares - Array of shares
   * @returns Cost value
   */
  private costFunction(shares: number[]): number {
    const sum = shares.reduce(
      (acc, s) => acc + Math.exp(s / this.liquidityParameter),
      0
    );
    return this.liquidityParameter * Math.log(sum);
  }

  /**
   * Calculate shares needed to achieve desired odds
   *
   * @param currentShares - Current share distribution
   * @param outcomeIndex - Index of outcome
   * @param targetOdds - Desired odds
   * @returns Shares needed to reach target odds
   */
  calculateSharesForTargetOdds(
    currentShares: number[],
    outcomeIndex: number,
    targetOdds: number
  ): number {
    const targetProbability = 1 / targetOdds;
    const currentProbabilities = this.calculateProbabilities(currentShares);

    // Binary search for the right number of shares
    let low = 0;
    let high = 10000;
    let iterations = 0;
    const maxIterations = 50;

    while (iterations < maxIterations && high - low > 0.01) {
      const mid = (low + high) / 2;
      const testShares = [...currentShares];
      testShares[outcomeIndex] += mid;

      const testProbabilities = this.calculateProbabilities(testShares);
      const testProbability = testProbabilities[outcomeIndex];

      if (testProbability < targetProbability) {
        low = mid;
      } else {
        high = mid;
      }

      iterations++;
    }

    return (low + high) / 2;
  }

  /**
   * Add platform fee to odds
   *
   * @param odds - Array of fair odds
   * @param feeRate - Fee rate (e.g., 0.03 for 3%)
   * @returns Odds with fee included
   */
  addFee(odds: number[], feeRate: number = 0.03): number[] {
    const probabilities = odds.map(o => 1 / o);
    const totalProb = probabilities.reduce((a, b) => a + b, 0);

    // Adjust probabilities to include fee (create overround)
    const adjustedProbs = probabilities.map(
      p => p * (1 + feeRate) / totalProb
    );

    return adjustedProbs.map(p => 1 / p);
  }

  /**
   * Calculate market depth (how much betting needed to move odds by 10%)
   *
   * @param currentShares - Current shares
   * @param outcomeIndex - Outcome index
   * @returns Amount needed to move odds 10%
   */
  calculateMarketDepth(currentShares: number[], outcomeIndex: number): number {
    const currentOdds = this.calculateOdds(currentShares);
    const targetOdds = currentOdds[outcomeIndex] * 0.9; // 10% decrease

    const sharesNeeded = this.calculateSharesForTargetOdds(
      currentShares,
      outcomeIndex,
      targetOdds
    );

    return this.calculateCost(currentShares, outcomeIndex, sharesNeeded);
  }
}

/**
 * Utility function to format odds for display
 */
export function formatOdds(odds: number): string {
  return odds.toFixed(2);
}

/**
 * Utility function to format probability as percentage
 */
export function formatProbability(probability: number): string {
  return (probability * 100).toFixed(1) + '%';
}

/**
 * Calculate implied probability from decimal odds
 */
export function oddsToProbability(odds: number): number {
  return 1 / odds;
}

/**
 * Calculate potential payout
 */
export function calculatePayout(stake: number, odds: number): number {
  return stake * odds;
}

/**
 * Calculate potential profit
 */
export function calculateProfit(stake: number, odds: number): number {
  return stake * (odds - 1);
}

// Export singleton instance
export const oddsCalculator = new LMSROddsCalculator(100);
