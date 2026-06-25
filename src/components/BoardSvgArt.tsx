import type { CaseDefinition, CellDefinition, SceneOverlay } from '../game/types';
import { objectName, roomName } from '../i18n/zhHans';

const cellSize = 100;
type ArtVariant = 'barbershop';

interface BoardSvgArtProps {
  caseDef: CaseDefinition;
}

interface RoomBounds {
  room: string;
  minRow: number;
  maxRow: number;
  minColumn: number;
  maxColumn: number;
  count: number;
}

interface LineSegment {
  key: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const barbershopRoomLabels: Record<string, string> = {
  'barber-storage': 'STORAGE',
  'barber-staff-room': 'STAFF ROOM',
  'barber-main-area': 'MAIN AREA',
  'barber-entrance': 'ENTRANCE',
  'barber-waiting-area': 'WAITING AREA'
};

const barbershopLabelPositions: Record<string, { x: number; y: number }> = {
  'barber-storage': { x: 112, y: 286 },
  'barber-staff-room': { x: 620, y: 188 },
  'barber-main-area': { x: 270, y: 585 },
  'barber-entrance': { x: 665, y: 585 },
  'barber-waiting-area': { x: 430, y: 785 }
};

function isBarbershop(caseDef: CaseDefinition): boolean {
  return caseDef.id === 'case-05' && caseDef.intro.includes('The Barbershop');
}

function barbershopFloorFill(room: string | undefined): string | undefined {
  if (room === 'barber-storage') return 'url(#barber-floor-storage)';
  if (room === 'barber-staff-room') return 'url(#barber-floor-staff)';
  if (room === 'barber-main-area') return 'url(#barber-floor-main)';
  if (room === 'barber-entrance') return 'url(#barber-floor-entrance)';
  if (room === 'barber-waiting-area') return 'url(#barber-floor-waiting)';
  return undefined;
}

function roomBoundsFor(cells: CellDefinition[]): RoomBounds[] {
  const bounds = new Map<string, RoomBounds>();

  for (const cell of cells) {
    if (!cell.room) continue;
    const bound = bounds.get(cell.room) ?? {
      room: cell.room,
      minRow: cell.row,
      maxRow: cell.row,
      minColumn: cell.column,
      maxColumn: cell.column,
      count: 0
    };

    bound.minRow = Math.min(bound.minRow, cell.row);
    bound.maxRow = Math.max(bound.maxRow, cell.row);
    bound.minColumn = Math.min(bound.minColumn, cell.column);
    bound.maxColumn = Math.max(bound.maxColumn, cell.column);
    bound.count += 1;
    bounds.set(cell.room, bound);
  }

  return [...bounds.values()];
}

const roomFloorTokens: Record<string, string> = {
  'case-01-room-a': 'wood-brown',
  'case-01-room-b': 'yellow-tile',
  'case-01-room-c': 'pink-planks',
  'case-01-room-d': 'blue-planks',
  'case-01-room-e': 'mint-tile',
  'case-02-room-a': 'pink-planks',
  'case-02-room-b': 'blue-planks',
  'case-02-room-c': 'pink-planks',
  'case-02-room-d': 'wood-brown',
  'case-03-room-a': 'grass-green',
  'case-03-room-b': 'wood-brown',
  'case-03-room-c': 'blue-planks',
  'case-03-room-d': 'grass-green',
  'case-04-room-a': 'stone-purple',
  'case-04-room-b': 'grass-green',
  'case-04-room-c': 'stone-dark',
  'case-04-room-d': 'pink-planks',
  'case-04-room-e': 'grass-green',
  'case-04-room-f': 'carpet-pink',
  'case-06-room-a': 'stone-purple',
  'case-06-room-b': 'checker-pink',
  'case-06-room-c': 'blue-planks',
  'case-06-room-d': 'grass-green',
  'case-06-room-e': 'wood-brown',
  'case-06-room-f': 'checker-blue',
  'case-06-room-g': 'yellow-tile',
  'case-07-room-a': 'grass-green',
  'case-07-room-b': 'grass-green',
  'case-07-room-c': 'pink-planks',
  'case-07-room-d': 'wood-brown',
  'case-07-room-e': 'yellow-tile',
  'case-07-room-f': 'checker-blue',
  'case-07-room-g': 'checker-pink',
  'case-08-room-a': 'stone-purple',
  'case-08-room-b': 'checker-lavender',
  'case-08-room-c': 'stone-dark',
  'case-08-room-d': 'stone-purple',
  'case-08-room-e': 'blue-planks',
  'case-08-room-f': 'wood-brown',
  'case-08-room-g': 'checker-blue',
  'case-08-room-h': 'stone-purple',
  'case-09-room-a': 'wood-dark',
  'case-09-room-b': 'water-blue',
  'case-09-room-c': 'wood-brown',
  'case-09-room-d': 'grass-green',
  'case-09-room-e': 'path-purple',
  'case-09-room-f': 'stone-purple',
  'case-10-room-a': 'stone-purple',
  'case-10-room-b': 'wood-brown',
  'case-10-room-c': 'sand-yellow',
  'case-10-room-d': 'grass-green',
  'case-10-room-e': 'path-purple',
  'case-10-room-f': 'sand-yellow',
  'case-10-room-g': 'sand-yellow',
  'case-10-room-h': 'path-purple',
  'case-10-room-i': 'water-blue'
};

function murdokuFloorFill(token: string | undefined): string | undefined {
  return token ? `url(#murdoku-floor-${token})` : undefined;
}

function floorKind(room: string | undefined): 'wood' | 'tile' | 'carpet' | 'brick' | 'stone' | 'metal' | 'sand' {
  const slug = room ?? '';
  if (slug.includes('kitchen') || slug.includes('porch') || slug.includes('kiosk')) return 'tile';
  if (slug.includes('carpet') || slug.includes('hall') || slug.includes('bedroom') || slug.includes('party')) return 'carpet';
  if (slug.includes('garage') || slug.includes('shed') || slug.includes('bridge')) return 'metal';
  if (slug.includes('desert') || slug.includes('pasture') || slug.includes('training') || slug.includes('yard')) return 'sand';
  if (slug.includes('gallery') || slug.includes('stone') || slug.includes('lot') || slug.includes('canyon')) return 'stone';
  if (slug.includes('waiting') || slug.includes('office') || slug.includes('studio')) return 'brick';
  return 'wood';
}

function floorFillForRoom(room: string | undefined): string {
  const murdokuFill = room ? murdokuFloorFill(roomFloorTokens[room]) : undefined;
  if (murdokuFill) return murdokuFill;
  if (room === 'case-05-room-a') return 'url(#floor-surprise-living)';
  if (room === 'case-05-room-b') return 'url(#floor-surprise-dining)';
  if (room === 'case-05-room-c' || room === 'case-05-room-e') return 'url(#floor-surprise-mint)';
  if (room === 'case-05-room-d') return 'url(#floor-surprise-bath)';
  if (room === 'case-05-room-f') return 'url(#floor-surprise-kitchen)';
  return `url(#floor-${floorKind(room)})`;
}

function roomTint(room: string | undefined): string {
  if (room && roomFloorTokens[room]) return 'rgba(255, 255, 255, 0)';
  const slug = room ?? '';
  if (slug.startsWith('case-05-room')) return 'rgba(255, 255, 255, 0)';
  if (slug.includes('refresh') || slug.includes('carpet') || slug.includes('party') || slug.includes('bedroom')) return 'rgba(218, 151, 174, .26)';
  if (slug.includes('kitchen') || slug.includes('porch') || slug.includes('kiosk')) return 'rgba(245, 207, 139, .22)';
  if (slug.includes('garage') || slug.includes('car') || slug.includes('metal')) return 'rgba(84, 105, 130, .22)';
  if (slug.includes('desert') || slug.includes('pasture') || slug.includes('training')) return 'rgba(211, 179, 106, .22)';
  if (slug.includes('flower') || slug.includes('yard')) return 'rgba(107, 171, 116, .16)';
  return 'rgba(132, 96, 151, .18)';
}

function center(cell: CellDefinition): { x: number; y: number } {
  return { x: cell.column * cellSize + cellSize / 2, y: cell.row * cellSize + cellSize / 2 };
}

function roomWallSegments(caseDef: CaseDefinition): LineSegment[] {
  const cellsByPosition = new Map(caseDef.cells.map((cell) => [`${cell.row}-${cell.column}`, cell]));
  const segments: LineSegment[] = [];

  for (const cell of caseDef.cells) {
    const x = cell.column * cellSize;
    const y = cell.row * cellSize;
    const east = cellsByPosition.get(`${cell.row}-${cell.column + 1}`);
    const south = cellsByPosition.get(`${cell.row + 1}-${cell.column}`);

    if (!east || east.room !== cell.room) {
      segments.push({ key: `${cell.id}-e`, x1: x + cellSize, y1: y, x2: x + cellSize, y2: y + cellSize });
    }

    if (!south || south.room !== cell.room) {
      segments.push({ key: `${cell.id}-s`, x1: x, y1: y + cellSize, x2: x + cellSize, y2: y + cellSize });
    }

    if (cell.column === 0) {
      segments.push({ key: `${cell.id}-w`, x1: x, y1: y, x2: x, y2: y + cellSize });
    }

    if (cell.row === 0) {
      segments.push({ key: `${cell.id}-n`, x1: x, y1: y, x2: x + cellSize, y2: y });
    }
  }

  return segments;
}

function DrawObject({ cell, variant }: { cell: CellDefinition; variant?: ArtVariant }) {
  if (!cell.object) return null;

  const { x, y } = center(cell);
  const key = cell.object;

  if (key === 'plant' || key === 'bonsai' || key === 'shrub' || key === 'tree' || key === 'flowers') {
    if (key === 'tree') {
      return (
        <g transform={`translate(${x} ${y})`}>
          <ellipse cx="0" cy="32" rx="31" ry="9" fill="#000" opacity=".18" />
          <path d="M-8 34v-38h16v38z" fill="#7a4a28" stroke="#20110b" strokeWidth="6" strokeLinejoin="round" />
          <path d="M-37-4c-11-28 21-48 39-25 11-29 49-17 43 13 28 5 22 42-6 41-7 24-44 20-47-1-24 13-47-7-29-28z" fill="#3fa663" stroke="#102417" strokeWidth="6" strokeLinejoin="round" />
          <path d="M-14-14c11 7 24 8 40 2M-24 7c16 7 34 7 54 0" stroke="#b7f0c9" strokeWidth="4" strokeLinecap="round" opacity=".55" />
        </g>
      );
    }

    return (
      <g transform={`translate(${x} ${y})`}>
        <ellipse cx="0" cy="22" rx="22" ry="9" fill="#000" opacity=".2" />
        <path d="M-20 8h40l-7 30h-26z" fill="#7c4c83" stroke="#0d0b0f" strokeWidth="5" />
        <path d="M-21 3c-18-23 13-34 20-9 3-36 32-35 21 2 21-21 42 2 13 19 18 7 6 28-16 17-12 19-38 5-19-12-23 15-39-2-19-17z" fill={key === 'shrub' ? '#355c37' : key === 'flowers' ? '#e85d8d' : '#35d47e'} stroke="#0d0b0f" strokeWidth="5" strokeLinejoin="round" />
        <path d="M-4 14c0-20 4-32 12-48M-7 15c-8-18-19-30-33-38M1 15c16-15 30-22 44-22" stroke="#d1ffe6" strokeWidth="4" strokeLinecap="round" opacity=".75" />
        {key === 'flowers' ? (
          <g fill="#ffe5ef" stroke="#0d0b0f" strokeWidth="3">
            <circle cx="-15" cy="-6" r="6" />
            <circle cx="6" cy="-17" r="6" />
            <circle cx="19" cy="3" r="6" />
          </g>
        ) : null}
      </g>
    );
  }

  if (key === 'chair') {
    return (
      <g transform={`translate(${x} ${y})`}>
        <ellipse cx="4" cy="27" rx="32" ry="11" fill="#000" opacity=".18" />
        <path d="M-26-30c0-21 52-21 52 0v32h-52z" fill={variant === 'barbershop' ? '#d7c7ef' : '#fff4ff'} stroke="#7f7aa7" strokeWidth="6" />
        <path d="M-34-1h17v39h-17zM17-1h17v39H17zM-18 8h36v34h-36z" fill={variant === 'barbershop' ? '#eee8fb' : '#fff'} stroke={variant === 'barbershop' ? '#8c74aa' : '#6fa5ba'} strokeWidth="6" strokeLinejoin="round" />
      </g>
    );
  }

  if (key === 'shelf' || key === 'bookshelf') {
    return (
      <g transform={`translate(${x} ${y})`}>
        <rect x="-34" y="-38" width="68" height="76" rx="3" fill="#8a4f58" stroke="#0c090b" strokeWidth="6" />
        {[-18, 6, 30].map((yy) => (
          <line key={yy} x1="-28" y1={yy} x2="28" y2={yy} stroke="#0c090b" strokeWidth="4" />
        ))}
        <rect x="-26" y="-31" width="8" height="16" fill="#ffd7dd" />
        <rect x="-15" y="-31" width="8" height="16" fill="#f3f0e6" />
        <rect x="-3" y="-31" width="23" height="16" fill="#684258" />
        <rect x="-25" y="-7" width="27" height="18" fill="#684258" />
        <rect x="6" y="-7" width="9" height="18" fill="#ffd7dd" />
        <path d="M18-6l15 15" stroke="#ffd7dd" strokeWidth="5" />
        <rect x="-25" y="17" width="16" height="16" fill="#684258" />
        <rect x="-5" y="17" width="10" height="16" fill="#ffd7dd" />
        <rect x="10" y="17" width="16" height="16" fill="#684258" />
      </g>
    );
  }

  if (key === 'table') {
    if (variant === 'barbershop') {
      return (
        <g transform={`translate(${x} ${y})`}>
          <ellipse cx="0" cy="30" rx="35" ry="8" fill="#000" opacity=".18" />
          <rect x="-38" y="-30" width="76" height="50" fill="#7487bd" stroke="#0b0b10" strokeWidth="6" />
          <rect x="-38" y="18" width="76" height="10" fill="#526496" stroke="#0b0b10" strokeWidth="4" />
          <path d="M-30 28v16M30 28v16" stroke="#0b0b10" strokeWidth="5" />
        </g>
      );
    }

    return (
      <g transform={`translate(${x} ${y})`}>
        <ellipse cx="0" cy="30" rx="35" ry="8" fill="#000" opacity=".18" />
        <rect x="-38" y="-25" width="76" height="46" fill="#a65f63" stroke="#111" strokeWidth="6" />
        <path d="M-30 22v18M30 22v18" stroke="#111" strokeWidth="5" />
      </g>
    );
  }

  if (key === 'carpet') {
    if (variant === 'barbershop') {
      return (
        <g transform={`translate(${x} ${y})`}>
          <rect x="-43" y="-31" width="86" height="62" fill="#aaa2ef" stroke="#63598f" strokeWidth="6" />
          <rect x="-34" y="-22" width="68" height="44" fill="none" stroke="#d5cdfc" strokeWidth="5" />
        </g>
      );
    }

    return (
      <g transform={`translate(${x} ${y})`}>
        <rect x="-42" y="-30" width="84" height="60" fill="#f28d99" stroke="#6b3b55" strokeWidth="6" />
        <rect x="-34" y="-22" width="68" height="44" fill="none" stroke="#ffc3c8" strokeWidth="5" />
      </g>
    );
  }

  if (key === 'car') {
    return (
      <g transform={`translate(${x} ${y})`}>
        <ellipse cx="0" cy="29" rx="38" ry="9" fill="#000" opacity=".2" />
        <path d="M-42 9c6-22 20-32 43-31 19 0 31 9 41 31l8 7v21h-100V16z" fill="#6b7897" stroke="#111" strokeWidth="6" strokeLinejoin="round" />
        <path d="M-16-14h28l14 21h-55z" fill="#2f3447" stroke="#111" strokeWidth="4" />
        <circle cx="-27" cy="36" r="8" fill="#111" />
        <circle cx="29" cy="36" r="8" fill="#111" />
      </g>
    );
  }

  if (key === 'oil-slick' || key === 'paint-spill' || key === 'puddle') {
    const fill = key === 'oil-slick' ? '#2e3428' : key === 'puddle' ? '#705744' : '#f05a79';
    return (
      <g transform={`translate(${x} ${y})`}>
        <path d="M-34 16c-16-26 15-45 43-31 15-13 41-6 39 17 20 14 0 38-29 29-19 15-43 8-53-15z" fill={fill} stroke="#17110f" strokeWidth="5" strokeLinejoin="round" />
        <path d="M-16 7c16-8 33-7 50 3" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".28" />
      </g>
    );
  }

  if (key === 'box') {
    if (variant === 'barbershop') {
      return (
        <g transform={`translate(${x} ${y})`}>
          <ellipse cx="0" cy="31" rx="32" ry="8" fill="#000" opacity=".14" />
          <rect x="-31" y="-39" width="62" height="70" rx="2" fill="#5f4350" stroke="#0f0b0e" strokeWidth="6" />
          <path d="M-31 7c16 9 40 9 62 0M-4-38v69" stroke="#2f2229" strokeWidth="5" />
        </g>
      );
    }

    return (
      <g transform={`translate(${x} ${y})`}>
        <path d="M-35-15h70v50h-70z" fill="#b7783e" stroke="#19100b" strokeWidth="6" />
        <path d="M-35-15l18-20h34l18 20M0-15v50" fill="none" stroke="#5b3823" strokeWidth="5" />
      </g>
    );
  }

  if (key === 'bear' || key === 'teddy-bear') {
    const fill = key === 'bear' ? '#6e4d3e' : '#b9825b';
    return (
      <g transform={`translate(${x} ${y})`}>
        <ellipse cx="0" cy="31" rx="31" ry="9" fill="#000" opacity=".18" />
        <circle cx="-24" cy="-27" r="13" fill={fill} stroke="#1a100c" strokeWidth="5" />
        <circle cx="24" cy="-27" r="13" fill={fill} stroke="#1a100c" strokeWidth="5" />
        <circle cx="0" cy="-12" r="31" fill={fill} stroke="#1a100c" strokeWidth="6" />
        <ellipse cx="0" cy="16" rx="30" ry="25" fill={fill} stroke="#1a100c" strokeWidth="6" />
        <ellipse cx="0" cy="-6" rx="13" ry="10" fill="#e9c39d" stroke="#1a100c" strokeWidth="4" />
        <circle cx="-10" cy="-17" r="4" fill="#100b09" />
        <circle cx="10" cy="-17" r="4" fill="#100b09" />
        <path d="M-5-6h10M0-5v7" stroke="#100b09" strokeWidth="4" strokeLinecap="round" />
      </g>
    );
  }

  if (key === 'door') {
    return (
      <g transform={`translate(${x} ${y})`}>
        <rect x="-28" y="-40" width="56" height="78" rx="3" fill="#7b5f86" stroke="#110d14" strokeWidth="6" />
        <rect x="-18" y="-31" width="36" height="25" fill="#9fcbd5" opacity=".55" stroke="#110d14" strokeWidth="4" />
        <circle cx="15" cy="10" r="4" fill="#f3d36a" stroke="#110d14" strokeWidth="3" />
      </g>
    );
  }

  if (key === 'register') {
    return (
      <g transform={`translate(${x} ${y})`}>
        <ellipse cx="0" cy="32" rx="33" ry="8" fill="#000" opacity=".16" />
        <rect x="-28" y="-32" width="56" height="32" rx="4" fill="#526496" stroke="#0f0d12" strokeWidth="6" />
        <rect x="-36" y="-2" width="72" height="38" rx="4" fill="#8d5a78" stroke="#0f0d12" strokeWidth="6" />
        <rect x="-18" y="8" width="36" height="12" fill="#f4e6b3" stroke="#0f0d12" strokeWidth="3" />
        <path d="M-25 27h50" stroke="#0f0d12" strokeWidth="4" />
      </g>
    );
  }

  if (key === 'bed') {
    return (
      <g transform={`translate(${x} ${y})`}>
        <rect x="-42" y="-28" width="84" height="56" rx="4" fill="#f3c5ce" stroke="#121012" strokeWidth="6" />
        <rect x="-34" y="-20" width="24" height="22" rx="4" fill="#fff6f8" stroke="#c56d79" strokeWidth="4" />
      </g>
    );
  }

  if (key === 'tv') {
    return (
      <g transform={`translate(${x} ${y})`}>
        <rect x="-34" y="-31" width="68" height="50" rx="5" fill={variant === 'barbershop' ? '#454966' : '#1b1f29'} stroke="#100d10" strokeWidth="6" />
        <rect x="-24" y="-21" width="48" height="30" fill={variant === 'barbershop' ? '#a8ffe8' : '#f2f0e7'} />
        <path d="M0 19v17M-18 36h36" stroke="#100d10" strokeWidth="6" strokeLinecap="round" />
        <text x="0" y="2" textAnchor="middle" fontSize="22" fontWeight="900">♪</text>
      </g>
    );
  }

  if (key === 'cactus') {
    return (
      <g transform={`translate(${x} ${y})`}>
        <path d="M-5 35v-60c0-13 18-13 18 0v16h9c5 0 8-3 8-8v-10c0-11 16-11 16 0v15c0 17-12 29-28 29h-5v18M-5 4h-8c-16 0-28-12-28-29 0-11 16-11 16 0v8c0 5 3 8 8 8h12" fill="#37b976" stroke="#0f3423" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    );
  }

  if (key === 'boulder') {
    return (
      <g transform={`translate(${x} ${y})`}>
        <path d="M-38 20c0-28 20-50 51-48 24 2 44 20 40 47-3 22-20 33-45 35h-20c-17-3-27-15-26-34z" fill="#88817b" stroke="#211e1d" strokeWidth="6" />
        <path d="M-16-12c17-9 35-6 48 8M-18 27c18 6 37 3 58-8" stroke="#c2bab4" strokeWidth="5" strokeLinecap="round" opacity=".75" />
      </g>
    );
  }

  if (key === 'rubble') {
    return (
      <g transform={`translate(${x} ${y})`}>
        <ellipse cx="0" cy="30" rx="34" ry="9" fill="#000" opacity=".18" />
        <path d="M-38 22l13-34 28 6 20-19 27 27-8 27-38 11z" fill="#8a8787" stroke="#1b1718" strokeWidth="6" strokeLinejoin="round" />
        <path d="M-19-5l22 31M4-6l25 20M-29 19l41-4" stroke="#c5c0c0" strokeWidth="4" strokeLinecap="round" opacity=".65" />
      </g>
    );
  }

  if (key === 'statue') {
    return (
      <g transform={`translate(${x} ${y})`}>
        <ellipse cx="0" cy="34" rx="32" ry="8" fill="#000" opacity=".18" />
        <path d="M-22 33h44l-5-18h-34z" fill="#8d8a95" stroke="#111" strokeWidth="6" strokeLinejoin="round" />
        <path d="M-13 15v-25c0-15 26-15 26 0v25z" fill="#aaa7b3" stroke="#111" strokeWidth="6" />
        <circle cx="0" cy="-25" r="17" fill="#aaa7b3" stroke="#111" strokeWidth="6" />
        <path d="M-5-31h10M-7-21h14" stroke="#686472" strokeWidth="4" strokeLinecap="round" />
      </g>
    );
  }

  if (key === 'flag') {
    return (
      <g transform={`translate(${x} ${y})`}>
        <ellipse cx="0" cy="34" rx="25" ry="8" fill="#000" opacity=".14" />
        <path d="M-6 34v-70" stroke="#17110f" strokeWidth="7" strokeLinecap="round" />
        <path d="M-3-35h46l-10 20 10 20h-46z" fill="#f05a79" stroke="#17110f" strokeWidth="6" strokeLinejoin="round" />
        <circle cx="-6" cy="36" r="13" fill="#f1e4b0" stroke="#17110f" strokeWidth="5" />
      </g>
    );
  }

  if (key === 'barrel') {
    return (
      <g transform={`translate(${x} ${y})`}>
        <ellipse cx="0" cy="32" rx="29" ry="8" fill="#000" opacity=".18" />
        <path d="M-28-28c9-10 47-10 56 0v58c-9 10-47 10-56 0z" fill="#9b6342" stroke="#17100b" strokeWidth="6" />
        <path d="M-30-12h60M-30 14h60M-12-34c-5 20-5 47 0 70M12-34c5 20 5 47 0 70" stroke="#4d2d1e" strokeWidth="5" />
      </g>
    );
  }

  if (key === 'horse') {
    return (
      <g transform={`translate(${x} ${y})`}>
        <path d="M-43 4c7-20 24-31 50-29h16l15-18 21 8-7 30 12 10-9 16-16-7-11 42h-18l3-34h-43l-8 34h-18z" fill="#8a5a34" stroke="#1a0f08" strokeWidth="6" strokeLinejoin="round" />
        <path d="M-50 8c-10 7-15 17-17 31" stroke="#1a0f08" strokeWidth="6" strokeLinecap="round" />
      </g>
    );
  }

  if (key === 'trashcan') {
    return (
      <g transform={`translate(${x} ${y})`}>
        <path d="M-23-28h46l-5 66h-36z" fill="#78818c" stroke="#111" strokeWidth="6" />
        <path d="M-29-31h58M-11-41h22" stroke="#111" strokeWidth="6" strokeLinecap="round" />
      </g>
    );
  }

  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-28" y="-28" width="56" height="56" rx="8" fill="#a85f64" stroke="#111" strokeWidth="6" />
      <text x="0" y="8" textAnchor="middle" fontSize="16" fontWeight="900" fill="#fff">{objectName(key)}</text>
    </g>
  );
}

export function BoardObjectSvg({ object, variant }: { object: string; variant?: ArtVariant }) {
  return (
    <svg className="cell-object-art" viewBox="0 0 100 100" aria-hidden="true">
      <DrawObject cell={{ id: '0-0', row: 0, column: 0, object }} variant={variant} />
    </svg>
  );
}

function decorativeObjectFor(cell: CellDefinition): string | undefined {
  if (cell.object) return undefined;
  const room = cell.room ?? '';
  const slot = (cell.row * 3 + cell.column * 5) % 17;

  if (room.includes('library') && slot === 0) return 'shelf';
  if (room.includes('discussion') && slot === 3) return 'table';
  if (room.includes('discussion') && slot === 8) return 'chair';
  if (room.includes('refresh') && slot === 2) return 'table';
  if (room.includes('delivery') && slot === 4) return 'box';
  if (room.includes('living') && slot === 6) return 'chair';
  if (room.includes('bedroom') && slot === 11) return 'bed';
  if (room.includes('garage') && slot === 13) return 'car';
  if (room.includes('waiting') && slot === 1) return 'chair';
  if (room.includes('flower') && slot === 9) return 'plant';
  if (room.includes('desert') && slot === 12) return 'cactus';
  if (room.includes('stable') && slot === 5) return 'horse';
  if (room.includes('kitchen') && slot === 7) return 'table';

  return undefined;
}

function overlayRect(overlay: SceneOverlay): { x: number; y: number; width: number; height: number } {
  return {
    x: overlay.column * cellSize,
    y: overlay.row * cellSize,
    width: (overlay.columnSpan ?? 1) * cellSize,
    height: (overlay.rowSpan ?? 1) * cellSize
  };
}

function SceneFloorOverlay({ overlay }: { overlay: SceneOverlay }) {
  const rect = overlayRect(overlay);
  const tokenByVariant: Record<string, string> = {
    carpet: 'carpet-lavender',
    lavender: 'carpet-lavender',
    sand: 'sand-yellow',
    path: 'path-purple',
    river: 'water-blue',
    water: 'water-blue',
    floor: 'blue-planks'
  };
  const token = tokenByVariant[overlay.variant ?? overlay.kind] ?? (overlay.kind === 'carpet' ? 'carpet-lavender' : 'blue-planks');

  return (
    <g className={`scene-floor-overlay scene-${overlay.kind}`} data-scene-overlay={overlay.kind}>
      <rect {...rect} fill={`url(#murdoku-floor-${token})`} opacity=".94" />
      {overlay.variant === 'path' ? (
        <path
          d={`M${rect.x + 12} ${rect.y + 65}c20-12 44-12 76 0`}
          fill="none"
          stroke="#6f5674"
          strokeLinecap="round"
          strokeWidth="5"
          opacity=".42"
        />
      ) : null}
      {overlay.variant === 'river' || overlay.variant === 'water' ? (
        <path
          d={`M${rect.x + 9} ${rect.y + 36}c18-9 34-9 50 0s31 9 49 0`}
          fill="none"
          stroke="#d7eef7"
          strokeLinecap="round"
          strokeWidth="5"
          opacity=".65"
        />
      ) : null}
    </g>
  );
}

function SceneFloorEdges({ overlays }: { overlays: SceneOverlay[] }) {
  const carpetCells = new Set(
    overlays.filter((overlay) => overlay.kind === 'carpet').map((overlay) => `${overlay.row}-${overlay.column}`)
  );

  return (
    <g className="scene-floor-edges">
      {overlays.flatMap((overlay) => {
        if (overlay.kind !== 'carpet') return [];
        const x = overlay.column * cellSize;
        const y = overlay.row * cellSize;
        const edges = [
          { key: 'n', show: !carpetCells.has(`${overlay.row - 1}-${overlay.column}`), x1: x + 9, y1: y + 9, x2: x + cellSize - 9, y2: y + 9 },
          {
            key: 'e',
            show: !carpetCells.has(`${overlay.row}-${overlay.column + 1}`),
            x1: x + cellSize - 9,
            y1: y + 9,
            x2: x + cellSize - 9,
            y2: y + cellSize - 9
          },
          {
            key: 's',
            show: !carpetCells.has(`${overlay.row + 1}-${overlay.column}`),
            x1: x + 9,
            y1: y + cellSize - 9,
            x2: x + cellSize - 9,
            y2: y + cellSize - 9
          },
          { key: 'w', show: !carpetCells.has(`${overlay.row}-${overlay.column - 1}`), x1: x + 9, y1: y + 9, x2: x + 9, y2: y + cellSize - 9 }
        ];

        return edges
          .filter((edge) => edge.show)
          .map(({ key, show: _show, ...edge }) => (
            <line className="scene-carpet-edge" key={`${overlay.id}-${key}`} {...edge} />
          ));
      })}
    </g>
  );
}

function BarbershopDecorations() {
  return (
    <g className="barbershop-board-decor">
      <path
        d="M110 310H690V390H190V590H110Z"
        fill="#aaa2ef"
        stroke="#61588d"
        strokeWidth="7"
        strokeLinejoin="miter"
      />
      <path
        d="M124 324H676V376H176V576H124Z"
        fill="none"
        stroke="#d6cffb"
        strokeWidth="5"
        strokeLinejoin="miter"
      />
      <path
        d="M110 610H290V690H190V790H110Z"
        fill="#aaa2ef"
        stroke="#61588d"
        strokeWidth="7"
        strokeLinejoin="miter"
      />
      <path
        d="M124 624H276V676H176V776H124Z"
        fill="none"
        stroke="#d6cffb"
        strokeWidth="5"
        strokeLinejoin="miter"
      />
      <g>
        <rect x="210" y="205" width="290" height="70" fill="#7487bd" stroke="#0b0b10" strokeWidth="7" />
        <rect x="210" y="268" width="290" height="12" fill="#526496" stroke="#0b0b10" strokeWidth="4" />
        <path d="M222 280v20M488 280v20" stroke="#0b0b10" strokeWidth="5" />
      </g>
      <g>
        <rect x="6" y="405" width="86" height="185" fill="#7487bd" stroke="#0b0b10" strokeWidth="7" />
        <rect x="6" y="580" width="86" height="12" fill="#526496" stroke="#0b0b10" strokeWidth="4" />
        <path d="M16 592v20M82 592v20" stroke="#0b0b10" strokeWidth="5" />
      </g>
    </g>
  );
}

export function BoardSvgArt({ caseDef }: BoardSvgArtProps) {
  const width = caseDef.size.columns * cellSize;
  const height = caseDef.size.rows * cellSize;
  const roomBounds = roomBoundsFor(caseDef.cells);
  const walls = roomWallSegments(caseDef);
  const barbershop = isBarbershop(caseDef);
  const roomLabels = roomBounds.flatMap((bound) => {
    if (bound.count < 2) return [];

    const label = barbershop ? barbershopRoomLabels[bound.room] : roomName(bound.room);
    if (!label) return [];

    const override = barbershop ? barbershopLabelPositions[bound.room] : undefined;
    const x = override?.x ?? ((bound.minColumn + bound.maxColumn + 1) * cellSize) / 2;
    const y = override?.y ?? (bound.maxRow + 0.88) * cellSize;
    return [{ key: bound.room, label, x, y: Math.min(y, height - 12) }];
  });

  return (
    <>
      <svg className="board-svg-art" viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
        <defs>
        <pattern id="barber-floor-storage" width="58" height="58" patternUnits="userSpaceOnUse">
          <rect width="58" height="58" fill="#a9c4bd" />
          <path d="M0 28h58M29 0v28M14 28v30M44 28v30" stroke="#7d9995" strokeWidth="3" opacity=".55" />
          <rect x="2" y="2" width="25" height="24" fill="#bdd2cc" opacity=".55" />
          <rect x="31" y="31" width="25" height="25" fill="#bdd2cc" opacity=".45" />
        </pattern>
        <pattern id="barber-floor-staff" width="72" height="100" patternUnits="userSpaceOnUse">
          <rect width="72" height="100" fill="#a9ced4" />
          <path d="M22 0v100M50 0v100M0 42h72" stroke="#7caab3" strokeWidth="4" opacity=".48" />
          <path d="M12 20c14-5 28-5 44 0" stroke="#c3e1e5" strokeWidth="3" opacity=".45" />
        </pattern>
        <pattern id="barber-floor-main" width="76" height="100" patternUnits="userSpaceOnUse">
          <rect width="76" height="100" fill="#a8789d" />
          <path d="M24 0v100M55 0v100M0 41h76" stroke="#835b80" strokeWidth="4" opacity=".52" />
          <path d="M10 19c16-5 32-5 52 1" stroke="#bd91b2" strokeWidth="3" opacity=".42" />
        </pattern>
        <pattern id="barber-floor-entrance" width="76" height="100" patternUnits="userSpaceOnUse">
          <rect width="76" height="100" fill="#715a72" />
          <path d="M26 0v100M56 0v100M0 41h76" stroke="#4f3c52" strokeWidth="4" opacity=".58" />
          <path d="M11 19c16-5 32-5 52 1" stroke="#8b728c" strokeWidth="3" opacity=".35" />
        </pattern>
        <pattern id="barber-floor-waiting" width="76" height="100" patternUnits="userSpaceOnUse">
          <rect width="76" height="100" fill="#8f83c9" />
          <path d="M24 0v100M55 0v100M0 41h76" stroke="#7166ae" strokeWidth="4" opacity=".5" />
          <path d="M10 19c16-5 32-5 52 1" stroke="#a99fe0" strokeWidth="3" opacity=".35" />
        </pattern>
        <pattern id="floor-wood" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="#9c6038" />
          <path d="M0 28h100M0 62h100M25 0v28M72 28v34M41 62v38" stroke="#4a2b1a" strokeWidth="4" opacity=".55" />
          <path d="M13 18c18-12 42-12 68 0M9 82c23-9 48-10 77-2" stroke="#c68a55" strokeWidth="3" opacity=".45" />
        </pattern>
        <pattern id="floor-tile" width="50" height="50" patternUnits="userSpaceOnUse">
          <rect width="50" height="50" fill="#efd69e" />
          <path d="M0 0h50v50h-50zM25 0v50M0 25h50" fill="none" stroke="#b88152" strokeWidth="3" opacity=".6" />
          <path d="M0 25h25v25h-25zM25 0h25v25h-25z" fill="#f7e5b8" opacity=".6" />
        </pattern>
        <pattern id="floor-carpet" width="80" height="80" patternUnits="userSpaceOnUse">
          <rect width="80" height="80" fill="#dba4ad" />
          <rect width="40" height="40" fill="#c98d98" />
          <rect x="40" y="40" width="40" height="40" fill="#c98d98" />
        </pattern>
        <pattern id="floor-brick" width="100" height="50" patternUnits="userSpaceOnUse">
          <rect width="100" height="50" fill="#a77a9c" />
          <path d="M0 24h100M50 0v24M25 24v26M75 24v26" stroke="#76567b" strokeWidth="4" opacity=".65" />
        </pattern>
        <pattern id="floor-stone" width="82" height="82" patternUnits="userSpaceOnUse">
          <rect width="82" height="82" fill="#9894a4" />
          <path d="M0 32h82M0 61h82M28 0v32M58 32v29M20 61v21" stroke="#5c5b67" strokeWidth="4" opacity=".55" />
        </pattern>
        <pattern id="floor-metal" width="80" height="80" patternUnits="userSpaceOnUse">
          <rect width="80" height="80" fill="#8996aa" />
          <path d="M0 20h80M0 60h80M20 0v80M60 0v80" stroke="#404a5d" strokeWidth="4" opacity=".5" />
          <circle cx="20" cy="20" r="3" fill="#3a4352" />
          <circle cx="60" cy="60" r="3" fill="#3a4352" />
        </pattern>
        <pattern id="floor-sand" width="90" height="90" patternUnits="userSpaceOnUse">
          <rect width="90" height="90" fill="#c4ad75" />
          <path d="M10 24c18-10 38-9 60 2M18 66c20-8 38-7 55 2" stroke="#8f7a4f" strokeWidth="4" opacity=".45" />
          <circle cx="20" cy="47" r="4" fill="#8f7a4f" opacity=".45" />
          <circle cx="72" cy="38" r="3" fill="#8f7a4f" opacity=".45" />
        </pattern>
        <pattern id="murdoku-floor-wood-brown" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="#9c6038" />
          <path d="M0 28h100M0 62h100M25 0v28M72 28v34M41 62v38" stroke="#4a2b1a" strokeWidth="4" opacity=".62" />
          <path d="M13 18c18-12 42-12 68 0M9 82c23-9 48-10 77-2" stroke="#c68a55" strokeWidth="3" opacity=".45" />
        </pattern>
        <pattern id="murdoku-floor-wood-dark" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="#6f526c" />
          <path d="M0 28h100M0 62h100M25 0v28M72 28v34M41 62v38" stroke="#3e3042" strokeWidth="4" opacity=".62" />
          <path d="M12 18c18-8 42-8 70 1M9 82c23-8 48-8 77-1" stroke="#8a728c" strokeWidth="3" opacity=".48" />
        </pattern>
        <pattern id="murdoku-floor-pink-planks" width="92" height="100" patternUnits="userSpaceOnUse">
          <rect width="92" height="100" fill="#e8bbc4" />
          <path d="M30 0v100M64 0v100M0 46h30M64 46h28" stroke="#c997a7" strokeWidth="4" opacity=".58" />
          <path d="M10 20c16-5 30-5 48 0M18 75c18-6 37-6 58 0" stroke="#f4d4db" strokeWidth="3" opacity=".42" />
        </pattern>
        <pattern id="murdoku-floor-blue-planks" width="92" height="100" patternUnits="userSpaceOnUse">
          <rect width="92" height="100" fill="#b7c6e6" />
          <path d="M30 0v100M64 0v100M0 46h30M64 46h28" stroke="#8798c5" strokeWidth="4" opacity=".6" />
          <path d="M10 20c16-5 30-5 48 0M18 75c18-6 37-6 58 0" stroke="#d7e2fb" strokeWidth="3" opacity=".4" />
        </pattern>
        <pattern id="murdoku-floor-yellow-tile" width="52" height="52" patternUnits="userSpaceOnUse">
          <rect width="52" height="52" fill="#f0d9a0" />
          <path d="M0 0h52v52H0zM26 0v52M0 26h52" fill="none" stroke="#be8958" strokeWidth="3" opacity=".62" />
          <path d="M0 26h26v26H0zM26 0h26v26H26z" fill="#f8e9bd" opacity=".58" />
        </pattern>
        <pattern id="murdoku-floor-mint-tile" width="52" height="52" patternUnits="userSpaceOnUse">
          <rect width="52" height="52" fill="#b9ded8" />
          <path d="M0 0h52v52H0zM26 0v52M0 26h52" fill="none" stroke="#84aaa7" strokeWidth="3" opacity=".62" />
          <path d="M0 26h26v26H0zM26 0h26v26H26z" fill="#d5eeee" opacity=".56" />
        </pattern>
        <pattern id="murdoku-floor-checker-pink" width="80" height="80" patternUnits="userSpaceOnUse">
          <rect width="80" height="80" fill="#e7bcc4" />
          <rect width="40" height="40" fill="#d99ba6" />
          <rect x="40" y="40" width="40" height="40" fill="#d99ba6" />
        </pattern>
        <pattern id="murdoku-floor-checker-blue" width="80" height="80" patternUnits="userSpaceOnUse">
          <rect width="80" height="80" fill="#c9dbe8" />
          <rect width="40" height="40" fill="#9fbdd0" />
          <rect x="40" y="40" width="40" height="40" fill="#9fbdd0" />
        </pattern>
        <pattern id="murdoku-floor-checker-lavender" width="80" height="80" patternUnits="userSpaceOnUse">
          <rect width="80" height="80" fill="#b7a4d4" />
          <rect width="40" height="40" fill="#a58cc6" />
          <rect x="40" y="40" width="40" height="40" fill="#a58cc6" />
        </pattern>
        <pattern id="murdoku-floor-grass-green" width="90" height="90" patternUnits="userSpaceOnUse">
          <rect width="90" height="90" fill="#88b87b" />
          <path d="M12 28c18-7 36-7 56 0M20 66c19-8 37-8 58 0" stroke="#5f8b56" strokeWidth="4" opacity=".5" />
          <path d="M20 18l8-12M43 42l8-12M69 72l8-12" stroke="#b6d9a4" strokeWidth="4" strokeLinecap="round" opacity=".55" />
        </pattern>
        <pattern id="murdoku-floor-sand-yellow" width="90" height="90" patternUnits="userSpaceOnUse">
          <rect width="90" height="90" fill="#d0b879" />
          <path d="M10 24c18-10 38-9 60 2M18 66c20-8 38-7 55 2" stroke="#967f51" strokeWidth="4" opacity=".48" />
          <circle cx="20" cy="47" r="4" fill="#967f51" opacity=".44" />
          <circle cx="72" cy="38" r="3" fill="#967f51" opacity=".44" />
        </pattern>
        <pattern id="murdoku-floor-water-blue" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="#86b6d6" />
          <path d="M8 32c18-10 36-10 54 0s28 10 45 0M-5 70c20-11 42-11 64 0s34 11 55 0" stroke="#d8eef8" strokeWidth="5" strokeLinecap="round" opacity=".66" />
        </pattern>
        <pattern id="murdoku-floor-path-purple" width="92" height="100" patternUnits="userSpaceOnUse">
          <rect width="92" height="100" fill="#a8789d" />
          <path d="M30 0v100M64 0v100M0 46h30M64 46h28" stroke="#835b80" strokeWidth="4" opacity=".56" />
          <path d="M10 22c16-6 32-6 52 1M18 75c16-5 34-5 54 0" stroke="#bd91b2" strokeWidth="3" opacity=".42" />
        </pattern>
        <pattern id="murdoku-floor-stone-purple" width="86" height="86" patternUnits="userSpaceOnUse">
          <rect width="86" height="86" fill="#a27aa0" />
          <path d="M0 32h86M0 62h86M28 0v32M58 32v30M20 62v24" stroke="#765a79" strokeWidth="4" opacity=".62" />
        </pattern>
        <pattern id="murdoku-floor-stone-dark" width="86" height="86" patternUnits="userSpaceOnUse">
          <rect width="86" height="86" fill="#715a72" />
          <path d="M0 32h86M0 62h86M28 0v32M58 32v30M20 62v24" stroke="#4e3c52" strokeWidth="4" opacity=".66" />
        </pattern>
        <pattern id="murdoku-floor-carpet-pink" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="#f18d99" />
          <rect x="8" y="8" width="84" height="84" fill="none" stroke="#c56b78" strokeWidth="5" />
          <rect x="18" y="18" width="64" height="64" fill="none" stroke="#ffc3c8" strokeWidth="4" opacity=".75" />
        </pattern>
        <pattern id="murdoku-floor-carpet-lavender" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="#aaa2ef" />
          <rect x="8" y="8" width="84" height="84" fill="none" stroke="#63598f" strokeWidth="5" />
          <rect x="18" y="18" width="64" height="64" fill="none" stroke="#d5cdfc" strokeWidth="4" opacity=".78" />
        </pattern>
        <pattern id="floor-surprise-mint" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="#93dfd0" />
          <path d="M30 0v100M72 0v100M0 48h30M72 48h28" stroke="#62bfb4" strokeWidth="4" opacity=".55" />
          <path d="M8 0v100M52 0v100" stroke="#baf2e7" strokeWidth="3" opacity=".38" />
        </pattern>
        <pattern id="floor-surprise-living" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="#b8c6da" />
          <path d="M33 0v100M75 0v100M0 50h33M75 50h25" stroke="#8194ac" strokeWidth="4" opacity=".55" />
          <path d="M10 0v100M55 0v100" stroke="#d6e1ef" strokeWidth="3" opacity=".36" />
        </pattern>
        <pattern id="floor-surprise-bath" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="#cbdcf0" />
          <rect width="50" height="50" fill="#96b3ce" opacity=".82" />
          <rect x="50" y="50" width="50" height="50" fill="#96b3ce" opacity=".82" />
        </pattern>
        <pattern id="floor-surprise-dining" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="#a8e4b6" />
          <path d="M34 0v100M76 0v100M0 50h34M76 50h24" stroke="#79c78d" strokeWidth="4" opacity=".52" />
          <path d="M12 0v100M57 0v100" stroke="#c6f4ce" strokeWidth="3" opacity=".35" />
        </pattern>
        <pattern id="floor-surprise-kitchen" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="#b7e7b9" />
          <rect width="50" height="50" fill="#9bd49e" opacity=".78" />
          <rect x="50" y="50" width="50" height="50" fill="#9bd49e" opacity=".78" />
        </pattern>
        </defs>

        <rect x="0" y="0" width={width} height={height} fill="#0b090b" />

        {caseDef.cells.map((cell) => (
          <g key={cell.id}>
            <rect
              x={cell.column * cellSize}
              y={cell.row * cellSize}
              width={cellSize}
              height={cellSize}
              fill={barbershopFloorFill(cell.room) ?? floorFillForRoom(cell.room)}
            />
            {!barbershop ? (
              <rect
                x={cell.column * cellSize}
                y={cell.row * cellSize}
                width={cellSize}
                height={cellSize}
                fill={roomTint(cell.room)}
              />
            ) : null}
          </g>
        ))}

        {barbershop ? (
          <BarbershopDecorations />
        ) : caseDef.scene ? (
          <>
            {caseDef.scene.floorOverlays.map((overlay) => (
              <SceneFloorOverlay key={overlay.id} overlay={overlay} />
            ))}
            <SceneFloorEdges overlays={caseDef.scene.floorOverlays} />
            {caseDef.scene.objects.map((object) => (
              <g className="scene-object" data-scene-object={object.object} key={object.id}>
                <DrawObject
                  cell={{
                    id: `${object.row}-${object.column}`,
                    row: object.row,
                    column: object.column,
                    object: object.object
                  }}
                />
              </g>
            ))}
          </>
        ) : (
          caseDef.cells.map((cell) => {
            const object = decorativeObjectFor(cell);
            return object ? <DrawObject key={`${cell.id}-decor`} cell={{ ...cell, object }} /> : null;
          })
        )}

        {Array.from({ length: caseDef.size.columns + 1 }, (_, column) => (
          <line
            key={`column-${column}`}
            x1={column * cellSize}
            y1="0"
            x2={column * cellSize}
            y2={height}
            className="board-grid-line"
          />
        ))}
        {Array.from({ length: caseDef.size.rows + 1 }, (_, row) => (
          <line key={`row-${row}`} x1="0" y1={row * cellSize} x2={width} y2={row * cellSize} className="board-grid-line" />
        ))}

        {walls.map((segment) => (
          <line
            key={segment.key}
            x1={segment.x1}
            y1={segment.y1}
            x2={segment.x2}
            y2={segment.y2}
            className="board-room-line"
          />
        ))}

        <rect x="0" y="0" width={width} height={height} className="board-outer-line" />
      </svg>

      <svg className="board-label-layer" viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
        {roomLabels.map((label) => (
          <text
            className="board-room-label"
            key={label.key}
            x={label.x}
            y={label.y}
            textAnchor="middle"
          >
            {label.label}
          </text>
        ))}
      </svg>
    </>
  );
}
