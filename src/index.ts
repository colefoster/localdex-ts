export { Dex } from './dex.js';
export { calculateStats, applyBoost } from './stats.js';
export {
    typeEffectiveness,
    getAllTypes,
    getDefensiveMatchup,
    getWeaknesses,
    getResistances,
    getImmunities,
} from './typechart.js';
export { toId, getNatureModifier, getAllNatures } from './utils.js';
export { spriteUrl, itemSpriteUrl, typeIconUrl, toSpriteId } from './sprites.js';
export type { SpriteOptions, SpriteStyle } from './sprites.js';
export type {
    Pokemon,
    Move,
    Ability,
    Item,
    BaseStats,
    TypeData,
    Learnset,
    CalculatedStats,
} from './types.js';
