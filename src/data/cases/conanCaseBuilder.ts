import type {
  CaseDefinition,
  CaseScene,
  CellDefinition,
  ClueConstraint,
  Difficulty,
  GridSize,
  Placement,
  Suspect
} from '../../game/types';
import { createGrid } from './grid';

export interface ConanSuspectConfig {
  id: string;
  name: string;
  accent: string;
  portraitKey?: string;
  gender?: Suspect['gender'];
  object?: string;
  room: string;
  solutionCell: `${number}-${number}`;
  clue: string | string[];
}

export interface ConanCaseConfig {
  id: string;
  title: string;
  difficulty: Difficulty;
  size: number | GridSize;
  intro: string;
  culpritLabel?: string;
  culpritId?: string;
  rooms: [string, string, string, string, ...string[]];
  roomLayout?: string[];
  cellObjects?: Partial<Record<`${number}-${number}`, string>>;
  scene?: CaseScene;
  clueConstraints?: ClueConstraint[];
  generalClues?: string[];
  keyItems?: string[];
  support: string;
  suspects: ConanSuspectConfig[];
}

function resolveSize(size: ConanCaseConfig['size']): GridSize {
  return typeof size === 'number' ? { rows: size, columns: size } : size;
}

function parseRoomLayout(layout: string[] | undefined, size: GridSize): string[][] | undefined {
  if (!layout) return undefined;
  if (layout.length !== size.rows) throw new Error(`roomLayout has ${layout.length} rows, expected ${size.rows}`);

  return layout.map((row, index) => {
    const rooms = row.trim().split(/\s+/);
    if (rooms.length !== size.columns) {
      throw new Error(`roomLayout row ${index + 1} has ${rooms.length} columns, expected ${size.columns}`);
    }
    return rooms;
  });
}

function roomForCell(
  row: number,
  column: number,
  size: GridSize,
  rooms: ConanCaseConfig['rooms'],
  roomLayout: string[][] | undefined
): string {
  if (roomLayout) return roomLayout[row][column];

  const rowSplit = Math.ceil(size.rows / 2);
  const columnSplit = Math.ceil(size.columns / 2);
  if (row < rowSplit && column < columnSplit) return rooms[0];
  if (row < rowSplit) return rooms[1];
  if (column < columnSplit) return rooms[2];
  return rooms[3];
}

function solutionByCell(suspects: ConanSuspectConfig[]): Record<string, ConanSuspectConfig> {
  return Object.fromEntries(suspects.map((suspect) => [suspect.solutionCell, suspect]));
}

function clueTextForSuspect(suspect: ConanSuspectConfig, constraints: ClueConstraint[] | undefined): string[] {
  const clueTexts = constraints
    ?.filter((constraint) => constraint.suspectId === suspect.id)
    .map((constraint) => constraint.text)
    .filter((text): text is string => Boolean(text));

  return clueTexts && clueTexts.length > 0 ? clueTexts : Array.isArray(suspect.clue) ? suspect.clue : [suspect.clue];
}

export function buildConanCase(config: ConanCaseConfig): CaseDefinition {
  const byCell = solutionByCell(config.suspects);
  const size = resolveSize(config.size);
  const roomLayout = parseRoomLayout(config.roomLayout, size);
  const cells = createGrid(size.rows, size.columns, (cell): Partial<CellDefinition> => ({
    room: roomForCell(cell.row, cell.column, size, config.rooms, roomLayout),
    object: config.cellObjects?.[cell.id] ?? byCell[cell.id]?.object
  }));
  const suspects: Suspect[] = config.suspects.map((suspect, index) => ({
    id: suspect.id,
    name: suspect.name,
    accent: suspect.accent,
    portraitKey: suspect.portraitKey ?? `${config.id}-${String.fromCharCode(97 + index)}`,
    gender: suspect.gender,
    clues: clueTextForSuspect(suspect, config.clueConstraints)
  }));
  const solution: Placement[] = config.suspects.map((suspect) => ({
    suspectId: suspect.id,
    cellId: suspect.solutionCell
  }));

  return {
    id: config.id,
    title: config.title,
    difficulty: config.difficulty,
    size,
    intro: config.intro,
    culpritLabel: config.culpritLabel,
    victimId: suspects[suspects.length - 1].id,
    murdererId: config.culpritId ?? suspects[Math.min(2, suspects.length - 2)].id,
    cells,
    suspects,
    solution,
    clueConstraints: config.clueConstraints ?? [],
    generalClues: config.generalClues ?? [],
    keyItems: config.keyItems ?? [],
    scene: config.scene
  };
}
