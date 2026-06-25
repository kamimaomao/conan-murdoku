import { describe, expect, it } from 'vitest';
import { cases } from '../../src/data/cases';
import { validateCaseData } from '../../src/data/cases/validateCases';
import { validateBoard } from '../../src/game/validation';
import { suspectClues } from '../../src/i18n/zhHans';

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

  it('starts with teaching boards before increasing to the reference sizes', () => {
    expect(cases.map((caseDef) => caseDef.size)).toEqual([
      { rows: 5, columns: 5 },
      { rows: 5, columns: 5 },
      { rows: 6, columns: 6 },
      { rows: 6, columns: 6 },
      { rows: 6, columns: 6 },
      { rows: 7, columns: 7 },
      { rows: 8, columns: 8 },
      { rows: 9, columns: 9 },
      { rows: 9, columns: 9 },
      { rows: 9, columns: 10 }
    ]);
  });

  it('uses Conan case titles and avoids original puzzle names', () => {
    const titles = cases.map((caseDef) => caseDef.title).join(' ');

    expect(titles).toContain('阿笠博士家');
    expect(titles).toContain('毛利侦探事务所');
    expect(titles).toContain('服部平次');
    expect(titles).toContain('珠宝失窃案');
    expect(titles).toContain('怪盗基德');
    expect(titles).toContain('观光列车');
    expect(titles).not.toMatch(/Town Gate|Hell's Kitchen|White Wedding|River Crossing/i);
  });

  it('opens with familiar low-stakes character incidents', () => {
    const [colaCase, vaseCase, schoolCase, cafeCase, heijiCase] = cases;

    expect(colaCase.title).toBe('阿笠博士家的可乐失踪');
    expect(colaCase.culpritLabel).toBe('偷喝可乐的人');
    expect(colaCase.suspects.map((suspect) => suspect.name)).toEqual([
      '江户川柯南',
      '毛利兰',
      '吉田步美',
      '圆谷光彦',
      '小岛元太'
    ]);

    expect(vaseCase.title).toBe('毛利侦探事务所的碎花瓶');
    expect(vaseCase.culpritLabel).toBe('打翻花瓶的人');
    expect(schoolCase.title).toContain('侦探徽章');
    expect(cafeCase.title).toContain('波洛咖啡厅');
    expect(heijiCase.title).toContain('服部平次');
    expect(cases.slice(0, 5).map((caseDef) => `${caseDef.title} ${caseDef.intro}`).join(' ')).not.toMatch(
      /凶手|遗言|倒在|毒针|命案/
    );
  });

  it('brings famous characters into the later case arc', () => {
    const heijiCase = cases[4];
    const kidCase = cases[5];

    expect(heijiCase.suspects.map((suspect) => suspect.name)).toEqual(
      expect.arrayContaining(['服部平次', '远山和叶'])
    );
    expect(kidCase.title).toBe('铃木美术馆的珠宝失窃案：谁放走了怪盗基德');
    expect(kidCase.culpritLabel).toBe('放走怪盗基德的人');
    expect(kidCase.suspects.map((suspect) => suspect.name)).toEqual(
      expect.arrayContaining(['怪盗基德', '铃木园子', '毛利小五郎'])
    );
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

    expect(objectsUsedAcrossCases.length).toBeGreaterThanOrEqual(8);
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
      expect(caseDef.cells.filter((cell) => cell.object).length, caseDef.id).toBeGreaterThan(caseDef.suspects.length);
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
