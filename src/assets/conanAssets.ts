const assetRoot = `${import.meta.env.BASE_URL}conan-assets/`;

export const conanLogo = `${assetRoot}conan_logo.png`;
export const conanHeaderBanner = `${assetRoot}conan-header-banner.png`;

const objectAssets: Record<string, string> = {
  'blackboard-eraser': 'obj_blackboard_eraser.png',
  bed: 'obj_bed.png',
  bear: 'obj_shrub.svg',
  barrel: 'obj_box.svg',
  bookshelf: 'obj_bookshelf.png',
  boulder: 'obj_boulder.svg',
  bench: 'obj_bench.png',
  bonsai: 'obj_potted_plant.png',
  box: 'obj_box.svg',
  camera: 'obj_camera.png',
  car: 'obj_car.svg',
  'cash-register': 'obj_cash_register.png',
  carpet: 'obj_carpet.svg',
  cactus: 'obj_cactus.svg',
  'champagne-tower': 'obj_champagne_tower.png',
  chair: 'obj_chair.png',
  'coat-rack': 'obj_coat_rack.png',
  'coffee-table': 'obj_coffee_table.png',
  'coffee-cup': 'obj_coffee_cup.png',
  'coin-binoculars': 'obj_coin_binoculars.png',
  'cooking-pot': 'obj_cooking_pot.png',
  'costume-rack': 'obj_costume_rack.png',
  'counter-stool': 'obj_counter_stool.png',
  'cutting-board': 'obj_cutting_board.png',
  'deck-chair': 'obj_deck_chair.png',
  'detective-badge': 'obj_detective_badge.png',
  door: 'obj_train_door.png',
  'dining-table': 'obj_dining_table.png',
  'director-chair': 'obj_director_chair.png',
  'filing-cabinet': 'obj_filing_cabinet.png',
  fireplace: 'obj_fireplace.png',
  'flower-arch': 'obj_flower_arch.png',
  'flower-pot': 'obj_flower_pot.png',
  'front-desk-bell': 'obj_front_desk_bell.png',
  'gift-box': 'obj_gift_box.png',
  glass: 'obj_glass.png',
  keycard: 'obj_keycard.png',
  lectern: 'obj_lectern.png',
  lifebuoy: 'obj_lifebuoy.png',
  'light-stand': 'obj_light_stand.png',
  locker: 'obj_locker.png',
  'luggage-rack': 'obj_luggage_rack.png',
  mailbox: 'obj_mailbox.png',
  'map-stand': 'obj_map_stand.png',
  'menu-board': 'obj_menu_board.png',
  microphone: 'obj_microphone.png',
  'monitor-screen': 'obj_monitor_screen.png',
  'observation-rail': 'obj_observation_rail.png',
  'office-desk': 'obj_office_desk.png',
  'oil-lantern': 'obj_oil_lantern.png',
  'oil-slick': 'obj_oil_slick.svg',
  parasol: 'obj_parasol.png',
  'paint-spill': 'obj_paint_spill.svg',
  plate: 'obj_plate.png',
  plant: 'obj_potted_plant.png',
  'potted-plant': 'obj_potted_plant.png',
  puddle: 'obj_puddle.svg',
  'prep-table': 'obj_prep_table.png',
  'prop-box': 'obj_prop_box.png',
  refrigerator: 'obj_refrigerator.png',
  register: 'obj_cash_register.png',
  'round-table': 'obj_round_table.png',
  shelf: 'obj_bookshelf.png',
  shrub: 'obj_shrub.svg',
  'script-paper': 'obj_script_paper.png',
  'school-bag': 'obj_school_bag.png',
  'school-desk': 'obj_school_desk.png',
  skateboard: 'obj_skateboard.png',
  'snow-boot': 'obj_snow_boot.png',
  'soccer-ball': 'obj_soccer_ball.png',
  sofa: 'obj_sofa.png',
  streetlamp: 'obj_streetlamp.png',
  suitcase: 'obj_suitcase.png',
  telephone: 'obj_telephone.png',
  'teddy-bear': 'obj_box.svg',
  table: 'obj_dining_table.png',
  ticket: 'obj_ticket.png',
  'ticket-clip': 'obj_ticket_clip.png',
  'train-door': 'obj_train_door.png',
  'train-seat': 'obj_train_seat.png',
  'trash-bin': 'obj_trash_bin.png',
  trashcan: 'obj_trash_bin.png',
  'umbrella-stand': 'obj_umbrella_stand.png',
  'vanity-mirror': 'obj_vanity_mirror.png',
  'vending-machine': 'obj_vending_machine.png',
  'voice-changer': 'obj_voice_changer.png',
  horse: 'obj_horse.svg',
  flag: 'obj_ticket.png',
  flowers: 'obj_shrub.svg',
  path: 'obj_carpet.svg',
  rubble: 'obj_boulder.svg',
  sand: 'obj_carpet.svg',
  statue: 'obj_boulder.svg',
  tree: 'obj_shrub.svg',
  tv: 'obj_monitor_screen.png'
};

const roomTextureAssets: Record<string, string> = {
  'agasa-kitchen': 'kitchen-tile',
  'agasa-lab': 'agency-carpet',
  'agasa-living': 'lodge-wood',
  'agasa-yard': 'snow-path',
  'agency-entry': 'arcade-tile',
  'agency-living': 'hotel-carpet',
  'agency-office': 'agency-carpet',
  'agency-window': 'cafe-wood',
  'beach-beach': 'beach-deck',
  'beach-changing-room': 'hotel-stone',
  'beach-sea': 'bridge-metal',
  'beach-tower': 'beach-deck',
  'barber-entrance': 'agency-carpet',
  'barber-main-area': 'hotel-carpet',
  'barber-staff-room': 'kitchen-tile',
  'barber-storage': 'kitchen-tile',
  'barber-waiting-area': 'train-carpet',
  'book-discussion': 'cafe-wood',
  'book-library': 'lodge-wood',
  'book-refreshments': 'wedding-carpet',
  'cabin-cabin': 'lodge-wood',
  'cabin-forest-east': 'snow-path',
  'cabin-forest-west': 'snow-path',
  'cabin-lake': 'bridge-metal',
  'cabin-shed': 'hotel-stone',
  'crossing-cliffs': 'hotel-stone',
  'crossing-fort': 'train-carpet',
  'crossing-hunting-cabin': 'lodge-wood',
  'crossing-river': 'bridge-metal',
  'crossing-woods': 'snow-path',
  'delivery-bedroom': 'lodge-wood',
  'delivery-dining': 'cafe-wood',
  'delivery-front-yard': 'snow-path',
  'delivery-kitchen': 'kitchen-tile',
  'delivery-porch': 'beach-deck',
  'flower-counter': 'agency-carpet',
  'flower-preparation': 'kitchen-tile',
  'flower-storage': 'lodge-wood',
  'flower-store-floor': 'cafe-wood',
  'horse-canyon': 'hotel-stone',
  'horse-desert': 'snow-path',
  'horse-shack': 'lodge-wood',
  'kiosk-1': 'arcade-tile',
  'kiosk-2': 'cafe-wood',
  'kiosk-library': 'lodge-wood',
  'kiosk-walkway': 'hotel-stone',
  'netflix-bedroom': 'hotel-carpet',
  'netflix-hall': 'agency-carpet',
  'netflix-kitchen': 'kitchen-tile',
  'netflix-living': 'lodge-wood',
  'paint-gallery': 'hotel-carpet',
  'paint-kitchen': 'kitchen-tile',
  'paint-storage': 'lodge-wood',
  'paint-studio': 'backstage-rubber',
  'car-garage': 'bridge-metal',
  'car-lot': 'hotel-stone',
  'car-office': 'agency-carpet',
  'car-waiting': 'hotel-carpet',
  'kitchen-dining': 'cafe-wood',
  'kitchen-kitchen': 'kitchen-tile',
  'kitchen-reception': 'backstage-rubber',
  'kitchen-restroom': 'hotel-stone',
  'museum-exit': 'bridge-metal',
  'museum-gallery': 'hotel-carpet',
  'museum-stage': 'wedding-carpet',
  'museum-vault': 'hotel-stone',
  'osaka-entry': 'hotel-stone',
  'osaka-kitchen': 'kitchen-tile',
  'osaka-room': 'lodge-wood',
  'osaka-street': 'snow-path',
  'polo-counter': 'cafe-wood',
  'polo-entry': 'arcade-tile',
  'polo-kitchen': 'kitchen-tile',
  'polo-seats': 'wedding-carpet',
  'party-dining': 'cafe-wood',
  'party-hall': 'hotel-carpet',
  'party-kitchen': 'kitchen-tile',
  'party-living': 'lodge-wood',
  'riding-pasture': 'snow-path',
  'riding-stable': 'lodge-wood',
  'riding-tool-shed': 'bridge-metal',
  'riding-training-ring': 'snow-path',
  'school-classroom': 'school-wood',
  'school-hall': 'agency-carpet',
  'school-library': 'lodge-wood',
  'school-yard': 'snow-path',
  'wedding-altar': 'wedding-carpet',
  'wedding-chapel': 'hotel-stone',
  'wedding-east-court': 'snow-path',
  'wedding-porch': 'hotel-carpet',
  'wedding-west-court': 'snow-path'
};

export interface RoomVisual {
  className: string;
  textureAsset: string;
}

export interface PortraitSource {
  portraitKey: string;
}

const supportPortraitAssets: Record<string, string[]> = {
  'case-01': ['support/agasa-professor.png'],
  'case-02': ['support/mouri-ran.png'],
  'case-03': [
    'support/ai-haibara.png',
    'support/yoshida-ayumi.png',
    'support/tsuburaya-mitsuhiko.png',
    'support/kojima-genta.png'
  ],
  'case-04': ['support/amuro-cafe-detective.png'],
  'case-05': ['support/megure-inspector.png'],
  'case-06': ['support/sonoko-suzuki.png'],
  'case-07': ['support/ai-haibara.png'],
  'case-08': ['support/mouri-ran.png'],
  'case-09': ['support/agasa-professor.png'],
  'case-10': ['support/edogawa-conan.png']
};

function normalizeAssetName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const fallbackRoomTextures = [
  'hotel-carpet',
  'agency-carpet',
  'lodge-wood',
  'kitchen-tile',
  'hotel-stone',
  'train-carpet',
  'bridge-metal',
  'snow-path',
  'cafe-wood',
  'arcade-tile',
  'wedding-carpet',
  'backstage-rubber'
];

function fallbackRoomTexture(slug: string): string {
  let hash = 0;
  for (const char of slug) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return fallbackRoomTextures[hash % fallbackRoomTextures.length];
}

export function objectAssetFor(objectName: string | undefined): string | undefined {
  if (!objectName) return undefined;
  const asset = objectAssets[normalizeAssetName(objectName)];
  return asset ? `${assetRoot}${asset}` : undefined;
}

export function roomVisualFor(roomName: string | undefined): RoomVisual {
  const slug = roomName ? normalizeAssetName(roomName) : 'default';
  const textureSlug = roomTextureAssets[slug] ?? fallbackRoomTexture(slug);
  return {
    className: `room-${slug}`,
    textureAsset: `${assetRoot}textures/room_${textureSlug}.svg`
  };
}

export function suspectPortraitFor(suspect: PortraitSource | undefined): string | undefined {
  return suspect ? `${assetRoot}portraits/${suspect.portraitKey}.png` : undefined;
}

export function supportPortraitFor(caseId: string): string | undefined {
  return supportPortraitsFor(caseId)[0];
}

export function supportPortraitsFor(caseId: string): string[] {
  return (supportPortraitAssets[caseId] ?? []).map((asset) => `${assetRoot}${asset}`);
}
