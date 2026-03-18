import type { Pokemon, Move, Ability, Item, Learnset } from './types.js';
import { getPokedex, getMoves, getAbilities, getItems, getLearnsets } from './data.js';
import { toId } from './utils.js';

/**
 * Main Dex class — lookup Pokemon, moves, abilities, items by name or ID.
 */
export class Dex {
    // --- Pokemon ---

    static pokemon(name: string): Pokemon | null {
        return getPokedex()[toId(name)] ?? null;
    }

    static allPokemon(): Pokemon[] {
        return Object.values(getPokedex());
    }

    static searchPokemon(filter: {
        type?: string;
        gen?: number;
        tier?: string;
        minBst?: number;
        maxBst?: number;
    }): Pokemon[] {
        return this.allPokemon().filter(p => {
            if (filter.type && !p.types.includes(filter.type)) return false;
            if (filter.gen !== undefined && p.gen !== filter.gen) return false;
            if (filter.tier && p.tier !== filter.tier) return false;
            const bst = Object.values(p.baseStats).reduce((a, b) => a + b, 0);
            if (filter.minBst !== undefined && bst < filter.minBst) return false;
            if (filter.maxBst !== undefined && bst > filter.maxBst) return false;
            return true;
        });
    }

    // --- Moves ---

    static move(name: string): Move | null {
        return getMoves()[toId(name)] ?? null;
    }

    static allMoves(): Move[] {
        return Object.values(getMoves());
    }

    static movesOfType(type: string): Move[] {
        return this.allMoves().filter(m => m.type === type);
    }

    // --- Abilities ---

    static ability(name: string): Ability | null {
        return getAbilities()[toId(name)] ?? null;
    }

    static allAbilities(): Ability[] {
        return Object.values(getAbilities());
    }

    // --- Items ---

    static item(name: string): Item | null {
        return getItems()[toId(name)] ?? null;
    }

    static allItems(): Item[] {
        return Object.values(getItems());
    }

    // --- Learnsets ---

    static learnset(pokemonName: string): Learnset | null {
        return getLearnsets()[toId(pokemonName)] ?? null;
    }

    static canLearn(pokemonName: string, moveName: string): boolean {
        const ls = this.learnset(pokemonName);
        if (!ls) return false;
        return toId(moveName) in ls;
    }
}
