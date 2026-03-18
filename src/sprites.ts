import { getPokedex } from './data.js';
import { toId } from './utils.js';

const BASE = 'https://play.pokemonshowdown.com/sprites';

/**
 * Convert a species name to the sprite slug PS uses.
 *
 * PS sprite filenames follow: basespecies-forme (one hyphen, forme stripped of non-alnum)
 *   "Charizard-Mega-X" → "charizard-megax"
 *   "Rotom-Wash" → "rotom-wash"
 *   "Mr. Mime" → "mrmime"
 *   "Urshifu-Rapid-Strike" → "urshifu-rapidstrike"
 *   "Darmanitan-Galar" → "darmanitan-galar"
 *
 * We look up the species in the dex to get baseSpecies + forme for accuracy.
 * Falls back to simple lowercasing for unknown species.
 */
export function toSpriteId(species: string): string {
    const dex = getPokedex();
    const id = toId(species);
    const entry = dex[id];

    if (entry && entry.baseSpecies) {
        const base = toId(entry.baseSpecies);
        const forme = entry.forme ? entry.forme.toLowerCase().replace(/[^a-z0-9]/g, '') : '';
        return forme ? `${base}-${forme}` : base;
    }

    if (entry) {
        return toId(entry.name);
    }

    // Fallback: strip non-alnum except first hyphen
    return species
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '')
        .replace(/--+/g, '-');
}

export type SpriteStyle = 'ani' | 'gen5' | 'home';

export interface SpriteOptions {
    /** Sprite style. 'ani' = animated gif, 'gen5' = static gen5 png, 'home' = home artwork png */
    style?: SpriteStyle;
    /** Show shiny variant */
    shiny?: boolean;
    /** Show back sprite (only for 'ani' and 'gen5') */
    back?: boolean;
    /** Female variant (only available for some pokemon with 'ani') */
    female?: boolean;
}

/**
 * Get the sprite URL for a Pokemon species.
 */
export function spriteUrl(species: string, options: SpriteOptions = {}): string {
    const { style = 'ani', shiny = false, back = false, female = false } = options;
    const id = toSpriteId(species);

    let folder = style as string;
    if (back && style !== 'home') folder += '-back';
    if (shiny) folder += '-shiny';
    if (female && style === 'ani') folder += '-f';

    const ext = style === 'ani' ? 'gif' : 'png';
    return `${BASE}/${folder}/${id}.${ext}`;
}

/**
 * Get the item sprite URL.
 */
export function itemSpriteUrl(item: string): string {
    const id = item.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `${BASE}/itemicons/${id}.png`;
}

/**
 * Get the type icon URL.
 */
export function typeIconUrl(type: string): string {
    return `${BASE}/types/${encodeURIComponent(type)}.png`;
}
