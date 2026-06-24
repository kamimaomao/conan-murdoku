import type { CaseDefinition } from '../../game/types';
import { buildConanCase, type ConanCaseConfig } from './conanCaseBuilder';

const configs: ConanCaseConfig[] = [
  {
    id: 'case-01',
    title: '毛利侦探事务所的遗失录音',
    difficulty: 'very-easy',
    size: 4,
    intro: '柯南让你先练习最基础的行列排除：每名嫌疑人只出现一次，每行每列最多一人。',
    rooms: ['agency-office', 'cafe-counter', 'hotel-corridor', 'shopping-arcade'],
    support: '柯南',
    suspects: [
      { id: 'case01-editor', name: '浅井编辑', accent: '#ffd23f', room: '事务所书桌', object: 'newspaper', solutionCell: '0-1', clue: '浅井编辑说自己一直盯着报纸剪报。' },
      { id: 'case01-delivery', name: '北岛快递员', accent: '#37b7ff', room: '走廊', object: 'ticket', solutionCell: '1-3', clue: '北岛快递员的签收单在第 2 行。' },
      { id: 'case01-client', name: '真壁委托人', accent: '#ef476f', room: '会客区', object: 'phone', solutionCell: '2-0', clue: '真壁委托人没有离开靠电话的格子。' },
      { id: 'case01-victim', name: '佐久间经理', accent: '#8bd450', room: '资料柜', object: 'mystery-note', solutionCell: '3-2', clue: '佐久间经理留下的便签在最后一行。' }
    ]
  },
  {
    id: 'case-02',
    title: '波洛咖啡厅的苦味杯沿',
    difficulty: 'easy',
    size: 5,
    intro: '小兰和安室在波洛整理证词。格子变多，但线索仍以行、列、物件为主。',
    rooms: ['cafe-counter', 'agency-office', 'shopping-arcade', 'hotel-corridor'],
    support: '小兰',
    suspects: [
      { id: 'case02-barista', name: '远野店员', accent: '#f4a261', room: '咖啡吧台', object: 'coffee-cup', solutionCell: '0-4', clue: '远野店员一直在第 1 行的咖啡杯旁。' },
      { id: 'case02-pianist', name: '神谷钢琴师', accent: '#2a9d8f', room: '窗边座', object: 'teacup', solutionCell: '1-1', clue: '神谷钢琴师坐在第 2 行。' },
      { id: 'case02-blogger', name: '若林博主', accent: '#e76f51', room: '入口', object: 'camera-tripod', solutionCell: '2-3', clue: '若林博主的三脚架挡住了第 4 列。' },
      { id: 'case02-chef', name: '久保厨师', accent: '#457b9d', room: '后厨门口', object: 'recipe-card', solutionCell: '3-0', clue: '久保厨师留下了菜谱卡。' },
      { id: 'case02-victim', name: '笹原顾客', accent: '#b5179e', room: '收银台', object: 'envelope', solutionCell: '4-2', clue: '笹原顾客的信封在最后一行。' }
    ]
  },
  {
    id: 'case-03',
    title: '帝丹小学的课后暗号',
    difficulty: 'easy',
    size: 6,
    intro: '少年侦探团把教室线索拆成行列条件。你需要在 6x6 棋盘上保持唯一放置。',
    rooms: ['elementary-classroom', 'agency-office', 'shopping-arcade', 'cafe-counter'],
    support: '灰原',
    suspects: [
      { id: 'case03-teacher', name: '三浦老师', accent: '#4cc9f0', room: '讲台', object: 'book', solutionCell: '0-5', clue: '三浦老师的教材在第 6 列。' },
      { id: 'case03-guard', name: '安田保安', accent: '#f72585', room: '走廊', object: 'security-camera', solutionCell: '1-2', clue: '安田保安查看过监控。' },
      { id: 'case03-parent', name: '铃森家长', accent: '#ffb703', room: '家长席', object: 'school-bag', solutionCell: '2-4', clue: '铃森家长站在书包旁。' },
      { id: 'case03-nurse', name: '白井校医', accent: '#80ed99', room: '保健角', object: 'first-aid-kit', solutionCell: '3-1', clue: '白井校医在第 4 行。' },
      { id: 'case03-clerk', name: '尾形事务员', accent: '#9b5de5', room: '资料柜', object: 'answer-sheet', solutionCell: '4-3', clue: '尾形事务员手里有答案纸。' },
      { id: 'case03-victim', name: '片冈顾问', accent: '#00bbf9', room: '后门', object: 'broken-watch', solutionCell: '5-0', clue: '片冈顾问倒在最后一行。' }
    ]
  },
  {
    id: 'case-04',
    title: '米花商店街的雨伞错位',
    difficulty: 'medium',
    size: 6,
    intro: '目暮警部把证物编号交给你。房间边界更明显，线索开始交叉。',
    rooms: ['shopping-arcade', 'cafe-counter', 'hotel-corridor', 'agency-office'],
    support: '目暮警部',
    suspects: [
      { id: 'case04-florist', name: '花井店主', accent: '#e63946', room: '花店门口', object: 'bouquet', solutionCell: '0-1', clue: '花井店主的花束在第 1 行。' },
      { id: 'case04-tailor', name: '仓桥裁缝', accent: '#06d6a0', room: '裁缝铺', object: 'umbrella', solutionCell: '1-4', clue: '仓桥裁缝拿错了雨伞。' },
      { id: 'case04-student', name: '森下学生', accent: '#118ab2', room: '商店街中庭', object: 'backpack', solutionCell: '2-0', clue: '森下学生靠着背包。' },
      { id: 'case04-driver', name: '相泽司机', accent: '#ffd166', room: '停车口', object: 'keycard', solutionCell: '3-5', clue: '相泽司机在第 6 列。' },
      { id: 'case04-reporter', name: '日向记者', accent: '#8338ec', room: '电话亭', object: 'microphone', solutionCell: '4-2', clue: '日向记者留下了麦克风。' },
      { id: 'case04-victim', name: '椎名店员', accent: '#fb5607', room: '后巷', object: 'paint-can', solutionCell: '5-3', clue: '椎名店员倒在最后一行。' }
    ]
  },
  {
    id: 'case-05',
    title: '电视台后台的消失脚本',
    difficulty: 'medium',
    size: 6,
    intro: '高木刑警带来新的证词。嫌疑人仍是原创人物，柯南角色只负责提示。',
    rooms: ['tv-backstage', 'kitchen-studio', 'hotel-corridor', 'shopping-arcade'],
    support: '高木刑警',
    suspects: [
      { id: 'case05-producer', name: '黑濑制作人', accent: '#3a86ff', room: '副控室', object: 'film-reel', solutionCell: '0-2', clue: '黑濑制作人检查过胶片。' },
      { id: 'case05-host', name: '鸣海主持', accent: '#ff006e', room: '化妆间', object: 'gift-box', solutionCell: '1-5', clue: '鸣海主持的礼盒在第 6 列。' },
      { id: 'case05-lighting', name: '江藤灯光师', accent: '#fb5607', room: '灯架区', object: 'camera-tripod', solutionCell: '2-1', clue: '江藤灯光师靠着三脚架。' },
      { id: 'case05-actor', name: '久我演员', accent: '#8338ec', room: '候场区', object: 'photo-frame', solutionCell: '3-4', clue: '久我演员在第 4 行。' },
      { id: 'case05-stylist', name: '水原造型师', accent: '#06d6a0', room: '服装架', object: 'suitcase', solutionCell: '4-0', clue: '水原造型师守着行李箱。' },
      { id: 'case05-victim', name: '榊原编导', accent: '#ffbe0b', room: '道具间', object: 'mystery-note', solutionCell: '5-3', clue: '榊原编导的便签在最后一行。' }
    ]
  },
  {
    id: 'case-06',
    title: '海滨酒店的毒针',
    difficulty: 'easy',
    size: 7,
    intro: '本案参考 The Beach 的 7x7 节奏，改写为海滨酒店场景。',
    rooms: ['seaside-lobby', 'beach-deck', 'hotel-corridor', 'cafe-counter'],
    support: '佐藤刑警',
    suspects: [
      { id: 'case06-concierge', name: '七濑礼宾员', accent: '#00b4d8', room: '大厅', object: 'keycard', solutionCell: '0-6', clue: '七濑礼宾员拿着房卡。' },
      { id: 'case06-diver', name: '风间潜水员', accent: '#90be6d', room: '海滩甲板', object: 'lifebuoy', solutionCell: '1-1', clue: '风间潜水员靠近救生圈。' },
      { id: 'case06-guest', name: '叶山旅客', accent: '#f94144', room: '客房走廊', object: 'bottle', solutionCell: '2-3', clue: '叶山旅客的瓶子在第 4 列。' },
      { id: 'case06-painter', name: '岛津画家', accent: '#f8961e', room: '露台', object: 'paint-can', solutionCell: '3-5', clue: '岛津画家在第 4 行。' },
      { id: 'case06-singer', name: '小早川歌手', accent: '#577590', room: '休息区', object: 'microphone', solutionCell: '4-0', clue: '小早川歌手留下了麦克风。' },
      { id: 'case06-doctor', name: '成濑医生', accent: '#43aa8b', room: '医务角', object: 'first-aid-kit', solutionCell: '5-2', clue: '成濑医生在第 6 行。' },
      { id: 'case06-victim', name: '鹤见社长', accent: '#b5179e', room: '海景桌', object: 'glass', solutionCell: '6-4', clue: '鹤见社长的酒杯在最后一行。' }
    ]
  },
  {
    id: 'case-07',
    title: '料理棚的无声事故',
    difficulty: 'medium',
    size: 8,
    intro: "本案参考 Hell's Kitchen 的 8x8 密集厨房布局，改写为电视台料理棚。",
    rooms: ['kitchen-studio', 'tv-backstage', 'cafe-counter', 'hotel-corridor'],
    support: '灰原',
    suspects: [
      { id: 'case07-chef', name: '大仓主厨', accent: '#ff595e', room: '主灶台', object: 'cooking-pot', solutionCell: '0-7', clue: '大仓主厨一直守着汤锅。' },
      { id: 'case07-assistant', name: '藤田助理', accent: '#1982c4', room: '备料台', object: 'recipe-card', solutionCell: '1-1', clue: '藤田助理在第 2 行。' },
      { id: 'case07-prop', name: '赤城道具师', accent: '#6a4c93', room: '道具架', object: 'evidence-cone', solutionCell: '2-4', clue: '赤城道具师靠近警示锥。' },
      { id: 'case07-taster', name: '栗原试吃员', accent: '#8ac926', room: '品评席', object: 'bento-box', solutionCell: '3-6', clue: '栗原试吃员的便当在第 7 列。' },
      { id: 'case07-camera', name: '广田摄影', accent: '#ffca3a', room: '机位区', object: 'camera-tripod', solutionCell: '4-0', clue: '广田摄影检查过三脚架。' },
      { id: 'case07-writer', name: '神崎编剧', accent: '#00bbf9', room: '脚本桌', object: 'laptop', solutionCell: '5-3', clue: '神崎编剧的电脑在第 6 行。' },
      { id: 'case07-guest', name: '真田嘉宾', accent: '#f15bb5', room: '嘉宾席', object: 'teacup', solutionCell: '6-5', clue: '真田嘉宾旁边有茶杯。' },
      { id: 'case07-victim', name: '二阶堂评审', accent: '#9b5de5', room: '评审席', object: 'broken-watch', solutionCell: '7-2', clue: '二阶堂评审倒在最后一行。' }
    ]
  },
  {
    id: 'case-08',
    title: '婚礼会场的无声证言',
    difficulty: 'medium',
    size: 9,
    intro: '本案参考 White Wedding 的 9x9 会场结构，改写为婚礼会场证词。',
    rooms: ['wedding-hall', 'hotel-corridor', 'cafe-counter', 'agency-office'],
    support: '小兰',
    suspects: [
      { id: 'case08-bride', name: '白石新娘', accent: '#e5989b', room: '主舞台', object: 'bouquet', solutionCell: '0-8', clue: '白石新娘的捧花在第 9 列。' },
      { id: 'case08-groom', name: '远山新郎', accent: '#355070', room: '誓约台', object: 'ticket', solutionCell: '1-1', clue: '远山新郎站在第 2 行。' },
      { id: 'case08-planner', name: '真锅策划', accent: '#6d597a', room: '控场区', object: 'phone', solutionCell: '2-4', clue: '真锅策划一直拿着手机。' },
      { id: 'case08-violinist', name: '三枝琴手', accent: '#b56576', room: '乐队席', object: 'mystery-note', solutionCell: '3-7', clue: '三枝琴手的乐谱纸在第 8 列。' },
      { id: 'case08-photographer', name: '加贺摄影师', accent: '#eaac8b', room: '拍照区', object: 'photo-frame', solutionCell: '4-0', clue: '加贺摄影师靠近相框。' },
      { id: 'case08-server', name: '岛田侍者', accent: '#00afb9', room: '餐台', object: 'glass', solutionCell: '5-2', clue: '岛田侍者负责酒杯。' },
      { id: 'case08-designer', name: '南条设计师', accent: '#f07167', room: '更衣间', object: 'gift-box', solutionCell: '6-5', clue: '南条设计师的礼盒在第 7 行。' },
      { id: 'case08-manager', name: '雨宫经理', accent: '#0081a7', room: '酒店走廊', object: 'keycard', solutionCell: '7-3', clue: '雨宫经理保管房卡。' },
      { id: 'case08-victim', name: '宫园司仪', accent: '#fdfcdc', room: '后台门', object: 'microphone', solutionCell: '8-6', clue: '宫园司仪的麦克风在最后一行。' }
    ]
  },
  {
    id: 'case-09',
    title: '湖畔山庄暴雪前夜',
    difficulty: 'hard',
    size: 9,
    intro: '本案参考 Lakeside Cabin 的 9x9 山庄结构，改写为暴雪前夜。',
    rooms: ['lakeside-lodge', 'snowy-path', 'hotel-corridor', 'river-bridge'],
    support: '阿笠博士',
    suspects: [
      { id: 'case09-owner', name: '榎本老板', accent: '#386641', room: '山庄大厅', object: 'book', solutionCell: '0-7', clue: '榎本老板翻过住宿簿。' },
      { id: 'case09-climber', name: '久我登山客', accent: '#bc4749', room: '雪道入口', object: 'snow-boot', solutionCell: '1-0', clue: '久我登山客的雪靴在第 2 行。' },
      { id: 'case09-guide', name: '相马向导', accent: '#f2e8cf', room: '码头', object: 'train-map', solutionCell: '2-5', clue: '相马向导带着路线图。' },
      { id: 'case09-writer', name: '雾岛作家', accent: '#a7c957', room: '壁炉旁', object: 'laptop', solutionCell: '3-8', clue: '雾岛作家的电脑在第 9 列。' },
      { id: 'case09-nurse', name: '高梨护士', accent: '#6a994e', room: '医药柜', object: 'first-aid-kit', solutionCell: '4-1', clue: '高梨护士靠近急救箱。' },
      { id: 'case09-fisher', name: '松永钓客', accent: '#00a6fb', room: '湖边窗', object: 'lifebuoy', solutionCell: '5-3', clue: '松永钓客在第 6 行。' },
      { id: 'case09-student', name: '朝仓学生', accent: '#0582ca', room: '客房走廊', object: 'backpack', solutionCell: '6-6', clue: '朝仓学生的背包在第 7 行。' },
      { id: 'case09-driver', name: '片濑司机', accent: '#006494', room: '车库门', object: 'ticket', solutionCell: '7-4', clue: '片濑司机保管车票。' },
      { id: 'case09-victim', name: '神原摄影家', accent: '#003554', room: '露台', object: 'camera-tripod', solutionCell: '8-2', clue: '神原摄影家的三脚架在最后一行。' }
    ]
  },
  {
    id: 'case-10',
    title: '观光列车渡河前一分钟',
    difficulty: 'hard',
    size: 9,
    intro: '本案参考 River Crossing 的 9x9 终局结构，改写为观光列车即将过桥前的案件。',
    rooms: ['train-car', 'river-bridge', 'hotel-corridor', 'seaside-lobby'],
    support: '柯南',
    suspects: [
      { id: 'case10-conductor', name: '秋山车掌', accent: '#264653', room: '一号车厢', object: 'ticket', solutionCell: '0-6', clue: '秋山车掌在第 7 列验票。' },
      { id: 'case10-tourist', name: '星野旅客', accent: '#2a9d8f', room: '观景窗', object: 'camera-tripod', solutionCell: '1-8', clue: '星野旅客架起了三脚架。' },
      { id: 'case10-mechanic', name: '井上维修员', accent: '#e9c46a', room: '机械柜', object: 'broken-watch', solutionCell: '2-1', clue: '井上维修员检查过坏表。' },
      { id: 'case10-sales', name: '矢岛推销员', accent: '#f4a261', room: '餐车', object: 'bento-box', solutionCell: '3-4', clue: '矢岛推销员靠近便当。' },
      { id: 'case10-steward', name: '水岛乘务员', accent: '#e76f51', room: '服务台', object: 'coffee-cup', solutionCell: '4-7', clue: '水岛乘务员端着咖啡杯。' },
      { id: 'case10-cartographer', name: '八代制图师', accent: '#1d3557', room: '桥梁侧窗', object: 'train-map', solutionCell: '5-0', clue: '八代制图师展开了列车图。' },
      { id: 'case10-magician', name: '浅仓魔术师', accent: '#457b9d', room: '行李架', object: 'paper-crane', solutionCell: '6-2', clue: '浅仓魔术师留下纸鹤。' },
      { id: 'case10-guard', name: '黑岩警备员', accent: '#a8dadc', room: '车门口', object: 'evidence-cone', solutionCell: '7-5', clue: '黑岩警备员摆了警示锥。' },
      { id: 'case10-victim', name: '雾岛社长', accent: '#ffb703', room: '贵宾席', object: 'mystery-note', solutionCell: '8-3', clue: '雾岛社长的便签在最后一行。' }
    ]
  }
];

export const conanCases: CaseDefinition[] = configs.map(buildConanCase);
