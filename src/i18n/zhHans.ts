import type { CaseDefinition, Suspect, ValidationIssue } from '../game/types';

export const difficultyLabels: Record<CaseDefinition['difficulty'], string> = {
  'very-easy': '非常简单',
  easy: '简单',
  medium: '中等',
  hard: '困难',
  expert: '专家'
};

export const uiText = {
  appLabel: '柯南 Murdoku',
  caseProgress: '案件进度',
  cases: '案件列表',
  briefing: '案件简报',
  board: '犯罪棋盘',
  clues: '当前嫌疑人线索',
  suspects: '嫌疑人',
  closed: '已结案',
  selectedSuspect: '已选择嫌疑人',
  noSuspectSelected: '未选择嫌疑人',
  chooseSuspect: '选择嫌疑人',
  chooseHint: '选择嫌疑人，然后点击格子。',
  placed: '已放置',
  undo: '撤销',
  hint: '提示',
  answer: '答案',
  chooseSuspectForHint: '先选择一个嫌疑人再看提示。',
  hintConfirmed: '的位置已确认。',
  answerRevealed: '答案已显示。',
  accuse: '结案',
  modeSuffix: '模式',
  caseClosed: '案件已结。',
  murdererPrefix: '凶手是',
  unsupportedAccusation: '证据不支持这次指认。'
};

export const toolLabels = {
  place: '放置',
  x: '标记不可用',
  erase: '擦除'
};

export const rooms: Record<string, string> = {
  'agency-office': '毛利侦探事务所',
  'cafe-counter': '波洛咖啡吧台',
  'elementary-classroom': '帝丹小学教室',
  'shopping-arcade': '米花商店街',
  'tv-backstage': '电视台后台',
  'seaside-lobby': '海滨酒店大厅',
  'beach-deck': '海滩甲板',
  'kitchen-studio': '料理摄影棚',
  'wedding-hall': '婚礼会场',
  'lakeside-lodge': '湖畔山庄',
  'snowy-path': '积雪小径',
  'train-car': '观光列车车厢',
  'river-bridge': '渡河桥',
  'hotel-corridor': '酒店走廊',
  default: '现场'
};

export const objects: Record<string, string> = {
  'answer-sheet': '答案纸',
  backpack: '背包',
  'bento-box': '便当',
  book: '书本',
  bottle: '瓶子',
  bouquet: '捧花',
  'broken-watch': '坏表',
  'camera-tripod': '三脚架',
  chair: '椅子',
  'coffee-cup': '咖啡杯',
  'cooking-pot': '汤锅',
  envelope: '信封',
  'evidence-cone': '警示锥',
  'film-reel': '胶片',
  'first-aid-kit': '急救箱',
  fountain: '喷泉',
  'gift-box': '礼盒',
  glass: '酒杯',
  keycard: '房卡',
  laptop: '电脑',
  lifebuoy: '救生圈',
  microphone: '麦克风',
  'mystery-note': '便签',
  newspaper: '报纸',
  'paint-can': '油漆罐',
  'paper-crane': '纸鹤',
  phone: '手机',
  'photo-frame': '相框',
  'recipe-card': '菜谱卡',
  'school-bag': '书包',
  'security-camera': '监控摄像头',
  'snow-boot': '雪靴',
  suitcase: '行李箱',
  teacup: '茶杯',
  ticket: '票据',
  'train-map': '列车图',
  umbrella: '雨伞'
};

export function caseTitle(caseDef: CaseDefinition): string {
  return caseDef.title;
}

export function caseIntro(caseDef: CaseDefinition): string {
  return caseDef.intro;
}

export function suspectClues(_caseId: string, suspect: Suspect): string[] {
  return suspect.clues;
}

export function roomName(room: string | undefined): string | undefined {
  return room ? rooms[room] ?? room : undefined;
}

export function objectName(object: string | undefined): string | undefined {
  return object ? objects[object] ?? object : undefined;
}

export function cellLabel(row: number, column: number, suspectName?: string, marked?: boolean): string {
  const parts = [`第 ${row + 1} 行第 ${column + 1} 列`];
  if (suspectName) parts.push(suspectName);
  if (marked) parts.push('已标记');
  return parts.join('，');
}

export function issueText(issue: ValidationIssue | undefined): string {
  if (!issue) return uiText.unsupportedAccusation;
  if (issue.type === 'incomplete') return '提交前需要放置所有嫌疑人。';
  if (issue.type === 'duplicate-suspect') return '每名嫌疑人只能放置一次。';
  if (issue.type === 'duplicate-row') return '每一行只能放置一名嫌疑人。';
  if (issue.type === 'duplicate-column') return '每一列只能放置一名嫌疑人。';
  return '至少有一名嫌疑人的位置与证据冲突。';
}
