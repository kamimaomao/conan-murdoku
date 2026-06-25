import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { conanLogo, objectAssetFor, roomVisualFor, supportPortraitsFor, suspectPortraitFor } from '../../src/assets/conanAssets';
import { cases } from '../../src/data/cases';
import type { Suspect } from '../../src/game/types';

const publicPngAssets = import.meta.glob('/public/conan-assets/*.png', { eager: true, query: '?url', import: 'default' });
const publicTextureAssets = import.meta.glob('/public/conan-assets/textures/*.svg', { eager: true, query: '?url', import: 'default' });
const publicPortraitAssets = import.meta.glob('/public/conan-assets/portraits/*.png', { eager: true, query: '?url', import: 'default' });
const legacyAssetRoot = `${'murdoku'}-assets`;
const plannedObjectKeys = [
  'bed',
  'blackboard-eraser',
  'bookshelf',
  'bench',
  'camera',
  'cash-register',
  'champagne-tower',
  'chair',
  'coat-rack',
  'coffee-table',
  'coffee-cup',
  'coin-binoculars',
  'cooking-pot',
  'costume-rack',
  'counter-stool',
  'cutting-board',
  'deck-chair',
  'detective-badge',
  'dining-table',
  'director-chair',
  'filing-cabinet',
  'fireplace',
  'flower-arch',
  'flower-pot',
  'front-desk-bell',
  'gift-box',
  'glass',
  'keycard',
  'lectern',
  'lifebuoy',
  'light-stand',
  'locker',
  'luggage-rack',
  'mailbox',
  'map-stand',
  'menu-board',
  'microphone',
  'monitor-screen',
  'observation-rail',
  'office-desk',
  'oil-lantern',
  'parasol',
  'plate',
  'potted-plant',
  'prep-table',
  'prop-box',
  'refrigerator',
  'round-table',
  'script-paper',
  'school-bag',
  'school-desk',
  'skateboard',
  'snow-boot',
  'soccer-ball',
  'sofa',
  'streetlamp',
  'suitcase',
  'telephone',
  'ticket',
  'ticket-clip',
  'train-door',
  'train-seat',
  'trash-bin',
  'umbrella-stand',
  'vanity-mirror',
  'vending-machine',
  'voice-changer'
];

function publicAssetExists(assetUrl: string): boolean {
  return `/public${assetUrl}` in publicPngAssets;
}

function publicTextureExists(assetUrl: string): boolean {
  return `/public${assetUrl}` in publicTextureAssets;
}

function publicPortraitExists(assetUrl: string): boolean {
  return `/public${assetUrl}` in publicPortraitAssets;
}

function publicPath(assetUrl: string): string {
  return `public/${assetUrl.replace(/^\//, '')}`;
}

function pngSize(assetUrl: string): { width: number; height: number } {
  const buffer = readFileSync(publicPath(assetUrl));
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20)
  };
}

function svgViewBox(assetUrl: string): string | undefined {
  return readFileSync(publicPath(assetUrl), 'utf8').match(/\bviewBox="([^"]+)"/)?.[1];
}

function byteSize(assetUrl: string): number {
  return statSync(publicPath(assetUrl)).size;
}

describe('Conan Murdoku art assets', () => {
  it('maps every case object to an existing cell icon', () => {
    const objects = new Set(cases.flatMap((caseDef) => caseDef.cells.map((cell) => cell.object).filter(Boolean)));

    for (const object of objects) {
      const asset = objectAssetFor(object);
      expect(asset, object).toBeDefined();
      expect(publicAssetExists(asset!), object).toBe(true);
    }
  });

  it('maps every planned shared object to an existing independent icon', () => {
    for (const object of plannedObjectKeys) {
      const asset = objectAssetFor(object);

      expect(asset, object).toBeDefined();
      expect(publicAssetExists(asset!), object).toBe(true);
    }
  });

  it('maps representative rooms to distinct Conan floor groups', () => {
    expect(roomVisualFor('agency-carpet').className).toBe('room-agency-carpet');
    expect(roomVisualFor('cafe-wood').className).toBe('room-cafe-wood');
    expect(roomVisualFor('agency-carpet').textureAsset).not.toBe(roomVisualFor('cafe-wood').textureAsset);
  });

  it('maps every case room to an existing terrain texture', () => {
    const rooms = new Set(cases.flatMap((caseDef) => caseDef.cells.map((cell) => cell.room).filter(Boolean)));
    const textureAssets = new Set<string>();

    for (const room of rooms) {
      const visual = roomVisualFor(room);
      expect(visual.textureAsset, room).toBeDefined();
      expect(publicTextureExists(visual.textureAsset), room).toBe(true);
      textureAssets.add(visual.textureAsset);
    }

    expect(textureAssets.size).toBeGreaterThanOrEqual(12);
  });

  it('maps every suspect to an existing portrait image', () => {
    const suspects = cases.flatMap((caseDef) => caseDef.suspects) as Suspect[];

    for (const suspect of suspects) {
      const portrait = suspectPortraitFor(suspect);
      expect(portrait, suspect.name).toBeDefined();
      expect(publicPortraitExists(portrait!), suspect.name).toBe(true);
    }
  });

  it('maps the Detective Boys support portraits for the school case', () => {
    expect(supportPortraitsFor('case-03')).toEqual([
      '/conan-assets/support/ai-haibara.png',
      '/conan-assets/support/yoshida-ayumi.png',
      '/conan-assets/support/tsuburaya-mitsuhiko.png',
      '/conan-assets/support/kojima-genta.png'
    ]);
  });

  it('does not produce any legacy asset URLs', () => {
    for (const caseDef of cases) {
      for (const cell of caseDef.cells) {
        expect(objectAssetFor(cell.object) ?? '').not.toContain(legacyAssetRoot);
        expect(roomVisualFor(cell.room).textureAsset).not.toContain(legacyAssetRoot);
      }
      for (const suspect of caseDef.suspects) {
        expect(suspectPortraitFor(suspect) ?? '').not.toContain(legacyAssetRoot);
      }
    }
  });

  it('only produces expected image URL formats', () => {
    for (const caseDef of cases) {
      for (const cell of caseDef.cells) {
        const objectAsset = objectAssetFor(cell.object);
        if (objectAsset) expect(objectAsset).toMatch(/\.png$/);
        expect(roomVisualFor(cell.room).textureAsset).toMatch(/\.svg$/);
      }
      for (const suspect of caseDef.suspects) {
        expect(suspectPortraitFor(suspect)).toMatch(/\.png$/);
      }
    }
  });

  it('keeps board object icons compact enough for mobile loading', () => {
    for (const object of plannedObjectKeys) {
      const asset = objectAssetFor(object)!;
      const size = pngSize(asset);

      expect(size.width, object).toBeLessThanOrEqual(192);
      expect(size.height, object).toBeLessThanOrEqual(192);
      expect(byteSize(asset), object).toBeLessThanOrEqual(120_000);
    }
  });

  it('keeps room textures compact and off the oversized AI-source path', () => {
    const rooms = new Set(cases.flatMap((caseDef) => caseDef.cells.map((cell) => cell.room).filter(Boolean)));

    for (const room of rooms) {
      const asset = roomVisualFor(room).textureAsset;

      expect(svgViewBox(asset), room).toBe('0 0 64 64');
      expect(byteSize(asset), room).toBeLessThanOrEqual(20_000);
    }
  });

  it('keeps character portraits at their intended asset tier and under 512KB', () => {
    const portraits = cases.flatMap((caseDef) => [
      ...caseDef.suspects.map((suspect) => suspectPortraitFor(suspect)!),
      ...supportPortraitsFor(caseDef.id)
    ]);

    for (const asset of new Set(portraits)) {
      const legacyTier = asset.includes('/portraits/case-01-');
      const expectedSize = legacyTier ? 256 : 512;

      expect(pngSize(asset), asset).toEqual({ width: expectedSize, height: expectedSize });
      expect(byteSize(asset)).toBeLessThanOrEqual(512_000);
    }
  });

  it('keeps reusable cast portraits paired with support portraits', () => {
    const supportKeys = readdirSync('public/conan-assets/support')
      .filter((file) => file.endsWith('.png'))
      .map((file) => file.replace(/\.png$/, ''))
      .sort();
    const castKeys = readdirSync('public/conan-assets/portraits')
      .filter((file) => file.startsWith('cast-') && file.endsWith('.png'))
      .map((file) => file.replace(/^cast-/, '').replace(/\.png$/, ''))
      .sort();

    expect(castKeys).toEqual(supportKeys);

    for (const key of supportKeys) {
      expect(pngSize(`/conan-assets/support/${key}.png`), key).toEqual({ width: 512, height: 512 });
      expect(pngSize(`/conan-assets/portraits/cast-${key}.png`), key).toEqual({ width: 512, height: 512 });
      expect(byteSize(`/conan-assets/support/${key}.png`), key).toBeLessThanOrEqual(512_000);
      expect(byteSize(`/conan-assets/portraits/cast-${key}.png`), key).toBeLessThanOrEqual(512_000);
    }
  });

  it('keeps the displayed logo compact', () => {
    const size = pngSize(conanLogo);

    expect(size.width).toBeLessThanOrEqual(512);
    expect(size.height).toBeLessThanOrEqual(256);
    expect(byteSize(conanLogo)).toBeLessThanOrEqual(512_000);
  });
});
