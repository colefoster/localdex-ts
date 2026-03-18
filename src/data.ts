import { createRequire } from 'module';
import type { Pokemon, Move, Ability, Item, TypeData, Learnset } from './types.js';

const require = createRequire(import.meta.url);

let _pokedex: Record<string, Pokemon> | null = null;
let _moves: Record<string, Move> | null = null;
let _abilities: Record<string, Ability> | null = null;
let _items: Record<string, Item> | null = null;
let _typechart: Record<string, TypeData> | null = null;
let _learnsets: Record<string, Learnset> | null = null;

function load<T>(cached: T | null, file: string): T {
    if (cached) return cached;
    return require(`../data/${file}.json`) as T;
}

export function getPokedex(): Record<string, Pokemon> {
    _pokedex = load(_pokedex, 'pokedex');
    return _pokedex;
}

export function getMoves(): Record<string, Move> {
    _moves = load(_moves, 'moves');
    return _moves;
}

export function getAbilities(): Record<string, Ability> {
    _abilities = load(_abilities, 'abilities');
    return _abilities;
}

export function getItems(): Record<string, Item> {
    _items = load(_items, 'items');
    return _items;
}

export function getTypechart(): Record<string, TypeData> {
    _typechart = load(_typechart, 'typechart');
    return _typechart;
}

export function getLearnsets(): Record<string, Learnset> {
    _learnsets = load(_learnsets, 'learnsets');
    return _learnsets;
}
