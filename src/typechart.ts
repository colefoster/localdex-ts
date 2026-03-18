import { getTypechart } from './data.js';

/**
 * PS damageTaken values:
 * 0 = normal (1x)
 * 1 = super effective (2x) — this type takes 2x from the attacking type
 * 2 = resisted (0.5x) — this type takes 0.5x from the attacking type
 * 3 = immune (0x) — this type takes 0x from the attacking type
 */
const DAMAGE_MULTIPLIERS: Record<number, number> = {
    0: 1,
    1: 2,
    2: 0.5,
    3: 0,
};

/**
 * Get type effectiveness of an attacking type against one or more defending types.
 * Returns the combined multiplier (e.g., 4 for double super effective).
 */
export function typeEffectiveness(attackingType: string, defendingTypes: string[]): number {
    const chart = getTypechart();
    let multiplier = 1;

    for (const defType of defendingTypes) {
        const typeData = chart[defType];
        if (!typeData) continue;
        const value = typeData.damageTaken[attackingType];
        if (value !== undefined) {
            multiplier *= DAMAGE_MULTIPLIERS[value] ?? 1;
        }
    }

    return multiplier;
}

/**
 * Get all types.
 */
export function getAllTypes(): string[] {
    return Object.keys(getTypechart());
}

/**
 * Get full type matchup for a defending type combination.
 * Returns a record of attacking type → multiplier.
 */
export function getDefensiveMatchup(defendingTypes: string[]): Record<string, number> {
    const result: Record<string, number> = {};
    for (const type of getAllTypes()) {
        result[type] = typeEffectiveness(type, defendingTypes);
    }
    return result;
}

/**
 * Get weaknesses (types that deal > 1x damage).
 */
export function getWeaknesses(defendingTypes: string[]): string[] {
    const matchup = getDefensiveMatchup(defendingTypes);
    return Object.entries(matchup).filter(([, v]) => v > 1).map(([k]) => k);
}

/**
 * Get resistances (types that deal < 1x damage, excluding immunities).
 */
export function getResistances(defendingTypes: string[]): string[] {
    const matchup = getDefensiveMatchup(defendingTypes);
    return Object.entries(matchup).filter(([, v]) => v > 0 && v < 1).map(([k]) => k);
}

/**
 * Get immunities (types that deal 0x damage).
 */
export function getImmunities(defendingTypes: string[]): string[] {
    const matchup = getDefensiveMatchup(defendingTypes);
    return Object.entries(matchup).filter(([, v]) => v === 0).map(([k]) => k);
}
