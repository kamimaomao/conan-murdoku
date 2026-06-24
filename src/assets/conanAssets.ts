const assetRoot = `${import.meta.env.BASE_URL}conan-assets/`;

export const conanLogo = `${assetRoot}conan_logo.png`;

const objectAssets: Record<string, string> = {
  'answer-sheet': 'obj_answer_sheet.png',
  backpack: 'obj_backpack.png',
  'bento-box': 'obj_bento_box.png',
  book: 'obj_book.png',
  bottle: 'obj_bottle.png',
  bouquet: 'obj_bouquet.png',
  'broken-watch': 'obj_broken_watch.png',
  'camera-tripod': 'obj_camera_tripod.png',
  chair: 'obj_chair.png',
  'coffee-cup': 'obj_coffee_cup.png',
  'cooking-pot': 'obj_cooking_pot.png',
  envelope: 'obj_envelope.png',
  'evidence-cone': 'obj_evidence_cone.png',
  'film-reel': 'obj_film_reel.png',
  'first-aid-kit': 'obj_first_aid_kit.png',
  fountain: 'obj_fountain.png',
  'gift-box': 'obj_gift_box.png',
  glass: 'obj_glass.png',
  keycard: 'obj_keycard.png',
  laptop: 'obj_laptop.png',
  lifebuoy: 'obj_lifebuoy.png',
  microphone: 'obj_microphone.png',
  'mystery-note': 'obj_mystery_note.png',
  newspaper: 'obj_newspaper.png',
  'paint-can': 'obj_paint_can.png',
  'paper-crane': 'obj_paper_crane.png',
  phone: 'obj_phone.png',
  'photo-frame': 'obj_photo_frame.png',
  'recipe-card': 'obj_recipe_card.png',
  'school-bag': 'obj_school_bag.png',
  'security-camera': 'obj_security_camera.png',
  'snow-boot': 'obj_snow_boot.png',
  suitcase: 'obj_suitcase.png',
  teacup: 'obj_teacup.png',
  ticket: 'obj_ticket.png',
  'train-map': 'obj_train_map.png',
  umbrella: 'obj_umbrella.png'
};

export interface RoomVisual {
  className: string;
  textureAsset: string;
}

export interface PortraitSource {
  portraitKey: string;
}

function normalizeAssetName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function objectAssetFor(objectName: string | undefined): string | undefined {
  if (!objectName) return undefined;
  const asset = objectAssets[normalizeAssetName(objectName)];
  return asset ? `${assetRoot}${asset}` : undefined;
}

export function roomVisualFor(roomName: string | undefined): RoomVisual {
  const slug = roomName ? normalizeAssetName(roomName) : 'default';
  return {
    className: `room-${slug}`,
    textureAsset: `${assetRoot}textures/room_${slug}.png`
  };
}

export function suspectPortraitFor(suspect: PortraitSource | undefined): string | undefined {
  return suspect ? `${assetRoot}portraits/${suspect.portraitKey}.png` : undefined;
}
