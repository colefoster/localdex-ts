import type { Pokemon, Move, Ability, Item, TypeData, Learnset } from './types.js';

import pokedex from '../data/pokedex.json' with { type: 'json' };
import movesData from '../data/moves.json' with { type: 'json' };
import abilitiesData from '../data/abilities.json' with { type: 'json' };
import itemsData from '../data/items.json' with { type: 'json' };
import typechartData from '../data/typechart.json' with { type: 'json' };

// Learnsets are large (2.8MB) — lazy-loaded to avoid bloating bundles
let _learnsets: Record<string, Learnset> | null = null;

export function getPokedex(): Record<string, Pokemon> {
    return pokedex as unknown as Record<string, Pokemon>;
}

export function getMoves(): Record<string, Move> {
    return movesData as unknown as Record<string, Move>;
}

export function getAbilities(): Record<string, Ability> {
    return abilitiesData as unknown as Record<string, Ability>;
}

export function getItems(): Record<string, Item> {
    return itemsData as unknown as Record<string, Item>;
}

export function getTypechart(): Record<string, TypeData> {
    return typechartData as unknown as Record<string, TypeData>;
}

export function getLearnsets(): Record<string, Learnset> {
    if (!_learnsets) {
        // Synchronous fallback — in Node.js this works via require shim,
        // in browser bundles, call preloadLearnsets() first
        try {
            // Dynamic require for Node.js environments
            const { createRequire } = require('module');
            const req = createRequire(import.meta.url);
            _learnsets = req('../data/learnsets.json') as Record<string, Learnset>;
        } catch {
            _learnsets = {};
        }
    }
    return _learnsets;
}

export async function preloadLearnsets(): Promise<Record<string, Learnset>> {
    if (_learnsets) return _learnsets;
    try {
        const mod = await import('../data/learnsets.json', { with: { type: 'json' } });
        _learnsets = mod.default as unknown as Record<string, Learnset>;
    } catch {
        _learnsets = {};
    }
    return _learnsets;
}
