import type { Pokemon, Move, Ability, Item, TypeData, Learnset } from './types.js';

import pokedex from '../data/pokedex.json' with { type: 'json' };
import movesData from '../data/moves.json' with { type: 'json' };
import abilitiesData from '../data/abilities.json' with { type: 'json' };
import itemsData from '../data/items.json' with { type: 'json' };
import typechartData from '../data/typechart.json' with { type: 'json' };
import learnsetsData from '../data/learnsets.json' with { type: 'json' };

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
    return learnsetsData as unknown as Record<string, Learnset>;
}
