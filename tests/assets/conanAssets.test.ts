import { describe, expect, it } from 'vitest';
import { readFileSync, statSync } from 'node:fs';
import { conanLogo, objectAssetFor, roomVisualFor, supportPortraitFor, suspectPortraitFor } from '../../src/assets/conanAssets';
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

  it('maps representative rooms to distinct Conan floor groups', () => {
    expect(roomVisualFor('agency-carpet').className).toBe('room-agency-carpet');
    expect(roomVisualFor('cafe-wood').className).toBe('room-cafe-wood');
    expect(roomVisualFor('agency-carpet').textureAsset).not.toBe(roomVisualFor('cafe-wood').textureAsset);
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

  it('keeps board object icons at 128px and under 20KB', () => {
    const objects = new Set(cases.flatMap((caseDef) => caseDef.cells.map((cell) => cell.object).filter(Boolean)));

    for (const object of objects) {
      const asset = objectAssetFor(object)!;

      expect(pngSize(asset), object).toEqual({ width: 128, height: 128 });
      expect(byteSize(asset), object).toBeLessThanOrEqual(20_000);
    }
  });

  it('keeps room textures compact and off the oversized AI-source path', () => {
    const rooms = new Set(cases.flatMap((caseDef) => caseDef.cells.map((cell) => cell.room).filter(Boolean)));

    for (const room of rooms) {
      const asset = roomVisualFor(room).textureAsset;

      expect(pngSize(asset), room).toEqual({ width: 256, height: 256 });
      expect(byteSize(asset), room).toBeLessThanOrEqual(20_000);
    }
  });

  it('keeps character portraits at 256px and under 512KB', () => {
    const portraits = cases.flatMap((caseDef) => [
      ...caseDef.suspects.map((suspect) => suspectPortraitFor(suspect)!),
      supportPortraitFor(caseDef.id)
    ]).filter((asset): asset is string => Boolean(asset));

    for (const asset of new Set(portraits)) {
      expect(pngSize(asset)).toEqual({ width: 256, height: 256 });
      expect(byteSize(asset)).toBeLessThanOrEqual(512_000);
    }
  });

  it('keeps the displayed logo compact', () => {
    const size = pngSize(conanLogo);

    expect(size.width).toBeLessThanOrEqual(512);
    expect(size.height).toBeLessThanOrEqual(256);
    expect(byteSize(conanLogo)).toBeLessThanOrEqual(512_000);
  });
});
