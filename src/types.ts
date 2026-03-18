export interface BaseStats {
    hp: number;
    atk: number;
    def: number;
    spa: number;
    spd: number;
    spe: number;
}

export interface Pokemon {
    num: number;
    name: string;
    types: string[];
    baseStats: BaseStats;
    abilities: Record<string, string>;
    heightm: number;
    weightkg: number;
    color: string | null;
    eggGroups: string[];
    evos: string[];
    prevo: string | null;
    evoLevel: number | null;
    evoType: string | null;
    evoCondition: string | null;
    evoItem: string | null;
    gender: string | null;
    genderRatio: { M: number; F: number } | null;
    baseSpecies: string | null;
    forme: string | null;
    otherFormes: string[] | null;
    cosmeticFormes: string[] | null;
    gen: number;
    tier: string | null;
    isNonstandard: string | null;
    tags: string[];
}

export interface Move {
    num: number;
    name: string;
    type: string;
    category: 'Physical' | 'Special' | 'Status';
    basePower: number;
    accuracy: number | true;
    pp: number;
    priority: number;
    target: string;
    flags: Record<string, number>;
    critRatio: number;
    secondary: { chance?: number; boosts?: Partial<BaseStats>; status?: string; volatileStatus?: string } | null;
    drain: [number, number] | null;
    recoil: [number, number] | null;
    heal: [number, number] | null;
    multihit: number | number[] | null;
    breaksProtect: boolean;
    isZ: string | null;
    isMax: string | boolean | null;
    zMove: { basePower?: number; effect?: string; boost?: Partial<BaseStats> } | null;
    maxMove: { basePower: number } | null;
    gen: number;
    isNonstandard: string | null;
    desc: string | null;
    shortDesc: string | null;
}

export interface Ability {
    num: number;
    name: string;
    rating: number;
    gen: number;
    isNonstandard: string | null;
    desc: string | null;
    shortDesc: string | null;
}

export interface Item {
    num: number;
    name: string;
    gen: number;
    isNonstandard: string | null;
    desc: string | null;
    shortDesc: string | null;
    fling: { basePower?: number; status?: string; volatileStatus?: string } | null;
    spritenum: number | null;
    megaStone: string | null;
    megaEvolves: string | null;
    zMove: string | boolean | null;
    zMoveType: string | null;
    zMoveFrom: string | null;
    itemUser: string[] | null;
    onPlate: string | null;
    onDrive: string | null;
    onMemory: string | null;
    forcedForme: string | null;
    boosts: Partial<BaseStats> | null;
    isPokeball: boolean;
    isBerry: boolean;
    isGem: boolean;
    naturalGift: { basePower: number; type: string } | null;
}

export interface TypeData {
    damageTaken: Record<string, number>;
}

export type Learnset = Record<string, string[]>;

export interface CalculatedStats {
    hp: number;
    atk: number;
    def: number;
    spa: number;
    spd: number;
    spe: number;
}
