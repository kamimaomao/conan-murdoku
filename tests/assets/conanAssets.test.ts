import { describe, expect, it } from 'vitest';
import { objectAssetFor, roomVisualFor, suspectPortraitFor } from '../../src/assets/conanAssets';
import { cases } from '../../src/data/cases';
import type { Suspect } from '../../src/game/types';

const publicPngAssets = import.meta.glob('/public/conan-assets/*.png', { eager: true, query: '?url', import: 'default' });
const publicTextureAssets = import.meta.glob('/public/conan-assets/textures/*.png', { eager: true, query: '?url', import: 'default' });
const publicPortraitAssets = import.meta.glob('/public/conan-assets/portraits/*.png', { eager: true, query: '?url', import: 'default' });
const legacyAssetRoot = `${'murdoku'}-assets`;

function publicAssetExists(assetUrl: string): boolean {
  return `/public${assetUrl}` in publicPngAssets;
}

function publicTextureExists(assetUrl: string): boolean {
  return `/public${assetUrl}` in publicTextureAssets;
}

function publicPortraitExists(assetUrl: string): boolean {
  return `/public${assetUrl}` in publicPortraitAssets;
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

  it('maps representative rooms to distinct Conan floor groups', () => {
    expect(roomVisualFor('agency-office').className).toBe('room-agency-office');
    expect(roomVisualFor('cafe-counter').className).toBe('room-cafe-counter');
    expect(roomVisualFor('agency-office').textureAsset).not.toBe(roomVisualFor('cafe-counter').textureAsset);
  });

  it('maps every case room to its own existing terrain texture', () => {
    const rooms = new Set(cases.flatMap((caseDef) => caseDef.cells.map((cell) => cell.room).filter(Boolean)));
    const textureAssets = new Set<string>();

    for (const room of rooms) {
      const visual = roomVisualFor(room);
      expect(visual.textureAsset, room).toBeDefined();
      expect(publicTextureExists(visual.textureAsset), room).toBe(true);
      textureAssets.add(visual.textureAsset);
    }

    expect(textureAssets.size).toBe(rooms.size);
  });

  it('maps every suspect to an existing portrait image', () => {
    const suspects = cases.flatMap((caseDef) => caseDef.suspects) as Suspect[];

    for (const suspect of suspects) {
      const portrait = suspectPortraitFor(suspect);
      expect(portrait, suspect.name).toBeDefined();
      expect(publicPortraitExists(portrait!), suspect.name).toBe(true);
    }
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

  it('only produces PNG image URLs', () => {
    for (const caseDef of cases) {
      for (const cell of caseDef.cells) {
        const objectAsset = objectAssetFor(cell.object);
        if (objectAsset) expect(objectAsset).toMatch(/\.png$/);
        expect(roomVisualFor(cell.room).textureAsset).toMatch(/\.png$/);
      }
      for (const suspect of caseDef.suspects) {
        expect(suspectPortraitFor(suspect)).toMatch(/\.png$/);
      }
    }
  });
});
