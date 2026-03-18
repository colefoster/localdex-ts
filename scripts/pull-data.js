/**
 * Pulls Pokemon data using @pkmn/dex (community extraction of PS data).
 * This avoids parsing PS TypeScript source files which contain inline
 * battle effect functions that can't be eval'd as data.
 *
 * We install @pkmn/dex as a dev dep, extract the data we need into
 * clean JSON, then bundle those JSON files with the package.
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'data');

async function main() {
    mkdirSync(DATA_DIR, { recursive: true });
    console.log('Extracting Pokemon data from @pkmn/dex...\n');

    const { Dex } = await import('@pkmn/dex');

    // --- Pokedex ---
    const pokedex = {};
    for (const species of Dex.species.all()) {
        pokedex[species.id] = {
            num: species.num, name: species.name, types: species.types,
            baseStats: species.baseStats, abilities: species.abilities,
            heightm: species.heightm, weightkg: species.weightkg,
            color: species.color, eggGroups: species.eggGroups,
            evos: species.evos, prevo: species.prevo || null,
            evoLevel: species.evoLevel || null, evoType: species.evoType || null,
            evoCondition: species.evoCondition || null, evoItem: species.evoItem || null,
            gender: species.gender || null, genderRatio: species.genderRatio,
            baseSpecies: species.baseSpecies !== species.name ? species.baseSpecies : null,
            forme: species.forme || null,
            otherFormes: species.otherFormes || null,
            cosmeticFormes: species.cosmeticFormes || null,
            gen: species.gen, tier: species.tier || null,
            isNonstandard: species.isNonstandard || null,
            tags: species.tags || [],
        };
    }
    writeJson('pokedex', pokedex);

    // --- Moves ---
    const moves = {};
    for (const move of Dex.moves.all()) {
        moves[move.id] = {
            num: move.num, name: move.name, type: move.type,
            category: move.category, basePower: move.basePower,
            accuracy: move.accuracy, pp: move.pp, priority: move.priority,
            target: move.target, flags: move.flags || {},
            critRatio: move.critRatio,
            secondary: move.secondary || null,
            drain: move.drain || null, recoil: move.recoil || null,
            heal: move.heal || null, multihit: move.multihit || null,
            breaksProtect: move.breaksProtect || false,
            isZ: move.isZ || null, isMax: move.isMax || null,
            zMove: move.zMove || null, maxMove: move.maxMove || null,
            gen: move.gen, isNonstandard: move.isNonstandard || null,
            desc: move.desc || null, shortDesc: move.shortDesc || null,
        };
    }
    writeJson('moves', moves);

    // --- Abilities ---
    const abilities = {};
    for (const ability of Dex.abilities.all()) {
        abilities[ability.id] = {
            num: ability.num, name: ability.name, rating: ability.rating,
            gen: ability.gen, isNonstandard: ability.isNonstandard || null,
            desc: ability.desc || null, shortDesc: ability.shortDesc || null,
        };
    }
    writeJson('abilities', abilities);

    // --- Items ---
    const items = {};
    for (const item of Dex.items.all()) {
        items[item.id] = {
            num: item.num, name: item.name, gen: item.gen,
            isNonstandard: item.isNonstandard || null,
            desc: item.desc || null, shortDesc: item.shortDesc || null,
            fling: item.fling || null, spritenum: item.spritenum || null,
            megaStone: item.megaStone || null, megaEvolves: item.megaEvolves || null,
            zMove: item.zMove || null, zMoveType: item.zMoveType || null,
            zMoveFrom: item.zMoveFrom || null, itemUser: item.itemUser || null,
            onPlate: item.onPlate || null, onDrive: item.onDrive || null,
            onMemory: item.onMemory || null, forcedForme: item.forcedForme || null,
            boosts: item.boosts || null, isPokeball: item.isPokeball || false,
            isBerry: item.isBerry || false, isGem: item.isGem || false,
            naturalGift: item.naturalGift || null,
        };
    }
    writeJson('items', items);

    // --- Type Chart ---
    // Store as attacking type → defending type → effectiveness multiplier
    const typechart = {};
    for (const type of Dex.types.all()) {
        const damageTaken = {};
        if (type.damageTaken) {
            for (const [otherType, value] of Object.entries(type.damageTaken)) {
                // PS format: 0=normal, 1=super effective against this type,
                // 2=resisted by this type, 3=immune
                damageTaken[otherType] = value;
            }
        }
        typechart[type.name] = { damageTaken };
    }
    writeJson('typechart', typechart);

    // --- Learnsets ---
    const learnsets = {};
    for (const species of Dex.species.all()) {
        if (species.isNonstandard && species.isNonstandard !== 'Past') continue;
        const ls = await Dex.learnsets.get(species.id);
        if (ls && ls.learnset) {
            learnsets[species.id] = ls.learnset;
        }
    }
    writeJson('learnsets', learnsets);

    console.log('Done!');
}

function writeJson(name, data) {
    const outPath = join(DATA_DIR, `${name}.json`);
    writeFileSync(outPath, JSON.stringify(data));
    console.log(`  ✓ ${name}.json — ${Object.keys(data).length} entries`);
}

main().catch(e => { console.error(e); process.exit(1); });
