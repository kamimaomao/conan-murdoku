import type { CaseDefinition, CellDefinition, Difficulty, Placement, Suspect } from '../../game/types';
import { createGrid } from './grid';

export interface ConanSuspectConfig {
  id: string;
  name: string;
  accent: string;
  object: string;
  room: string;
  solutionCell: `${number}-${number}`;
  clue: string;
}

export interface ConanCaseConfig {
  id: string;
  title: string;
  difficulty: Difficulty;
  size: number;
  intro: string;
  rooms: [string, string, string, string];
  support: string;
  suspects: ConanSuspectConfig[];
}

function roomForCell(row: number, column: number, size: number, rooms: ConanCaseConfig['rooms']): string {
  const split = Math.ceil(size / 2);
  if (row < split && column < split) return rooms[0];
  if (row < split) return rooms[1];
  if (column < split) return rooms[2];
  return rooms[3];
}

function solutionByCell(suspects: ConanSuspectConfig[]): Record<string, ConanSuspectConfig> {
  return Object.fromEntries(suspects.map((suspect) => [suspect.solutionCell, suspect]));
}

export function buildConanCase(config: ConanCaseConfig): CaseDefinition {
  const byCell = solutionByCell(config.suspects);
  const cells = createGrid(config.size, config.size, (cell): Partial<CellDefinition> => ({
    room: roomForCell(cell.row, cell.column, config.size, config.rooms),
    object: byCell[cell.id]?.object
  }));
  const suspects: Suspect[] = config.suspects.map((suspect, index) => ({
    id: suspect.id,
    name: suspect.name,
    accent: suspect.accent,
    portraitKey: `${config.id}-${String.fromCharCode(97 + index)}`,
    clues: [suspect.clue, `${config.support}确认：${suspect.name}与${suspect.room}有关。`]
  }));
  const solution: Placement[] = config.suspects.map((suspect) => ({
    suspectId: suspect.id,
    cellId: suspect.solutionCell
  }));

  return {
    id: config.id,
    title: config.title,
    difficulty: config.difficulty,
    size: { rows: config.size, columns: config.size },
    intro: config.intro,
    victimId: suspects[suspects.length - 1].id,
    murdererId: suspects[Math.min(2, suspects.length - 2)].id,
    cells,
    suspects,
    solution
  };
}
