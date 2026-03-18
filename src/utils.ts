/**
 * Normalize a name to a PS-style ID: lowercase, alphanumeric only.
 */
export function toId(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Nature stat modifiers. Each nature boosts one stat by 10% and
 * lowers another by 10%. Neutral natures have no effect.
 */
const NATURES: Record<string, { plus?: keyof Stats; minus?: keyof Stats }> = {
    adamant: { plus: 'atk', minus: 'spa' },
    bold: { plus: 'def', minus: 'atk' },
    brave: { plus: 'atk', minus: 'spe' },
    calm: { plus: 'spd', minus: 'atk' },
    careful: { plus: 'spd', minus: 'spa' },
    gentle: { plus: 'spd', minus: 'def' },
    hasty: { plus: 'spe', minus: 'def' },
    impish: { plus: 'def', minus: 'spa' },
    jolly: { plus: 'spe', minus: 'spa' },
    lax: { plus: 'def', minus: 'spd' },
    lonely: { plus: 'atk', minus: 'def' },
    mild: { plus: 'spa', minus: 'def' },
    modest: { plus: 'spa', minus: 'atk' },
    naive: { plus: 'spe', minus: 'spd' },
    naughty: { plus: 'atk', minus: 'spd' },
    quiet: { plus: 'spa', minus: 'spe' },
    rash: { plus: 'spa', minus: 'spd' },
    relaxed: { plus: 'def', minus: 'spe' },
    sassy: { plus: 'spd', minus: 'spe' },
    timid: { plus: 'spe', minus: 'atk' },
    // Neutral natures
    bashful: {}, docile: {}, hardy: {}, quirky: {}, serious: {},
};

type Stats = { atk: number; def: number; spa: number; spd: number; spe: number };

export function getNatureModifier(nature: string, stat: string): number {
    const n = NATURES[toId(nature)];
    if (!n) return 1;
    if (n.plus === stat) return 1.1;
    if (n.minus === stat) return 0.9;
    return 1;
}

export function getAllNatures(): string[] {
    return Object.keys(NATURES);
}
