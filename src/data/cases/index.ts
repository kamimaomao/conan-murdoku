import type { CaseDefinition } from '../../game/types';
import { conanCases } from './conanCases';

export const cases: CaseDefinition[] = conanCases;

export const casesById: Record<string, CaseDefinition> = Object.fromEntries(
  cases.map((caseDef) => [caseDef.id, caseDef])
);
