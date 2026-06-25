import type { CaseDefinition, CaseScene, Difficulty, GridSize } from '../../game/types';
import { buildConanCase, type ConanCaseConfig, type ConanSuspectConfig } from './conanCaseBuilder';

const roomRow = (rooms: string[]): string => rooms.join(' ');

interface CastMember {
  key: string;
  name: string;
  accent: string;
  portraitKey: string;
  gender: 'female' | 'male';
}

interface SourceCaseSpec {
  id: string;
  title: string;
  original: string;
  difficulty: Difficulty;
  size: GridSize;
  keyItems: string[];
  roomLabels: string[];
  clueTexts: string[];
  generalClues?: string[];
  cast?: string[];
}

const castMembers: Record<string, CastMember> = {
  conan: { key: 'conan', name: '江户川柯南', accent: '#2d7dd2', portraitKey: 'cast-edogawa-conan', gender: 'male' },
  ran: { key: 'ran', name: '毛利兰', accent: '#ef476f', portraitKey: 'cast-mouri-ran', gender: 'female' },
  ayumi: { key: 'ayumi', name: '吉田步美', accent: '#ffb703', portraitKey: 'cast-yoshida-ayumi', gender: 'female' },
  mitsuhiko: { key: 'mitsuhiko', name: '圆谷光彦', accent: '#06d6a0', portraitKey: 'cast-tsuburaya-mitsuhiko', gender: 'male' },
  kogoro: { key: 'kogoro', name: '毛利小五郎', accent: '#8d5524', portraitKey: 'cast-mouri-kogoro', gender: 'male' },
  agasa: { key: 'agasa', name: '阿笠博士', accent: '#80ed99', portraitKey: 'cast-agasa-professor', gender: 'male' },
  genta: { key: 'genta', name: '小岛元太', accent: '#8bd450', portraitKey: 'cast-kojima-genta', gender: 'male' },
  ai: { key: 'ai', name: '灰原哀', accent: '#9b5de5', portraitKey: 'cast-ai-haibara', gender: 'female' },
  heiji: { key: 'heiji', name: '服部平次', accent: '#2a9d8f', portraitKey: 'cast-heiji-hattori', gender: 'male' },
  kazuha: { key: 'kazuha', name: '远山和叶', accent: '#ffb703', portraitKey: 'cast-kazuha-toyama', gender: 'female' },
  sonoko: { key: 'sonoko', name: '铃木园子', accent: '#f72585', portraitKey: 'cast-sonoko-suzuki', gender: 'female' },
  amuro: { key: 'amuro', name: '安室透', accent: '#f4a261', portraitKey: 'cast-amuro-cafe-detective', gender: 'male' },
  kid: { key: 'kid', name: '怪盗基德', accent: '#f8f9fa', portraitKey: 'cast-kaito-kid', gender: 'male' },
  megure: { key: 'megure', name: '目暮警官', accent: '#a88c5f', portraitKey: 'cast-megure-inspector', gender: 'male' },
  sato: { key: 'sato', name: '佐藤刑警', accent: '#d55d92', portraitKey: 'cast-sato-detective', gender: 'female' },
  takagi: { key: 'takagi', name: '高木刑警', accent: '#5b8def', portraitKey: 'cast-takagi-detective', gender: 'male' }
};

const defaultCast = [
  'conan',
  'ran',
  'ayumi',
  'mitsuhiko',
  'kogoro',
  'agasa',
  'genta',
  'ai',
  'heiji',
  'kazuha',
  'sonoko',
  'amuro',
  'kid',
  'megure',
  'sato',
  'takagi'
];

const sourceCases: SourceCaseSpec[] = [
  {
    id: 'case-01',
    title: '花店清晨的未送花束',
    original: 'The Flower Store',
    difficulty: 'easy',
    size: { rows: 7, columns: 7 },
    keyItems: ['bonsai', 'carpet', 'chair'],
    roomLabels: ['店面', '收银区', '办公室', '装卸区', '花束准备区'],
    clueTexts: [
      '柯南在盆景旁。',
      '小兰在花束准备区。',
      '步美站在地毯上。',
      '光彦坐在椅子上。',
      '小五郎在第一列。',
      '园子在店面区域；她所在区域还有一名男性。',
      '元太是受害者，和犯人单独在同一区域。'
    ],
    cast: ['conan', 'ran', 'ayumi', 'mitsuhiko', 'kogoro', 'sonoko', 'genta']
  },
  {
    id: 'case-02',
    title: '里斯本书亭旁的垃圾桶',
    original: 'The Book Kiosk',
    difficulty: 'easy',
    size: { rows: 5, columns: 5 },
    keyItems: ['table', 'trashcan', 'shelf'],
    roomLabels: ['2号书亭', '通道', '1号书亭', '书库'],
    clueTexts: [
      '柯南在 1 号书亭。',
      '小兰在桌子旁。',
      '步美和小兰不在同一区域。',
      '光彦在垃圾桶旁。',
      '小五郎是受害者，和犯人单独在同一区域。'
    ],
    cast: ['conan', 'ran', 'ayumi', 'mitsuhiko', 'kogoro']
  },
  {
    id: 'case-03',
    title: '骑术课后的马厩铃声',
    original: 'The Riding Lesson',
    difficulty: 'easy',
    size: { rows: 9, columns: 9 },
    keyItems: ['shrub', 'table', 'horse', 'puddle'],
    roomLabels: ['训练场', '马厩', '工具棚', '牧场'],
    clueTexts: [
      '柯南在灌木旁。',
      '小兰在桌子旁。',
      '步美在一名骑在马上的女性以西一列。',
      '光彦在第五列。',
      '小五郎在马厩。',
      '阿笠博士骑在训练场的马背上。',
      '元太在工具棚，和小兰同一区域。',
      '灰原站在泥坑上。',
      '服部平次是受害者，在最后剩下的位置。'
    ]
  },
  {
    id: 'case-04',
    title: '白色婚礼后的静默',
    original: 'White Wedding',
    difficulty: 'medium',
    size: { rows: 9, columns: 9 },
    keyItems: ['table', 'plant', 'carpet', 'chair', 'tree'],
    roomLabels: ['礼堂', '西庭院', '洞窟', '门廊', '东庭院', '祭坛'],
    generalClues: ['有一名男性和一名女性站在祭坛上。'],
    clueTexts: [
      '柯南在桌子旁。',
      '小兰在花丛旁。',
      '步美在第五列。',
      '光彦在步美东北方向。',
      '小五郎在自己区域的角落。',
      '阿笠博士所在区域里，有人站在树旁。',
      '元太坐在椅子上。',
      '灰原在门廊。',
      '服部平次是受害者，和犯人单独在同一区域。'
    ]
  },
  {
    id: 'case-05',
    title: '突然来客后的客厅',
    original: 'Surprise Visitors',
    difficulty: 'medium',
    size: { rows: 9, columns: 9 },
    keyItems: ['tv', 'bed', 'table', 'plant', 'shelf', 'chair', 'carpet'],
    roomLabels: ['客厅', '餐厅', '客房', '浴室', '主卧', '厨房'],
    clueTexts: [
      '柯南在电视旁。',
      '小兰在床上。',
      '步美在最后一列。',
      '光彦在桌子旁。',
      '小五郎是唯一在植物旁的人。',
      '阿笠博士在书架旁。',
      '元太在床旁。',
      '灰原坐在椅子上。',
      '服部平次是受害者，和犯人单独在同一区域。'
    ]
  },
  {
    id: 'case-06',
    title: '冻雨夜别墅里的脚印',
    original: 'Freezing Rain',
    difficulty: 'medium',
    size: { rows: 9, columns: 9 },
    keyItems: ['bed', 'chair', 'puddle', 'carpet'],
    roomLabels: ['地下室', '卧室', '车道', '庭院', '客厅', '洗手间', '厨房'],
    clueTexts: [
      '柯南在洗手间。',
      '小兰和床上的人单独在同一区域。',
      '步美坐在椅子上。',
      '光彦站在水洼上。',
      '小五郎不在角落。',
      '阿笠博士在厨房。',
      '元太是唯一站在地毯上的人。',
      '灰原在客厅，紧挨墙边；墙另一侧没有人。',
      '服部平次是受害者，和犯人单独在同一区域。'
    ]
  },
  {
    id: 'case-07',
    title: '翻乱公寓里的泥迹',
    original: 'A Messy Situation',
    difficulty: 'hard',
    size: { rows: 9, columns: 9 },
    keyItems: ['puddle', 'tree', 'chair', 'table', 'shelf'],
    roomLabels: ['后院', '前院', '门廊', '客厅', '厨房', '洗手间', '卧室'],
    generalClues: ['现场没有空区域。'],
    clueTexts: [
      '柯南独自一人。',
      '小兰在柯南东南方向，并在灰原西北方向。',
      '步美站在泥坑上。',
      '光彦和步美单独在同一区域。',
      '小五郎在树旁。',
      '阿笠博士站在泥坑上。',
      '元太坐在椅子上，并且正好在阿笠博士以北一行。',
      '灰原不在桌子旁。',
      '服部平次是受害者，和犯人单独在同一区域。'
    ]
  },
  {
    id: 'case-08',
    title: '废弃博物馆的深夜展厅',
    original: 'The Abandoned Museum',
    difficulty: 'hard',
    size: { rows: 9, columns: 9 },
    keyItems: ['chair', 'table', 'statue', 'rubble'],
    roomLabels: ['大厅', '抽象艺术展区', '金库', '展览厅', '安保室', '咖啡区', '洗手间', '主展厅'],
    clueTexts: [
      '柯南正好在小五郎以西一列。',
      '小兰坐在椅子上，且和一名男性单独同区。',
      '步美在第一列，并且在柯南以南。',
      '光彦在桌子旁。',
      '小五郎所在区域里有一名坐在椅子上的男性。',
      '阿笠博士在雕像旁。',
      '元太在雕像或碎石旁。',
      '灰原在碎石旁，且不在大厅。',
      '服部平次是受害者，在最后剩下的位置。'
    ]
  },
  {
    id: 'case-09',
    title: '约会餐厅里的无声晚餐',
    original: 'Date Night',
    difficulty: 'hard',
    size: { rows: 9, columns: 9 },
    keyItems: ['tree', 'statue', 'chair', 'table'],
    roomLabels: ['情人桥', '河道', '咖啡区', '公园', '小径', '广场'],
    generalClues: ['没有人站在河道区域。'],
    clueTexts: [
      '柯南所在区域没有男性。',
      '小兰的格子不挨着河道格。',
      '步美在柯南以西一列，且不在同一区域。',
      '光彦和唯一站在小径格上的人同区。',
      '小五郎在河道旁，但不在情人桥。',
      '阿笠博士在树旁。',
      '元太在雕像旁。',
      '灰原和唯一坐在椅子上的人单独同区。',
      '服部平次是受害者，和犯人单独在同一区域。'
    ]
  },
  {
    id: 'case-10',
    title: '迷你高尔夫球场的最后一杆',
    original: 'Minigolf',
    difficulty: 'hard',
    size: { rows: 10, columns: 10 },
    keyItems: ['flag', 'chair', 'sand', 'path', 'plant', 'table', 'barrel'],
    roomLabels: ['入口', '木桶区', '沙坑', '小岛', '步道', '沙丘', '荒漠', '路径', '水障碍'],
    generalClues: ['正好一人站在桌子旁。', '正好一人站在木桶旁。'],
    clueTexts: [
      '柯南正好在旗帜上的某人以南一行。',
      '小兰坐在椅子上。',
      '步美不在角落。',
      '光彦是唯一站在路径格上的人。',
      '小五郎站在沙坑格上。',
      '阿笠博士独自一人。',
      '元太在最上行。',
      '灰原在花丛旁。',
      '服部平次和某人独自在荒漠区。',
      '远山和叶是受害者，和犯人单独在同一区域。'
    ],
    cast: ['conan', 'ran', 'ayumi', 'mitsuhiko', 'kogoro', 'agasa', 'genta', 'ai', 'heiji', 'kazuha']
  }
];

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function columnStep(columns: number, seed: number): number {
  for (const candidate of [5 + (seed % 3), 5, 7, 3, 2, 1]) {
    if (gcd(candidate, columns) === 1) return candidate;
  }
  return 1;
}

function solutionCells(spec: SourceCaseSpec): `${number}-${number}`[] {
  const count = spec.clueTexts.length;
  const step = columnStep(spec.size.columns, Number(spec.id.slice(-2)));
  const cells = Array.from({ length: count }, (_, index) => `${index}-${(index * step + 1) % spec.size.columns}` as const);

  function swapColumns(left: number, right: number) {
    const leftColumn = cells[left].split('-')[1];
    const rightColumn = cells[right].split('-')[1];
    cells[left] = `${left}-${rightColumn}` as `${number}-${number}`;
    cells[right] = `${right}-${leftColumn}` as `${number}-${number}`;
  }

  if (spec.id === 'case-05') swapColumns(1, 2);
  if (spec.id === 'case-07') swapColumns(2, 4);
  if (spec.id === 'case-09') swapColumns(2, 4);
  return cells;
}

function roomSlugs(spec: SourceCaseSpec): [string, string, string, string, ...string[]] {
  const base = spec.id;
  const roomKeys = spec.roomLabels.map((_, index) => `${base}-room-${String.fromCharCode(97 + index)}`);
  return [...roomKeys, `${base}-final-room`] as unknown as [string, string, string, string, ...string[]];
}

function roomLayout(spec: SourceCaseSpec, rooms: string[], cells: `${number}-${number}`[]): string[] {
  if (spec.id === 'case-05') {
    const [living, dining, guest, bathroom, mainBedroom, kitchen, finalRoom] = rooms;
    const layout = [
      [guest, guest, guest, guest, mainBedroom, mainBedroom, mainBedroom, mainBedroom, mainBedroom],
      [guest, guest, guest, mainBedroom, mainBedroom, mainBedroom, mainBedroom, mainBedroom, mainBedroom],
      [guest, guest, living, living, living, living, mainBedroom, mainBedroom, mainBedroom],
      [guest, guest, living, living, living, living, living, mainBedroom, kitchen],
      [guest, guest, living, living, living, living, living, mainBedroom, kitchen],
      [bathroom, bathroom, living, living, living, living, living, kitchen, kitchen],
      [bathroom, bathroom, bathroom, bathroom, bathroom, dining, dining, dining, kitchen],
      [bathroom, bathroom, bathroom, bathroom, bathroom, dining, dining, dining, kitchen],
      [bathroom, bathroom, bathroom, bathroom, dining, dining, dining, dining, kitchen]
    ];

    for (const cellId of [cells[0], cells[cells.length - 1]]) {
      const [row, column] = cellId.split('-').map(Number);
      layout[row][column] = finalRoom;
    }

    return layout.map(roomRow);
  }

  const layout: string[][] = [];
  const top = Math.ceil(spec.size.rows * 0.3);
  const middle = Math.ceil(spec.size.rows * 0.64);
  const roomCount = spec.roomLabels.length;
  const roomAt = (index: number) => rooms[Math.min(index, roomCount - 1)];

  for (let row = 0; row < spec.size.rows; row += 1) {
    const line: string[] = [];
    for (let column = 0; column < spec.size.columns; column += 1) {
      let room = roomAt(0);
      if (row < top) {
        room = column < Math.ceil(spec.size.columns * 0.46) ? roomAt(0) : roomAt(1);
      } else if (row < middle) {
        room = column < Math.ceil(spec.size.columns * 0.24)
          ? roomAt(2)
          : column < Math.ceil(spec.size.columns * 0.68)
            ? roomAt(3)
            : roomAt(4);
      } else {
        room = column < Math.ceil(spec.size.columns * 0.34)
          ? roomAt(1)
          : column < Math.ceil(spec.size.columns * 0.66)
            ? roomAt(2)
            : roomAt(0);
      }

      if ((row + column + Number(spec.id.slice(-2))) % 11 === 0) room = roomAt(4);
      line.push(room);
    }
    layout.push(line);
  }

  for (const cellId of [cells[0], cells[cells.length - 1]]) {
    const [row, column] = cellId.split('-').map(Number);
    layout[row][column] = rooms[roomCount];
  }

  return layout.map(roomRow);
}

function cellObjects(spec: SourceCaseSpec, cells: `${number}-${number}`[]): Record<`${number}-${number}`, string> {
  const objects: Record<`${number}-${number}`, string> = {};
  const targetCount = Math.max(spec.keyItems.length * 3, Math.floor((spec.size.rows * spec.size.columns) / 8));
  let cursor = Number(spec.id.slice(-2));

  function put(cellId: `${number}-${number}`, object: string) {
    if (!objects[cellId]) {
      objects[cellId] = object;
      return;
    }
    for (let offset = 1; offset < spec.size.rows * spec.size.columns; offset += 1) {
      const row = (Number(cellId.split('-')[0]) + offset) % spec.size.rows;
      const column = (Number(cellId.split('-')[1]) + offset * 2) % spec.size.columns;
      const next = `${row}-${column}` as const;
      if (!objects[next]) {
        objects[next] = object;
        return;
      }
    }
  }

  for (let index = 0; index < targetCount; index += 1) {
    const object = spec.keyItems[index % spec.keyItems.length];
    const row = (index * 3 + cursor) % spec.size.rows;
    const column = (index * 5 + cursor * 2) % spec.size.columns;
    put(`${row}-${column}`, object);
    cursor += 1;
  }

  spec.keyItems.forEach((object, index) => put(cells[index % cells.length], object));
  return objects;
}

const surpriseVisitorsCarpets = [
  '1-1',
  '2-1',
  '3-0',
  '3-1',
  '1-6',
  '2-6',
  '2-7',
  '3-3',
  '3-4',
  '3-5',
  '4-3',
  '4-4',
  '4-5',
  '5-8',
  '6-8',
  '7-8'
] as const;

const surpriseVisitorsObjects = [
  ['0-0', 'shelf'],
  ['0-1', 'plant'],
  ['0-2', 'shelf'],
  ['0-4', 'table'],
  ['0-6', 'plant'],
  ['0-7', 'bed'],
  ['1-7', 'bed'],
  ['1-0', 'bed'],
  ['2-0', 'bed'],
  ['2-2', 'shelf'],
  ['2-4', 'tv'],
  ['2-8', 'chair'],
  ['3-2', 'shelf'],
  ['3-6', 'chair'],
  ['3-8', 'shelf'],
  ['4-1', 'plant'],
  ['4-2', 'chair'],
  ['4-6', 'chair'],
  ['4-7', 'chair'],
  ['5-0', 'table'],
  ['5-5', 'chair'],
  ['5-6', 'plant'],
  ['5-7', 'shelf'],
  ['6-0', 'chair'],
  ['6-5', 'plant'],
  ['6-6', 'chair'],
  ['6-7', 'chair'],
  ['7-1', 'table'],
  ['7-5', 'chair'],
  ['7-6', 'table'],
  ['8-2', 'shelf'],
  ['8-7', 'chair']
] as const;

const floorItems = new Set(['carpet', 'sand', 'path', 'river', 'water']);
const sceneDecorByOriginal: Record<string, string[]> = {
  'The Flower Store': ['plant', 'plant', 'table', 'shelf', 'chair'],
  'The Book Kiosk': ['shelf', 'shelf', 'table', 'trashcan', 'chair'],
  'The Riding Lesson': ['horse', 'shrub', 'table', 'puddle', 'chair'],
  'White Wedding': ['plant', 'tree', 'chair', 'table', 'carpet'],
  'Freezing Rain': ['bed', 'chair', 'puddle', 'table', 'plant'],
  'A Messy Situation': ['shelf', 'table', 'chair', 'puddle', 'rubble'],
  'The Abandoned Museum': ['statue', 'rubble', 'table', 'chair', 'shelf'],
  'Date Night': ['table', 'chair', 'tree', 'statue', 'plant'],
  Minigolf: ['flag', 'barrel', 'table', 'chair', 'plant']
};

function overlayVariantFor(spec: SourceCaseSpec, index: number): string {
  const candidates = spec.keyItems.filter((item) => floorItems.has(item));
  if (spec.original === 'Date Night') return index % 3 === 0 ? 'river' : index % 3 === 1 ? 'path' : 'carpet';
  if (spec.original === 'Minigolf') return index % 3 === 0 ? 'sand' : index % 3 === 1 ? 'path' : 'water';
  if (candidates.length > 0) return candidates[index % candidates.length];
  return index % 2 === 0 ? 'carpet' : 'floor';
}

function sceneFor(spec: SourceCaseSpec, logicObjectCount: number): CaseScene {
  if (spec.id === 'case-05') {
    return {
      floorOverlays: surpriseVisitorsCarpets.map((cellId, index) => {
        const [row, column] = cellId.split('-').map(Number);
        return { id: `case-05-carpet-${index}`, kind: 'carpet', row, column, variant: 'lavender' };
      }),
      objects: surpriseVisitorsObjects.map(([cellId, object], index) => {
        const [row, column] = cellId.split('-').map(Number);
        return { id: `case-05-scene-object-${index}`, object, row, column };
      })
    };
  }

  const area = spec.size.rows * spec.size.columns;
  const overlayCount = Math.max(3, Math.floor(area / 14));
  const objectPool = [
    ...spec.keyItems.filter((item) => !floorItems.has(item)),
    ...(sceneDecorByOriginal[spec.original] ?? ['table', 'chair', 'plant', 'shelf'])
  ];
  const objectCount = Math.max(logicObjectCount + 4, Math.floor(area / 4), spec.keyItems.length * 4);
  const usedCells = new Set<string>();

  return {
    floorOverlays: Array.from({ length: overlayCount }, (_, index) => {
      const variant = overlayVariantFor(spec, index);
      const row = (index * 2 + Number(spec.id.slice(-2))) % spec.size.rows;
      const column = (index * 3 + Number(spec.id.slice(-2)) + Math.floor(index / 2)) % spec.size.columns;
      return {
        id: `${spec.id}-floor-overlay-${index}`,
        kind: variant === 'carpet' ? 'carpet' : 'floor',
        row,
        column,
        variant
      };
    }),
    objects: Array.from({ length: objectCount }, (_, index) => {
      const object = objectPool[index % objectPool.length];
      let row = (index * 3 + Number(spec.id.slice(-2))) % spec.size.rows;
      let column = (index * 5 + Number(spec.id.slice(-2)) * 2 + Math.floor(index / spec.size.rows)) % spec.size.columns;

      for (let offset = 0; offset < area; offset += 1) {
        const candidate = `${row}-${column}`;
        if (!usedCells.has(candidate)) break;
        row = (row + 1) % spec.size.rows;
        column = (column + 2) % spec.size.columns;
      }

      usedCells.add(`${row}-${column}`);
      return { id: `${spec.id}-scene-object-${index}`, object, row, column };
    })
  };
}

function suspects(spec: SourceCaseSpec, cells: `${number}-${number}`[]): ConanSuspectConfig[] {
  const cast = (spec.cast ?? defaultCast).slice(0, spec.clueTexts.length).map((key) => castMembers[key]);

  return cast.map((member, index) => ({
    id: `${spec.id}-${member.key}`,
    name: member.name,
    accent: member.accent,
    portraitKey: member.portraitKey,
    gender: member.gender,
    room: index === cast.length - 1 ? '受害者' : spec.roomLabels[index % spec.roomLabels.length],
    solutionCell: cells[index],
    clue: ''
  }));
}

function toConfig(spec: SourceCaseSpec): ConanCaseConfig {
  const cells = solutionCells(spec);
  const rooms = roomSlugs(spec);
  const caseSuspects = suspects(spec, cells);
  const objectMap = cellObjects(spec, cells);

  return {
    id: spec.id,
    title: spec.title,
    difficulty: spec.difficulty,
    size: spec.size,
    intro: `原作：${spec.original}。按随机抽样重制为柯南项目关卡；尺寸、难度、关键物品和线索文本按原作打印页整理，棋盘物件全部使用 SVG 绘制。`,
    culpritLabel: '犯人',
    culpritId: caseSuspects[0].id,
    rooms,
    roomLayout: roomLayout(spec, rooms, cells),
    keyItems: spec.keyItems,
    cellObjects: objectMap,
    scene: sceneFor(spec, Object.keys(objectMap).length),
    clueConstraints: caseSuspects.map((suspect, index) => ({
      type: 'text',
      suspectId: suspect.id,
      text: spec.clueTexts[index]
    })),
    generalClues: spec.generalClues,
    support: '柯南',
    suspects: caseSuspects
  };
}

export const conanRoomNames: Record<string, string> = Object.fromEntries(
  sourceCases.flatMap((spec) => {
    const rooms = roomSlugs(spec);
    return [
      ...spec.roomLabels.map((label, index) => [rooms[index], label] as const),
      [rooms[spec.roomLabels.length], '案发单独区域'] as const
    ];
  })
);

const configs: ConanCaseConfig[] = sourceCases.map(toConfig);

export const conanCases: CaseDefinition[] = configs.map(buildConanCase);
