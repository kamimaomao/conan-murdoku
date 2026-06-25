import { type CSSProperties, type DragEvent, type PointerEvent, useMemo, useRef, useState } from 'react';
import { conanHeaderBanner, conanLogo, roomVisualFor, supportPortraitsFor, suspectPortraitFor } from './assets/conanAssets';
import { BoardObjectSvg, BoardSvgArt } from './components/BoardSvgArt';
import { cases, casesById } from './data/cases';
import {
  applyAnswer,
  applyCellAction,
  applyHint,
  createInitialGameState,
  moveSuspect,
  selectSuspect,
  setTool,
  undo
} from './game/board';
import { loadProgress, saveProgress, type ProgressState } from './game/storage';
import type { BoardState, CaseDefinition, CellDefinition, GameState, Suspect, Tool, ValidationResult } from './game/types';
import { validateBoard } from './game/validation';
import {
  caseBriefing,
  caseTitle,
  cellLabel as zhCellLabel,
  difficultyLabels,
  issueText as zhIssueText,
  objectName,
  roomName,
  suspectClues,
  toolLabels,
  uiText
} from './i18n/zhHans';

function boardKey(board: BoardState): string {
  return JSON.stringify(board);
}

function suspectForCell(caseDef: CaseDefinition, board: BoardState, cellId: CellDefinition['id']): Suspect | undefined {
  const suspectId = board.placements[cellId];
  return suspectId ? caseDef.suspects.find((suspect) => suspect.id === suspectId) : undefined;
}

function cellLabel(cell: CellDefinition, suspect: Suspect | undefined, marked: boolean | undefined): string {
  return zhCellLabel(cell.row, cell.column, suspect?.name, marked);
}

function toolLabel(tool: Tool): string {
  return toolLabels[tool];
}

function cellPositionKey(row: number, column: number): string {
  return `${row}-${column}`;
}

function roomEdgeClasses(cell: CellDefinition, cellsByPosition: Map<string, CellDefinition>): string[] {
  const room = cell.room ?? '';
  const directions = [
    ['n', -1, 0],
    ['e', 0, 1],
    ['s', 1, 0],
    ['w', 0, -1]
  ] as const;

  return directions.flatMap(([edge, rowOffset, columnOffset]) => {
    const neighbor = cellsByPosition.get(cellPositionKey(cell.row + rowOffset, cell.column + columnOffset));
    return !neighbor || (neighbor.room ?? '') !== room ? [`room-edge-${edge}`] : [];
  });
}

function clueReferencedObjects(caseDef: CaseDefinition): Set<string> {
  return new Set(caseDef.keyItems);
}

function firstSavedGame(progress: ProgressState): GameState {
  return progress.cases[cases[0].id]?.state ?? createInitialGameState(cases[0].id);
}

interface DragIntent {
  suspectId: string;
  sourceCellId: CellDefinition['id'];
  startX: number;
  startY: number;
}

export default function App() {
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress());
  const [game, setGame] = useState<GameState>(() => firstSavedGame(loadProgress()));
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [revealedCellId, setRevealedCellId] = useState<CellDefinition['id'] | undefined>();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const dragIntentRef = useRef<DragIntent | null>(null);
  const skipNextClickRef = useRef(false);
  const currentCase = casesById[game.caseId] ?? cases[0];
  const selectedSuspect = currentCase.suspects.find((suspect) => suspect.id === game.selectedSuspectId);
  const selectedPortrait = suspectPortraitFor(selectedSuspect);
  const supportPortraits = supportPortraitsFor(currentCase.id);
  const completed = Boolean(progress.cases[currentCase.id]?.completed);
  const visibleObjects = useMemo(() => clueReferencedObjects(currentCase), [currentCase]);
  const cellsByPosition = useMemo(
    () => new Map(currentCase.cells.map((cell) => [cellPositionKey(cell.row, cell.column), cell])),
    [currentCase]
  );
  const placedCount = useMemo(
    () => Object.values(game.board.placements).filter(Boolean).length,
    [game.board.placements]
  );

  function persist(nextGame: GameState, completedCase?: boolean) {
    setProgress((previous) => {
      const next = {
        cases: {
          ...previous.cases,
          [nextGame.caseId]: {
            state: nextGame,
            completed: completedCase ?? previous.cases[nextGame.caseId]?.completed ?? false
          }
        }
      };
      saveProgress(next);
      return next;
    });
  }

  function updateGame(nextGame: GameState, clearResult = true) {
    const boardChanged = boardKey(nextGame.board) !== boardKey(game.board);
    setGame(nextGame);
    persist(nextGame, boardChanged ? false : undefined);
    if (clearResult && boardChanged) {
      setValidation(null);
      setStatusMessage(null);
    }
  }

  function chooseCase(caseId: string) {
    const saved = progress.cases[caseId]?.state;
    setGame(saved ?? createInitialGameState(caseId));
    setValidation(null);
    setRevealedCellId(undefined);
    setStatusMessage(null);
  }

  function submitAccusation() {
    const result = validateBoard(currentCase, game.board);
    setValidation(result);
    persist(game, result.solved);
  }

  function issueText(result: ValidationResult): string {
    if (result.solved) {
      const murderer = currentCase.suspects.find((suspect) => suspect.id === currentCase.murdererId)?.name;
      const culpritPrefix = currentCase.culpritLabel ? `${currentCase.culpritLabel}是` : uiText.murdererPrefix;
      return `${uiText.caseClosed}${culpritPrefix} ${murderer}。`;
    }
    return zhIssueText(result.issues[0]);
  }

  function handleCellClick(cellId: CellDefinition['id']) {
    if (skipNextClickRef.current) {
      skipNextClickRef.current = false;
      return;
    }
    setRevealedCellId(cellId);
    updateGame(applyCellAction(game, cellId));
  }

  function handleCellPointerDown(event: PointerEvent<HTMLButtonElement>, cellId: CellDefinition['id'], suspect: Suspect | undefined) {
    if (!suspect) return;
    dragIntentRef.current = {
      suspectId: suspect.id,
      sourceCellId: cellId,
      startX: event.clientX,
      startY: event.clientY
    };
  }

  function handleCellPointerUp(event: PointerEvent<HTMLButtonElement>, cellId: CellDefinition['id']) {
    const intent = dragIntentRef.current;
    dragIntentRef.current = null;
    if (!intent || intent.sourceCellId === cellId) return;

    const movedEnough = Math.hypot(event.clientX - intent.startX, event.clientY - intent.startY) > 8;
    if (!movedEnough) return;

    skipNextClickRef.current = true;
    setRevealedCellId(cellId);
    updateGame(moveSuspect(game, intent.suspectId, cellId));
  }

  function handleCellDragStart(event: DragEvent<HTMLButtonElement>, suspect: Suspect | undefined) {
    if (!suspect) return;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', suspect.id);
  }

  function handleCellDrop(event: DragEvent<HTMLButtonElement>, cellId: CellDefinition['id']) {
    event.preventDefault();
    const suspectId = event.dataTransfer.getData('text/plain');
    if (!suspectId || !currentCase.suspects.some((suspect) => suspect.id === suspectId)) return;
    setRevealedCellId(cellId);
    updateGame(moveSuspect(game, suspectId, cellId));
  }

  function confirmSelectedPosition() {
    if (!selectedSuspect) {
      setStatusMessage(uiText.chooseSuspectForHint);
      return;
    }
    updateGame(applyHint(currentCase, game));
    setStatusMessage(`${selectedSuspect.name}${uiText.hintConfirmed}`);
  }

  function showAnswer() {
    updateGame(applyAnswer(currentCase, game));
    setStatusMessage(uiText.answerRevealed);
  }

  return (
    <main className="app-shell" aria-label={uiText.appLabel}>
      <header className="case-header">
        <img className="legacy-brand-logo" src={conanLogo} alt="" aria-hidden="true" />
        <img className="brand-banner" src={conanHeaderBanner} alt="名侦探柯南" decoding="async" />
        <div className="case-title-row">
          <h1>{caseTitle(currentCase)}</h1>
          <div className="case-meta" aria-label={uiText.caseProgress}>
            <span>{difficultyLabels[currentCase.difficulty]}</span>
            <span>
              {placedCount}/{currentCase.suspects.length}
            </span>
          </div>
        </div>
      </header>

      <section className="case-strip" aria-label={uiText.cases}>
        {cases.map((caseDef, index) => (
          <button
            className={caseDef.id === currentCase.id ? 'case-chip active' : 'case-chip'}
            key={caseDef.id}
            onClick={() => chooseCase(caseDef.id)}
            type="button"
          >
            <span>{index + 1}</span>
            {progress.cases[caseDef.id]?.completed ? uiText.closed : difficultyLabels[caseDef.difficulty]}
          </button>
        ))}
      </section>

      <section className="briefing" aria-label={uiText.briefing}>
        {supportPortraits.length > 0 ? (
          <div className={supportPortraits.length > 1 ? 'support-portrait-list multi' : 'support-portrait-list'}>
            {supportPortraits.map((portrait) => (
              <img className="support-portrait" src={portrait} alt="" aria-hidden="true" key={portrait} />
            ))}
          </div>
        ) : null}
        <div className="briefing-copy">
          <p>{caseBriefing(currentCase)}</p>
          {currentCase.generalClues.length > 0 ? (
            <ul className="general-clues">
              {currentCase.generalClues.map((clue) => (
                <li key={clue}>{clue}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      <section
        className="board"
        aria-label={uiText.board}
        style={{ gridTemplateColumns: `repeat(${currentCase.size.columns}, minmax(0, 1fr))` }}
      >
        <BoardSvgArt caseDef={currentCase} />
        {currentCase.cells.map((cell) => {
          const suspect = suspectForCell(currentCase, game.board, cell.id);
          const marked = game.board.marks[cell.id];
          const visibleObject = currentCase.scene ? undefined : cell.object && visibleObjects.has(cell.object) ? cell.object : undefined;
          const roomVisual = roomVisualFor(cell.room);
          const cellClass = [
            'board-cell',
            roomVisual.className,
            ...roomEdgeClasses(cell, cellsByPosition),
            revealedCellId === cell.id ? 'labels-revealed' : '',
            visibleObject ? 'has-object' : '',
            suspect ? 'occupied' : marked ? 'marked' : ''
          ]
            .filter(Boolean)
            .join(' ');

          const cellStyle = {
            '--accent': suspect?.accent,
            '--terrain': `url(${roomVisual.textureAsset})`
          } as CSSProperties;

          return (
            <button
              aria-label={cellLabel(cell, suspect, marked)}
              className={cellClass}
              draggable={Boolean(suspect)}
              key={cell.id}
              onClick={() => handleCellClick(cell.id)}
              onDragOver={(event) => event.preventDefault()}
              onDragStart={(event) => handleCellDragStart(event, suspect)}
              onDrop={(event) => handleCellDrop(event, cell.id)}
              onPointerDown={(event) => handleCellPointerDown(event, cell.id, suspect)}
              onPointerUp={(event) => handleCellPointerUp(event, cell.id)}
              style={cellStyle}
              type="button"
            >
              {visibleObject ? (
                <span className="cell-object">{objectName(visibleObject)}</span>
              ) : (
                <span className="cell-room">{roomName(cell.room)}</span>
              )}
              {visibleObject ? (
                <BoardObjectSvg object={visibleObject} />
              ) : null}
              {marked ? <span className="cell-mark">X</span> : null}
              {suspect ? (
                <img className="cell-suspect-photo" src={suspectPortraitFor(suspect)} alt="" aria-hidden="true" />
              ) : null}
            </button>
          );
        })}
      </section>

      <section className="clue-panel" aria-label={uiText.clues}>
        <div className="selected-row">
          {selectedPortrait ? (
            <img className="avatar portrait-avatar" src={selectedPortrait} alt="" aria-hidden="true" />
          ) : (
            <div className="avatar" style={{ '--accent': selectedSuspect?.accent } as CSSProperties}>
              ?
            </div>
          )}
          <div>
            <p className="eyebrow">{selectedSuspect ? uiText.selectedSuspect : uiText.noSuspectSelected}</p>
            <h2>{selectedSuspect?.name ?? uiText.chooseSuspect}</h2>
          </div>
        </div>
        <ul>
          {(selectedSuspect ? suspectClues(currentCase.id, selectedSuspect) : [uiText.chooseHint]).map((clue) => (
            <li key={clue}>{clue}</li>
          ))}
        </ul>
      </section>

      <section className="suspect-dock" aria-label={uiText.suspects}>
        {currentCase.suspects.map((suspect) => {
          const isSelected = suspect.id === game.selectedSuspectId;
          const isPlaced = Object.values(game.board.placements).includes(suspect.id);

          return (
            <button
              className={isSelected ? 'suspect-token active' : 'suspect-token'}
              key={suspect.id}
              onClick={() => updateGame(selectSuspect(game, suspect.id), false)}
              style={{ '--accent': suspect.accent } as CSSProperties}
              type="button"
            >
              <img className="avatar portrait-avatar" src={suspectPortraitFor(suspect)} alt="" aria-hidden="true" />
              <span>{suspect.name}</span>
              {isPlaced ? <span className="placed-dot" aria-label={uiText.placed} /> : null}
            </button>
          );
        })}
      </section>

      <footer className="tool-dock">
        {(['place', 'x', 'erase'] as Tool[]).map((tool) => (
          <button
            aria-label={toolLabel(tool)}
            className={game.activeTool === tool ? 'tool-button active' : 'tool-button'}
            key={tool}
            onClick={() => updateGame(setTool(game, tool), false)}
            type="button"
          >
            {tool === 'x' ? 'X' : toolLabel(tool)}
          </button>
        ))}
        <button className="tool-button" disabled={game.undoStack.length === 0} onClick={() => updateGame(undo(game))} type="button">
          {uiText.undo}
        </button>
        <button className="tool-button" onClick={confirmSelectedPosition} type="button">
          {uiText.hint}
        </button>
        <button className="tool-button" onClick={showAnswer} type="button">
          {uiText.answer}
        </button>
        <button className="accuse-button" onClick={submitAccusation} type="button">
          {uiText.accuse}
        </button>
      </footer>

      <section className={validation?.solved || completed ? 'result solved' : 'result'} role="status" aria-live="polite">
        {validation
          ? issueText(validation)
          : completed
            ? uiText.caseClosed
            : statusMessage ?? `${toolLabel(game.activeTool)}${uiText.modeSuffix}`}
      </section>
    </main>
  );
}
