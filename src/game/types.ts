export type Difficulty = 'very-easy' | 'easy' | 'medium' | 'hard' | 'expert';

export type Tool = 'place' | 'x' | 'erase';

export type CellId = `${number}-${number}`;
export type SuspectId = string;

export interface GridSize {
  rows: number;
  columns: number;
}

export interface CellDefinition {
  id: CellId;
  row: number;
  column: number;
  room?: string;
  object?: string;
  blocked?: boolean;
}

export interface SceneOverlay {
  id: string;
  kind: 'carpet' | 'floor';
  row: number;
  column: number;
  rowSpan?: number;
  columnSpan?: number;
  variant?: string;
}

export interface SceneObject {
  id: string;
  object: string;
  row: number;
  column: number;
  rowSpan?: number;
  columnSpan?: number;
  variant?: string;
}

export interface CaseScene {
  floorOverlays: SceneOverlay[];
  objects: SceneObject[];
}

export interface Suspect {
  id: SuspectId;
  name: string;
  accent: string;
  portraitKey: string;
  clues: string[];
  gender?: 'female' | 'male';
}

export interface Placement {
  suspectId: SuspectId;
  cellId: CellId;
}

export type Direction = 'north' | 'south' | 'east' | 'west' | 'northeast' | 'southeast';

interface ClueConstraintText {
  text?: string;
}

export type ClueConstraint =
  | ({ type: 'text'; suspectId: SuspectId; object?: string; objects?: string[] } & ClueConstraintText)
  | ({ type: 'in-room'; suspectId: SuspectId; rooms: string[]; negate?: boolean } & ClueConstraintText)
  | ({ type: 'on-object'; suspectId: SuspectId; object: string; negate?: boolean } & ClueConstraintText)
  | ({ type: 'beside-object'; suspectId: SuspectId; object: string; negate?: boolean; rooms?: string[]; alone?: boolean } & ClueConstraintText)
  | ({ type: 'in-room-and-not-beside-object'; suspectId: SuspectId; rooms: string[]; object: string } & ClueConstraintText)
  | ({ type: 'either-beside-object'; suspectId: SuspectId; objects: string[] } & ClueConstraintText)
  | ({ type: 'only-on-object'; suspectId: SuspectId; object: string } & ClueConstraintText)
  | ({ type: 'direction-of'; suspectId: SuspectId; targetSuspectId: SuspectId; direction: Direction; exactRows?: number } & ClueConstraintText)
  | ({ type: 'same-room-as'; suspectId: SuspectId; targetSuspectId: SuspectId; negate?: boolean } & ClueConstraintText)
  | ({ type: 'same-diagonal-as'; suspectId: SuspectId; targetSuspectId: SuspectId } & ClueConstraintText)
  | ({ type: 'column-offset-of'; suspectId: SuspectId; targetSuspectId: SuspectId; offset: number } & ClueConstraintText)
  | ({ type: 'row'; suspectId: SuspectId; row: number } & ClueConstraintText)
  | ({ type: 'column'; suspectId: SuspectId; column: number } & ClueConstraintText)
  | ({ type: 'not-corner'; suspectId: SuspectId } & ClueConstraintText)
  | ({ type: 'alone-with-victim'; suspectId: SuspectId; victimId?: SuspectId } & ClueConstraintText);

export interface CaseDefinition {
  id: string;
  title: string;
  difficulty: Difficulty;
  size: GridSize;
  intro: string;
  culpritLabel?: string;
  victimId: SuspectId;
  murdererId: SuspectId;
  cells: CellDefinition[];
  suspects: Suspect[];
  solution: Placement[];
  clueConstraints: ClueConstraint[];
  generalClues: string[];
  keyItems: string[];
  scene?: CaseScene;
}

export interface BoardState {
  placements: Record<CellId, SuspectId | undefined>;
  marks: Record<CellId, boolean | undefined>;
}

export interface GameState {
  caseId: string;
  selectedSuspectId?: SuspectId;
  activeTool: Tool;
  board: BoardState;
  undoStack: BoardState[];
}

export type ValidationIssue =
  | { type: 'incomplete'; message: string }
  | { type: 'duplicate-suspect'; suspectId: SuspectId; message: string }
  | { type: 'duplicate-row'; row: number; suspectId: SuspectId; message: string }
  | { type: 'duplicate-column'; column: number; suspectId: SuspectId; message: string }
  | { type: 'clue-violation'; suspectId: SuspectId; message: string }
  | { type: 'wrong-placement'; suspectId: SuspectId; message: string };

export interface ValidationResult {
  solved: boolean;
  issues: ValidationIssue[];
}
