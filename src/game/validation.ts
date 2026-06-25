import type { BoardState, CaseDefinition, CellDefinition, CellId, ClueConstraint, Direction, SuspectId, ValidationIssue, ValidationResult } from './types';

const solutionMap = (caseDef: CaseDefinition): Record<SuspectId, CellId> =>
  Object.fromEntries(caseDef.solution.map((placement) => [placement.suspectId, placement.cellId]));

const cellMap = (caseDef: CaseDefinition) => Object.fromEntries(caseDef.cells.map((cell) => [cell.id, cell]));

function placedCell(
  cellsById: Record<string, CellDefinition>,
  placedEntries: [CellId, SuspectId][],
  suspectId: SuspectId
): CellDefinition | undefined {
  const cellId = placedEntries.find(([, placedSuspectId]) => placedSuspectId === suspectId)?.[0];
  return cellId ? cellsById[cellId] : undefined;
}

function sameRoom(cell: CellDefinition | undefined, other: CellDefinition | undefined): boolean {
  return Boolean(cell?.room && cell.room === other?.room);
}

function isBeside(cell: CellDefinition, other: CellDefinition): boolean {
  return sameRoom(cell, other) && Math.abs(cell.row - other.row) + Math.abs(cell.column - other.column) === 1;
}

function hasObjectBeside(caseDef: CaseDefinition, cell: CellDefinition, object: string): boolean {
  return caseDef.cells.some((candidate) => candidate.object === object && isBeside(cell, candidate));
}

function directionMatches(cell: CellDefinition, target: CellDefinition, direction: Direction, exactRows: number | undefined): boolean {
  if (direction === 'north') {
    return exactRows === undefined ? cell.row < target.row : target.row - cell.row === exactRows;
  }
  if (direction === 'south') {
    return exactRows === undefined ? cell.row > target.row : cell.row - target.row === exactRows;
  }
  if (direction === 'west') return cell.column < target.column;
  if (direction === 'east') return cell.column > target.column;
  if (direction === 'northeast') return cell.row < target.row && cell.column > target.column;
  return cell.row > target.row && cell.column > target.column;
}

function isCorner(caseDef: CaseDefinition, cell: CellDefinition): boolean {
  return (
    (cell.row === 0 || cell.row === caseDef.size.rows - 1) &&
    (cell.column === 0 || cell.column === caseDef.size.columns - 1)
  );
}

function violatesConstraint(
  caseDef: CaseDefinition,
  cellsById: Record<string, CellDefinition>,
  placedEntries: [CellId, SuspectId][],
  constraint: ClueConstraint
): boolean {
  const cell = placedCell(cellsById, placedEntries, constraint.suspectId);
  if (!cell) return true;

  if (constraint.type === 'text') return false;

  if (constraint.type === 'in-room') {
    const matches = constraint.rooms.includes(cell.room ?? '');
    return constraint.negate ? matches : !matches;
  }

  if (constraint.type === 'on-object') {
    const matches = cell.object === constraint.object;
    return constraint.negate ? matches : !matches;
  }

  if (constraint.type === 'beside-object') {
    const matchesRoom = !constraint.rooms || constraint.rooms.includes(cell.room ?? '');
    const placedInRoom = placedEntries.filter(([cellId]) => cellsById[cellId]?.room === cell.room);
    const matchesAlone = !constraint.alone || placedInRoom.length === 1;
    const matches = matchesRoom && matchesAlone && hasObjectBeside(caseDef, cell, constraint.object);
    return constraint.negate ? matches : !matches;
  }

  if (constraint.type === 'in-room-and-not-beside-object') {
    return !constraint.rooms.includes(cell.room ?? '') || hasObjectBeside(caseDef, cell, constraint.object);
  }

  if (constraint.type === 'either-beside-object') {
    return !constraint.objects.some((object) => hasObjectBeside(caseDef, cell, object));
  }

  if (constraint.type === 'only-on-object') {
    if (cell.object !== constraint.object) return true;
    return placedEntries.some(([cellId, suspectId]) => suspectId !== constraint.suspectId && cellsById[cellId]?.object === constraint.object);
  }

  if (constraint.type === 'direction-of') {
    const target = placedCell(cellsById, placedEntries, constraint.targetSuspectId);
    return !target || !directionMatches(cell, target, constraint.direction, constraint.exactRows);
  }

  if (constraint.type === 'same-room-as') {
    const target = placedCell(cellsById, placedEntries, constraint.targetSuspectId);
    const matches = sameRoom(cell, target);
    return constraint.negate ? matches : !matches;
  }

  if (constraint.type === 'same-diagonal-as') {
    const target = placedCell(cellsById, placedEntries, constraint.targetSuspectId);
    return !target || Math.abs(cell.row - target.row) !== Math.abs(cell.column - target.column);
  }

  if (constraint.type === 'column-offset-of') {
    const target = placedCell(cellsById, placedEntries, constraint.targetSuspectId);
    return !target || cell.column - target.column !== constraint.offset;
  }

  if (constraint.type === 'row') return cell.row !== constraint.row;
  if (constraint.type === 'column') return cell.column !== constraint.column;
  if (constraint.type === 'not-corner') return isCorner(caseDef, cell);

  const victim = placedCell(cellsById, placedEntries, constraint.victimId ?? caseDef.victimId);
  if (!victim?.room) return true;
  const suspectsInVictimRoom = placedEntries.filter(([cellId]) => cellsById[cellId]?.room === victim.room);
  return suspectsInVictimRoom.length !== 2 || !suspectsInVictimRoom.some(([, suspectId]) => suspectId === caseDef.murdererId);
}

export function validateBoard(caseDef: CaseDefinition, board: BoardState): ValidationResult {
  const issues: ValidationIssue[] = [];
  const cellsById = cellMap(caseDef);
  const requiredSuspects = caseDef.suspects.map((suspect) => suspect.id);
  const placedEntries = Object.entries(board.placements).filter(
    (entry): entry is [CellId, SuspectId] => Boolean(entry[1])
  );

  for (const suspectId of requiredSuspects) {
    if (!placedEntries.some(([, placedSuspectId]) => placedSuspectId === suspectId)) {
      issues.push({ type: 'incomplete', message: 'Every suspect must be placed before submitting.' });
      return { solved: false, issues };
    }
  }

  const usedRows = new Map<number, SuspectId>();
  const usedColumns = new Map<number, SuspectId>();
  const usedSuspects = new Set<SuspectId>();

  for (const [cellId, suspectId] of placedEntries) {
    const cell = cellsById[cellId];
    if (!cell) continue;

    if (usedSuspects.has(suspectId)) {
      issues.push({
        type: 'duplicate-suspect',
        suspectId,
        message: 'Each suspect can only be placed once.'
      });
    }

    if (usedRows.has(cell.row)) {
      issues.push({
        type: 'duplicate-row',
        row: cell.row,
        suspectId,
        message: 'Only one suspect can occupy each row.'
      });
    }

    if (usedColumns.has(cell.column)) {
      issues.push({
        type: 'duplicate-column',
        column: cell.column,
        suspectId,
        message: 'Only one suspect can occupy each column.'
      });
    }

    usedRows.set(cell.row, suspectId);
    usedColumns.set(cell.column, suspectId);
    usedSuspects.add(suspectId);
  }

  if (issues.length > 0) return { solved: false, issues };

  for (const constraint of caseDef.clueConstraints) {
    if (violatesConstraint(caseDef, cellsById, placedEntries, constraint)) {
      issues.push({
        type: 'clue-violation',
        suspectId: constraint.suspectId,
        message: 'At least one clue is not true.'
      });
      break;
    }
  }

  if (issues.length > 0) return { solved: false, issues };

  const expected = solutionMap(caseDef);
  for (const suspectId of requiredSuspects) {
    const expectedCell = expected[suspectId];
    const actualCell = placedEntries.find(([, placedSuspectId]) => placedSuspectId === suspectId)?.[0];
    if (actualCell !== expectedCell) {
      issues.push({
        type: 'wrong-placement',
        suspectId,
        message: 'At least one suspect conflicts with the case evidence.'
      });
      break;
    }
  }

  return { solved: issues.length === 0, issues };
}
