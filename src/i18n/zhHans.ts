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
  'agency-carpet': '毛利侦探事务所',
  'arcade-tile': '米花商店街',
  'backstage-rubber': '电视台后台',
  'beach-deck': '海滩甲板',
  'bridge-metal': '渡河桥',
  'cafe-wood': '波洛咖啡厅',
  'hotel-carpet': '酒店走廊',
  'hotel-stone': '海滨酒店大厅',
  'kitchen-tile': '料理摄影棚',
  'lodge-wood': '湖畔山庄',
  'school-wood': '帝丹小学教室',
  'snow-path': '积雪小径',
  'train-carpet': '观光列车车厢',
  'wedding-carpet': '婚礼会场',
  default: '现场'
};

export const objects: Record<string, string> = {
  'blackboard-eraser': '黑板擦',
  bookshelf: '书架',
  bench: '长椅',
  camera: '摄影机',
  'cash-register': '收银机',
  chair: '椅子',
  'coat-rack': '衣帽架',
  'coffee-table': '茶几',
  'coffee-cup': '咖啡杯',
  'coin-binoculars': '投币望远镜',
  'cooking-pot': '汤锅',
  'costume-rack': '服装架',
  'counter-stool': '高脚凳',
  'cutting-board': '砧板',
  'deck-chair': '躺椅',
  'dining-table': '餐桌',
  'director-chair': '导演椅',
  'filing-cabinet': '资料柜',
  fireplace: '壁炉',
  'flower-arch': '花拱门',
  'flower-pot': '花盆',
  'front-desk-bell': '前台铃',
  'gift-box': '礼盒',
  keycard: '房卡',
  lectern: '讲台',
  lifebuoy: '救生圈',
  'light-stand': '灯架',
  locker: '储物柜',
  'luggage-rack': '行李架',
  mailbox: '邮箱',
  'map-stand': '地图架',
  'menu-board': '菜单板',
  microphone: '麦克风',
  'monitor-screen': '监看屏',
  'observation-rail': '观景栏杆',
  'office-desk': '办公桌',
  'oil-lantern': '油灯',
  parasol: '遮阳伞',
  plate: '餐盘',
  'potted-plant': '盆栽',
  'prep-table': '备料台',
  'prop-box': '道具箱',
  'round-table': '圆桌',
  'school-bag': '书包',
  'school-desk': '课桌',
  'snow-boot': '雪靴',
  sofa: '沙发',
  streetlamp: '路灯',
  suitcase: '行李箱',
  telephone: '电话',
  'ticket-clip': '验票夹',
  'train-door': '车门',
  'train-seat': '列车座椅',
  'trash-bin': '垃圾桶',
  'umbrella-stand': '伞架',
  'vanity-mirror': '化妆镜',
  'vending-machine': '自动售货机'
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
