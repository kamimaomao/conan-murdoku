import { describe, expect, it } from 'vitest';
import { cases } from '../../src/data/cases';
import { validateCaseData } from '../../src/data/cases/validateCases';
import { validateBoard } from '../../src/game/validation';
import { suspectClues } from '../../src/i18n/zhHans';

const originalCaseSpecs = [
  { original: 'The Flower Store', difficulty: 'easy', size: { rows: 7, columns: 7 }, suspects: 7, clueCount: 7, keyItems: ['bonsai', 'carpet', 'chair'] },
  { original: 'The Book Kiosk', difficulty: 'easy', size: { rows: 5, columns: 5 }, suspects: 5, clueCount: 5, keyItems: ['table', 'trashcan', 'shelf'] },
  { original: 'The Riding Lesson', difficulty: 'easy', size: { rows: 9, columns: 9 }, suspects: 9, clueCount: 9, keyItems: ['shrub', 'table', 'horse', 'puddle'] },
  { original: 'White Wedding', difficulty: 'medium', size: { rows: 9, columns: 9 }, suspects: 9, clueCount: 10, keyItems: ['table', 'plant', 'carpet', 'chair', 'tree'] },
  { original: 'Surprise Visitors', difficulty: 'medium', size: { rows: 9, columns: 9 }, suspects: 9, clueCount: 9, keyItems: ['tv', 'bed', 'table', 'plant', 'shelf', 'chair', 'carpet'] },
  { original: 'Freezing Rain', difficulty: 'medium', size: { rows: 9, columns: 9 }, suspects: 9, clueCount: 9, keyItems: ['bed', 'chair', 'puddle', 'carpet'] },
  { original: 'A Messy Situation', difficulty: 'hard', size: { rows: 9, columns: 9 }, suspects: 9, clueCount: 10, keyItems: ['puddle', 'tree', 'chair', 'table', 'shelf'] },
  { original: 'The Abandoned Museum', difficulty: 'hard', size: { rows: 9, columns: 9 }, suspects: 9, clueCount: 9, keyItems: ['chair', 'table', 'statue', 'rubble'] },
  { original: 'Date Night', difficulty: 'hard', size: { rows: 9, columns: 9 }, suspects: 9, clueCount: 10, keyItems: ['tree', 'statue', 'chair', 'table'] },
  { original: 'Minigolf', difficulty: 'hard', size: { rows: 10, columns: 10 }, suspects: 10, clueCount: 12, keyItems: ['flag', 'chair', 'sand', 'path', 'plant', 'table', 'barrel'] }
] as const;

describe('case data', () => {
  it('contains exactly 10 Conan cases', () => {
    expect(cases).toHaveLength(10);
  });

  it('uses unique ids', () => {
    const ids = new Set(cases.map((caseDef) => caseDef.id));

    expect(ids.size).toBe(10);
  });

  it('has internally valid data', () => {
    const errors = cases.flatMap(validateCaseData);

    expect(errors).toEqual([]);
  });

  it('solution placements solve every case', () => {
    for (const caseDef of cases) {
      const board = {
        placements: Object.fromEntries(caseDef.solution.map((placement) => [placement.cellId, placement.suspectId])),
        marks: {}
      };

      expect(validateBoard(caseDef, board).solved).toBe(true);
    }
  });

  it('matches the reselected original Murdoku online case specs', () => {
    expect(cases.map((caseDef) => caseDef.size)).toEqual(originalCaseSpecs.map((spec) => spec.size));
    expect(cases.map((caseDef) => caseDef.suspects.length)).toEqual(originalCaseSpecs.map((spec) => spec.suspects));
    expect(cases.map((caseDef) => caseDef.difficulty)).toEqual(originalCaseSpecs.map((spec) => spec.difficulty));

    for (const [index, caseDef] of cases.entries()) {
      const spec = originalCaseSpecs[index];
      expect(caseDef.intro, caseDef.id).toContain(`原作：${spec.original}`);
      expect(caseDef.clueConstraints.length + caseDef.generalClues.length, caseDef.id).toBe(spec.clueCount);
      expect([...caseDef.keyItems].sort(), caseDef.id).toEqual([...spec.keyItems].sort());
    }
  });

  it('first case keeps one clue card per suspect and accepts its authored answer', () => {
    const firstCase = cases[0];
    const board = {
      placements: Object.fromEntries(firstCase.solution.map((placement) => [placement.cellId, placement.suspectId])),
      marks: {}
    };

    expect(firstCase.clueConstraints).toHaveLength(firstCase.suspects.length);
    expect(validateBoard(firstCase, board).solved).toBe(true);
  });

  it('uses the selected original online case sizes in case order', () => {
    expect(cases.map((caseDef) => caseDef.size)).toEqual(originalCaseSpecs.map((spec) => spec.size));
  });

  it('uses the requested random difficulty mix and excludes Barbershop without enough bearded cast', () => {
    const difficulties = cases.map((caseDef) => caseDef.difficulty);
    const barbershop = cases.find((caseDef) => caseDef.intro.includes('The Barbershop'));
    const beardedCast = new Set(['毛利小五郎', '阿笠博士', '目暮警官']);

    expect(difficulties.filter((difficulty) => difficulty === 'easy')).toHaveLength(3);
    expect(difficulties.filter((difficulty) => difficulty === 'medium')).toHaveLength(3);
    expect(difficulties.filter((difficulty) => difficulty === 'hard')).toHaveLength(4);
    if (barbershop) {
      expect(barbershop.suspects.filter((suspect) => beardedCast.has(suspect.name))).toHaveLength(5);
    } else {
      expect(cases.map((caseDef) => caseDef.intro).join(' ')).not.toContain('The Barbershop');
    }
  });

  it('uses Conan case titles while retaining the original source in the intro', () => {
    const titles = cases.map((caseDef) => caseDef.title).join(' ');
    const intros = cases.map((caseDef) => caseDef.intro).join(' ');

    expect(titles).toContain('花店');
    expect(titles).toContain('迷你高尔夫');
    expect(titles).not.toMatch(/The Book Club|24-Hour Delivery|Netflix and Kill/i);
    for (const spec of originalCaseSpecs) {
      expect(intros).toContain(`原作：${spec.original}`);
    }
  });

  it('keeps the opening cases readable with familiar Conan cast members', () => {
    const [flowerCase, kioskCase, ridingCase] = cases;

    expect(flowerCase.title).toBe('花店清晨的未送花束');
    expect(flowerCase.culpritLabel).toBe('犯人');
    expect(flowerCase.suspects.map((suspect) => suspect.name)).toEqual([
      '江户川柯南',
      '毛利兰',
      '吉田步美',
      '圆谷光彦',
      '毛利小五郎',
      '铃木园子',
      '小岛元太'
    ]);

    expect(kioskCase.title).toContain('书亭');
    expect(ridingCase.title).toContain('骑术');
    expect(cases.slice(0, 5).map((caseDef) => `${caseDef.title} ${caseDef.intro}`).join(' ')).not.toMatch(/毒针|遗言/);
  });

  it('brings famous characters into the later case set', () => {
    const freezingRainCase = cases[5];
    const hardCase = cases[6];

    expect(freezingRainCase.title).toContain('冻雨');
    expect(freezingRainCase.suspects.map((suspect) => suspect.name)).toEqual(expect.arrayContaining(['灰原哀', '服部平次']));
    expect(hardCase.difficulty).toBe('hard');
  });

  it('recreates every selected case with dense SVG board objects', () => {
    for (const [index, caseDef] of cases.entries()) {
      const boardObjects = caseDef.cells.flatMap((cell) => (cell.object ? [cell.object] : []));

      expect(caseDef.intro).toContain(`原作：${originalCaseSpecs[index].original}`);
      expect(new Set(boardObjects), caseDef.id).toEqual(new Set(originalCaseSpecs[index].keyItems));
      expect(boardObjects.length, caseDef.id).toBeGreaterThanOrEqual(caseDef.keyItems.length * 2);
    }
  });

  it('uses reusable environment objects instead of evidence-only case packs', () => {
    const rejectedEvidenceObjects = new Set(['newspaper', 'mystery-note', 'answer-sheet', 'broken-watch']);
    const objectCases = new Map<string, Set<string>>();

    for (const caseDef of cases) {
      for (const cell of caseDef.cells) {
        if (!cell.object) continue;
        expect(rejectedEvidenceObjects.has(cell.object)).toBe(false);

        const caseIds = objectCases.get(cell.object) ?? new Set<string>();
        caseIds.add(caseDef.id);
        objectCases.set(cell.object, caseIds);
      }
    }

    const objectsUsedAcrossCases = [...objectCases.values()].filter((caseIds) => caseIds.size > 1);

    expect(objectsUsedAcrossCases.length).toBeGreaterThanOrEqual(5);
  });

  it('uses authored map layouts instead of quadrant-generated rooms from case 4 onward', () => {
    const laterCases = cases.slice(3);

    for (const caseDef of laterCases) {
      const rows = Array.from({ length: caseDef.size.rows }, (_, row) =>
        caseDef.cells.filter((cell) => cell.row === row).sort((a, b) => a.column - b.column)
      );
      const columns = Array.from({ length: caseDef.size.columns }, (_, column) =>
        caseDef.cells.filter((cell) => cell.column === column).sort((a, b) => a.row - b.row)
      );
      const roomSegments = [...rows, ...columns].map((line) =>
        line.reduce((count, cell, index) => count + (index > 0 && cell.room !== line[index - 1].room ? 1 : 0), 1)
      );

      expect(Math.max(...roomSegments), caseDef.id).toBeGreaterThan(2);
      expect(caseDef.cells.filter((cell) => cell.object).length, caseDef.id).toBeGreaterThanOrEqual(caseDef.keyItems.length);
    }
  });

  it('keeps Surprise Visitors scene art separate from puzzle clue objects', () => {
    const surpriseVisitors = cases.find((caseDef) => caseDef.intro.includes('Surprise Visitors'));

    expect(surpriseVisitors).toBeDefined();
    expect(surpriseVisitors!.size).toEqual({ rows: 9, columns: 9 });
    expect(surpriseVisitors!.scene?.objects).toHaveLength(32);
    expect(surpriseVisitors!.scene?.floorOverlays).toHaveLength(16);
    expect(surpriseVisitors!.scene?.floorOverlays.filter((overlay) => overlay.kind === 'carpet')).toHaveLength(16);
    expect(surpriseVisitors!.cells.filter((cell) => cell.object).length).toBeLessThan(
      surpriseVisitors!.scene!.objects.length
    );
  });

  it('uses the Surprise Visitors scene-layer standard across every reselected case', () => {
    for (const caseDef of cases) {
      const logicObjectCount = caseDef.cells.filter((cell) => cell.object).length;

      expect(caseDef.scene, caseDef.id).toBeDefined();
      expect(caseDef.scene!.floorOverlays.length, caseDef.id).toBeGreaterThanOrEqual(
        Math.max(3, Math.floor((caseDef.size.rows * caseDef.size.columns) / 14))
      );
      if (caseDef.id === 'case-05') {
        expect(caseDef.scene!.objects).toHaveLength(32);
      } else {
        expect(caseDef.scene!.objects.length, caseDef.id).toBeGreaterThan(logicObjectCount);
      }
    }
  });

  it('uses rule constraints instead of support-character confirmation clues', () => {
    for (const caseDef of cases) {
      const constrainedSuspects = new Set(caseDef.clueConstraints.map((constraint) => constraint.suspectId));

      for (const suspect of caseDef.suspects) {
        expect(constrainedSuspects.has(suspect.id), `${caseDef.id} ${suspect.id}`).toBe(true);
        expect(suspect.clues.join(' '), `${caseDef.id} ${suspect.id}`).not.toContain('确认');
        expect(suspect.clues.join(' '), `${caseDef.id} ${suspect.id}`).not.toMatch(/第\s*\d+\s*行第\s*\d+\s*列/);
      }
    }
  });

  it('keeps localized direct clue text aligned with each solution cell', () => {
    const failures: string[] = [];

    for (const caseDef of cases) {
      for (const suspect of caseDef.suspects) {
        const placement = caseDef.solution.find((candidate) => candidate.suspectId === suspect.id);
        const cell = caseDef.cells.find((candidate) => candidate.id === placement?.cellId);

        expect(placement).toBeDefined();
        expect(cell).toBeDefined();

        for (const clue of suspectClues(caseDef.id, suspect)) {
          for (const rowMatch of clue.matchAll(/第\s*(\d+)\s*行/g)) {
            const expected = cell!.row + 1;
            const actual = Number(rowMatch[1]);
            if (actual !== expected) failures.push(`${caseDef.id} ${suspect.id}: ${clue} expected row ${expected}`);
          }

          for (const columnMatch of clue.matchAll(/第\s*(\d+)\s*列/g)) {
            const expected = cell!.column + 1;
            const actual = Number(columnMatch[1]);
            if (actual !== expected) failures.push(`${caseDef.id} ${suspect.id}: ${clue} expected column ${expected}`);
          }

          if (clue.includes('最后一行') && cell!.row !== caseDef.size.rows - 1) {
            failures.push(`${caseDef.id} ${suspect.id}: ${clue} expected final row`);
          }

          if (clue.includes('最后一列') && cell!.column !== caseDef.size.columns - 1) {
            failures.push(`${caseDef.id} ${suspect.id}: ${clue} expected final column`);
          }
        }
      }
    }

    expect(failures).toEqual([]);
  });
});
