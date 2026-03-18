import type { BaseStats, CalculatedStats } from './types.js';
import { getNatureModifier } from './utils.js';

/**
 * Calculate a Pokemon's actual stats at a given level with EVs, IVs, and nature.
 */
export function calculateStats(
    baseStats: BaseStats,
    level: number = 100,
    evs: Partial<BaseStats> = {},
    ivs: Partial<BaseStats> = {},
    nature: string = 'Serious',
): CalculatedStats {
    const stats = {} as CalculatedStats;

    for (const stat of ['hp', 'atk', 'def', 'spa', 'spd', 'spe'] as const) {
        const base = baseStats[stat];
        const ev = evs[stat] ?? 0;
        const iv = ivs[stat] ?? 31;

        if (stat === 'hp') {
            // Shedinja always has 1 HP
            if (base === 1) {
                stats.hp = 1;
            } else {
                stats.hp = Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + level + 10;
            }
        } else {
            const natureMod = getNatureModifier(nature, stat);
            stats[stat] = Math.floor(
                (Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + 5) * natureMod
            );
        }
    }

    return stats;
}

/**
 * Calculate stat at a specific boost level (-6 to +6).
 */
export function applyBoost(stat: number, boost: number): number {
    if (boost > 0) return Math.floor(stat * (2 + boost) / 2);
    if (boost < 0) return Math.floor(stat * 2 / (2 - boost));
    return stat;
}
