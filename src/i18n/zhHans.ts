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
  'agasa-kitchen': '阿笠博士家厨房',
  'agasa-lab': '阿笠博士家',
  'agasa-living': '阿笠博士家客厅',
  'agasa-yard': '阿笠博士家院子',
  'agency-carpet': '毛利侦探事务所',
  'agency-entry': '事务所门口',
  'agency-living': '事务所会客区',
  'agency-office': '事务所办公区',
  'agency-window': '事务所窗边',
  'arcade-tile': '米花商店街',
  'backstage-rubber': '电视台后台',
  'beach-beach': '沙滩',
  'beach-deck': '海滩甲板',
  'beach-sea': '海面',
  'beach-tower': '救生员塔',
  'beach-changing-room': '更衣室',
  'bridge-metal': '渡河桥',
  'cafe-wood': '波洛咖啡厅',
  'book-discussion': '读书会讨论区',
  'book-library': '图书区',
  'book-refreshments': '茶点区',
  'cabin-cabin': '湖畔木屋',
  'cabin-forest-east': '东侧森林',
  'cabin-forest-west': '西侧森林',
  'cabin-lake': '湖面',
  'cabin-shed': '小仓库',
  'crossing-cliffs': '河岸断崖',
  'crossing-fort': '旧堡',
  'crossing-hunting-cabin': '猎人小屋',
  'crossing-river': '河流',
  'crossing-woods': '树林',
  'delivery-bedroom': '值班卧室',
  'delivery-dining': '配送站餐区',
  'delivery-front-yard': '前院',
  'delivery-kitchen': '配送站厨房',
  'delivery-porch': '门廊',
  'hotel-carpet': '酒店走廊',
  'hotel-stone': '海滨酒店大厅',
  'kitchen-dining': '料理棚餐区',
  'kitchen-kitchen': '料理棚厨房',
  'kitchen-reception': '接待区',
  'kitchen-restroom': '洗手间',
  'kitchen-tile': '料理摄影棚',
  'lodge-wood': '湖畔山庄',
  'museum-exit': '美术馆出口',
  'museum-gallery': '铃木美术馆展厅',
  'museum-stage': '宝石展示台',
  'museum-vault': '美术馆保险室',
  'osaka-entry': '临时客房门口',
  'osaka-kitchen': '临时客房厨房',
  'osaka-room': '服部平次的客房',
  'osaka-street': '米花街口',
  'polo-counter': '波洛吧台',
  'polo-entry': '波洛入口',
  'polo-kitchen': '波洛后厨',
  'polo-seats': '波洛座位区',
  'school-classroom': '帝丹小学教室',
  'school-hall': '帝丹小学走廊',
  'school-library': '帝丹小学图书角',
  'school-wood': '帝丹小学教室',
  'school-yard': '帝丹小学操场',
  'snow-path': '积雪小径',
  'train-carpet': '观光列车车厢',
  'wedding-altar': '婚礼祭坛',
  'wedding-chapel': '礼堂',
  'wedding-east-court': '东侧庭院',
  'wedding-porch': '门廊',
  'wedding-west-court': '西侧庭院',
  'wedding-carpet': '婚礼会场',
  default: '现场'
};

export const objects: Record<string, string> = {
  bed: '床',
  'blackboard-eraser': '黑板擦',
  bookshelf: '书架',
  bench: '长椅',
  camera: '摄影机',
  'cash-register': '收银机',
  'champagne-tower': '香槟塔',
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
  'detective-badge': '侦探徽章',
  'dining-table': '餐桌',
  'director-chair': '导演椅',
  'filing-cabinet': '资料柜',
  fireplace: '壁炉',
  'flower-arch': '花拱门',
  'flower-pot': '花盆',
  'front-desk-bell': '前台铃',
  'gift-box': '礼盒',
  glass: '酒杯',
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
  refrigerator: '冰箱',
  'round-table': '圆桌',
  'script-paper': '脚本纸',
  'school-bag': '书包',
  'school-desk': '课桌',
  skateboard: '滑板',
  'snow-boot': '雪靴',
  'soccer-ball': '足球',
  sofa: '沙发',
  streetlamp: '路灯',
  suitcase: '行李箱',
  telephone: '电话',
  ticket: '票据',
  'ticket-clip': '验票夹',
  'train-door': '车门',
  'train-seat': '列车座椅',
  'trash-bin': '垃圾桶',
  'umbrella-stand': '伞架',
  'vanity-mirror': '化妆镜',
  'vending-machine': '自动售货机',
  'voice-changer': '变声器'
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
