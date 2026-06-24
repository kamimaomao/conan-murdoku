import type { CaseDefinition } from '../../game/types';
import { buildConanCase, type ConanCaseConfig } from './conanCaseBuilder';

const configs: ConanCaseConfig[] = [
  {
    id: 'case-01',
    title: '毛利侦探事务所的遗失录音',
    difficulty: 'very-easy',
    size: 4,
    intro: '柯南让你先练习最基础的行列排除：每名嫌疑人只出现一次，每行每列最多一人。',
    rooms: ['agency-carpet', 'cafe-wood', 'hotel-carpet', 'arcade-tile'],
    support: '柯南',
    suspects: [
      { id: 'case01-editor', name: '浅井编辑', accent: '#ffd23f', room: '办公桌', object: 'office-desk', solutionCell: '0-1', clue: '浅井编辑说自己一直在办公桌旁。' },
      { id: 'case01-delivery', name: '北岛快递员', accent: '#37b7ff', room: '事务所门口', object: 'mailbox', solutionCell: '1-3', clue: '北岛快递员靠近第 2 行的邮箱。' },
      { id: 'case01-client', name: '真壁委托人', accent: '#ef476f', room: '会客区', object: 'sofa', solutionCell: '2-0', clue: '真壁委托人没有离开沙发旁的格子。' },
      { id: 'case01-victim', name: '佐久间经理', accent: '#8bd450', room: '资料柜', object: 'filing-cabinet', solutionCell: '3-2', clue: '佐久间经理倒在最后一行的资料柜旁。' }
    ]
  },
  {
    id: 'case-02',
    title: '波洛咖啡厅的苦味杯沿',
    difficulty: 'easy',
    size: 5,
    intro: '小兰和安室在波洛整理证词。格子变多，但线索仍以行、列、物件为主。',
    rooms: ['cafe-wood', 'agency-carpet', 'arcade-tile', 'hotel-carpet'],
    support: '小兰',
    suspects: [
      { id: 'case02-barista', name: '远野店员', accent: '#f4a261', room: '咖啡吧台', object: 'coffee-cup', solutionCell: '0-4', clue: '远野店员一直在第 1 行的咖啡杯旁。' },
      { id: 'case02-pianist', name: '神谷钢琴师', accent: '#2a9d8f', room: '窗边圆桌', object: 'round-table', solutionCell: '1-1', clue: '神谷钢琴师坐在第 2 行的圆桌旁。' },
      { id: 'case02-blogger', name: '若林博主', accent: '#e76f51', room: '入口座位', object: 'counter-stool', solutionCell: '2-3', clue: '若林博主坐在第 4 列的高脚凳旁。' },
      { id: 'case02-chef', name: '久保厨师', accent: '#457b9d', room: '后厨门口', object: 'menu-board', solutionCell: '3-0', clue: '久保厨师检查过菜单板。' },
      { id: 'case02-victim', name: '笹原顾客', accent: '#b5179e', room: '收银台', object: 'cash-register', solutionCell: '4-2', clue: '笹原顾客倒在最后一行的收银机旁。' }
    ]
  },
  {
    id: 'case-03',
    title: '帝丹小学的课后暗号',
    difficulty: 'easy',
    size: 6,
    intro: '少年侦探团把教室线索拆成行列条件。你需要在 6x6 棋盘上保持唯一放置。',
    rooms: ['school-wood', 'agency-carpet', 'arcade-tile', 'cafe-wood'],
    support: '灰原',
    suspects: [
      { id: 'case03-teacher', name: '三浦老师', accent: '#4cc9f0', room: '讲台', object: 'lectern', solutionCell: '0-5', clue: '三浦老师站在第 6 列的讲台旁。' },
      { id: 'case03-guard', name: '安田保安', accent: '#f72585', room: '走廊储物柜', object: 'locker', solutionCell: '1-2', clue: '安田保安查看过储物柜。' },
      { id: 'case03-parent', name: '铃森家长', accent: '#ffb703', room: '家长席', object: 'school-bag', solutionCell: '2-4', clue: '铃森家长站在书包旁。' },
      { id: 'case03-nurse', name: '白井校医', accent: '#80ed99', room: '教室绿植', object: 'potted-plant', solutionCell: '3-1', clue: '白井校医在第 4 行的盆栽旁。' },
      { id: 'case03-clerk', name: '尾形事务员', accent: '#9b5de5', room: '学生课桌', object: 'school-desk', solutionCell: '4-3', clue: '尾形事务员靠着课桌。' },
      { id: 'case03-victim', name: '片冈顾问', accent: '#00bbf9', room: '黑板边', object: 'blackboard-eraser', solutionCell: '5-0', clue: '片冈顾问倒在最后一行的黑板擦旁。' }
    ]
  },
  {
    id: 'case-04',
    title: '米花商店街的雨伞错位',
    difficulty: 'medium',
    size: 6,
    intro: '目暮警部把证物编号交给你。房间边界更明显，线索开始交叉。',
    rooms: ['arcade-tile', 'cafe-wood', 'hotel-carpet', 'agency-carpet'],
    support: '目暮警部',
    suspects: [
      { id: 'case04-florist', name: '花井店主', accent: '#e63946', room: '花店门口', object: 'flower-pot', solutionCell: '0-1', clue: '花井店主的花盆在第 1 行。' },
      { id: 'case04-tailor', name: '仓桥裁缝', accent: '#06d6a0', room: '裁缝铺门口', object: 'umbrella-stand', solutionCell: '1-4', clue: '仓桥裁缝靠近伞架。' },
      { id: 'case04-student', name: '森下学生', accent: '#118ab2', room: '商店街中庭', object: 'bench', solutionCell: '2-0', clue: '森下学生坐在长椅旁。' },
      { id: 'case04-driver', name: '相泽司机', accent: '#ffd166', room: '停车口', object: 'streetlamp', solutionCell: '3-5', clue: '相泽司机在第 6 列的路灯下。' },
      { id: 'case04-reporter', name: '日向记者', accent: '#8338ec', room: '自动售货机', object: 'vending-machine', solutionCell: '4-2', clue: '日向记者停在自动售货机旁。' },
      { id: 'case04-victim', name: '椎名店员', accent: '#fb5607', room: '后巷邮箱', object: 'mailbox', solutionCell: '5-3', clue: '椎名店员倒在最后一行的邮箱旁。' }
    ]
  },
  {
    id: 'case-05',
    title: '电视台后台的消失脚本',
    difficulty: 'medium',
    size: 6,
    intro: '高木刑警带来新的证词。嫌疑人仍是原创人物，柯南角色只负责提示。',
    rooms: ['backstage-rubber', 'kitchen-tile', 'hotel-carpet', 'arcade-tile'],
    support: '高木刑警',
    suspects: [
      { id: 'case05-producer', name: '黑濑制作人', accent: '#3a86ff', room: '副控室', object: 'monitor-screen', solutionCell: '0-2', clue: '黑濑制作人检查过监看屏。' },
      { id: 'case05-host', name: '鸣海主持', accent: '#ff006e', room: '化妆间', object: 'vanity-mirror', solutionCell: '1-5', clue: '鸣海主持在第 6 列的化妆镜前。' },
      { id: 'case05-lighting', name: '江藤灯光师', accent: '#fb5607', room: '灯架区', object: 'light-stand', solutionCell: '2-1', clue: '江藤灯光师靠着灯架。' },
      { id: 'case05-actor', name: '久我演员', accent: '#8338ec', room: '候场区', object: 'director-chair', solutionCell: '3-4', clue: '久我演员在第 4 行的导演椅旁。' },
      { id: 'case05-stylist', name: '水原造型师', accent: '#06d6a0', room: '服装架', object: 'costume-rack', solutionCell: '4-0', clue: '水原造型师守着服装架。' },
      { id: 'case05-victim', name: '榊原编导', accent: '#ffbe0b', room: '道具箱', object: 'prop-box', solutionCell: '5-3', clue: '榊原编导倒在最后一行的道具箱旁。' }
    ]
  },
  {
    id: 'case-06',
    title: '海滨酒店的毒针',
    difficulty: 'easy',
    size: 7,
    intro: '本案参考 The Beach 的 7x7 节奏，改写为海滨酒店场景。',
    rooms: ['hotel-stone', 'beach-deck', 'hotel-carpet', 'cafe-wood'],
    support: '佐藤刑警',
    suspects: [
      { id: 'case06-concierge', name: '七濑礼宾员', accent: '#00b4d8', room: '大厅前台', object: 'front-desk-bell', solutionCell: '0-6', clue: '七濑礼宾员站在第 7 列的前台铃旁。' },
      { id: 'case06-diver', name: '风间潜水员', accent: '#90be6d', room: '海滩甲板', object: 'lifebuoy', solutionCell: '1-1', clue: '风间潜水员靠近救生圈。' },
      { id: 'case06-guest', name: '叶山旅客', accent: '#f94144', room: '客房走廊', object: 'suitcase', solutionCell: '2-3', clue: '叶山旅客的行李箱在第 4 列。' },
      { id: 'case06-painter', name: '岛津画家', accent: '#f8961e', room: '露台', object: 'deck-chair', solutionCell: '3-5', clue: '岛津画家在第 4 行的躺椅旁。' },
      { id: 'case06-singer', name: '小早川歌手', accent: '#577590', room: '休息区', object: 'parasol', solutionCell: '4-0', clue: '小早川歌手站在遮阳伞旁。' },
      { id: 'case06-doctor', name: '成濑医生', accent: '#43aa8b', room: '医务角', object: 'potted-plant', solutionCell: '5-2', clue: '成濑医生在第 6 行的盆栽旁。' },
      { id: 'case06-victim', name: '鹤见社长', accent: '#b5179e', room: '观景台', object: 'coin-binoculars', solutionCell: '6-4', clue: '鹤见社长倒在最后一行的投币望远镜旁。' }
    ]
  },
  {
    id: 'case-07',
    title: '料理棚的无声事故',
    difficulty: 'medium',
    size: 8,
    intro: "本案参考 Hell's Kitchen 的 8x8 密集厨房布局，改写为电视台料理棚。",
    rooms: ['kitchen-tile', 'backstage-rubber', 'cafe-wood', 'hotel-carpet'],
    support: '灰原',
    suspects: [
      { id: 'case07-chef', name: '大仓主厨', accent: '#ff595e', room: '主灶台', object: 'cooking-pot', solutionCell: '0-7', clue: '大仓主厨一直守着汤锅。' },
      { id: 'case07-assistant', name: '藤田助理', accent: '#1982c4', room: '备料台', object: 'cutting-board', solutionCell: '1-1', clue: '藤田助理在第 2 行的砧板旁。' },
      { id: 'case07-prop', name: '赤城道具师', accent: '#6a4c93', room: '道具台', object: 'prep-table', solutionCell: '2-4', clue: '赤城道具师靠近备料台。' },
      { id: 'case07-taster', name: '栗原试吃员', accent: '#8ac926', room: '品评席', object: 'plate', solutionCell: '3-6', clue: '栗原试吃员的餐盘在第 7 列。' },
      { id: 'case07-camera', name: '广田摄影', accent: '#ffca3a', room: '机位区', object: 'camera', solutionCell: '4-0', clue: '广田摄影检查过摄影机。' },
      { id: 'case07-writer', name: '神崎编剧', accent: '#00bbf9', room: '监看区', object: 'monitor-screen', solutionCell: '5-3', clue: '神崎编剧在第 6 行的监看屏旁。' },
      { id: 'case07-guest', name: '真田嘉宾', accent: '#f15bb5', room: '嘉宾席', object: 'counter-stool', solutionCell: '6-5', clue: '真田嘉宾旁边有高脚凳。' },
      { id: 'case07-victim', name: '二阶堂评审', accent: '#9b5de5', room: '评审席', object: 'trash-bin', solutionCell: '7-2', clue: '二阶堂评审倒在最后一行的垃圾桶旁。' }
    ]
  },
  {
    id: 'case-08',
    title: '婚礼会场的无声证言',
    difficulty: 'medium',
    size: 9,
    intro: '本案参考 White Wedding 的 9x9 会场结构，改写为婚礼会场证词。',
    rooms: ['wedding-carpet', 'hotel-carpet', 'cafe-wood', 'agency-carpet'],
    support: '小兰',
    suspects: [
      { id: 'case08-bride', name: '白石新娘', accent: '#e5989b', room: '主舞台', object: 'flower-arch', solutionCell: '0-8', clue: '白石新娘站在第 9 列的花拱门旁。' },
      { id: 'case08-groom', name: '远山新郎', accent: '#355070', room: '誓约台', object: 'dining-table', solutionCell: '1-1', clue: '远山新郎站在第 2 行的餐桌旁。' },
      { id: 'case08-planner', name: '真锅策划', accent: '#6d597a', room: '控场区', object: 'telephone', solutionCell: '2-4', clue: '真锅策划一直在电话旁。' },
      { id: 'case08-violinist', name: '三枝琴手', accent: '#b56576', room: '乐队席', object: 'microphone', solutionCell: '3-7', clue: '三枝琴手的麦克风在第 8 列。' },
      { id: 'case08-photographer', name: '加贺摄影师', accent: '#eaac8b', room: '拍照区', object: 'camera', solutionCell: '4-0', clue: '加贺摄影师靠近摄影机。' },
      { id: 'case08-server', name: '岛田侍者', accent: '#00afb9', room: '餐台', object: 'chair', solutionCell: '5-2', clue: '岛田侍者负责摆放椅子。' },
      { id: 'case08-designer', name: '南条设计师', accent: '#f07167', room: '更衣间', object: 'gift-box', solutionCell: '6-5', clue: '南条设计师的礼盒在第 7 行。' },
      { id: 'case08-manager', name: '雨宫经理', accent: '#0081a7', room: '酒店走廊', object: 'keycard', solutionCell: '7-3', clue: '雨宫经理保管房卡。' },
      { id: 'case08-victim', name: '宫园司仪', accent: '#fdfcdc', room: '后台门', object: 'coat-rack', solutionCell: '8-6', clue: '宫园司仪倒在最后一行的衣帽架旁。' }
    ]
  },
  {
    id: 'case-09',
    title: '湖畔山庄暴雪前夜',
    difficulty: 'hard',
    size: 9,
    intro: '本案参考 Lakeside Cabin 的 9x9 山庄结构，改写为暴雪前夜。',
    rooms: ['lodge-wood', 'snow-path', 'hotel-carpet', 'bridge-metal'],
    support: '阿笠博士',
    suspects: [
      { id: 'case09-owner', name: '榎本老板', accent: '#386641', room: '山庄大厅', object: 'fireplace', solutionCell: '0-7', clue: '榎本老板站在第 8 列的壁炉旁。' },
      { id: 'case09-climber', name: '久我登山客', accent: '#bc4749', room: '雪道入口', object: 'snow-boot', solutionCell: '1-0', clue: '久我登山客的雪靴在第 2 行。' },
      { id: 'case09-guide', name: '相马向导', accent: '#f2e8cf', room: '码头', object: 'bench', solutionCell: '2-5', clue: '相马向导坐在长椅旁。' },
      { id: 'case09-writer', name: '雾岛作家', accent: '#a7c957', room: '壁炉旁', object: 'coffee-table', solutionCell: '3-8', clue: '雾岛作家的茶几在第 9 列。' },
      { id: 'case09-nurse', name: '高梨护士', accent: '#6a994e', room: '医药柜', object: 'bookshelf', solutionCell: '4-1', clue: '高梨护士靠近书架。' },
      { id: 'case09-fisher', name: '松永钓客', accent: '#00a6fb', room: '湖边窗', object: 'lifebuoy', solutionCell: '5-3', clue: '松永钓客在第 6 行。' },
      { id: 'case09-student', name: '朝仓学生', accent: '#0582ca', room: '客房走廊', object: 'sofa', solutionCell: '6-6', clue: '朝仓学生在第 7 行的沙发旁。' },
      { id: 'case09-driver', name: '片濑司机', accent: '#006494', room: '车库门', object: 'suitcase', solutionCell: '7-4', clue: '片濑司机保管行李箱。' },
      { id: 'case09-victim', name: '神原摄影家', accent: '#003554', room: '露台', object: 'oil-lantern', solutionCell: '8-2', clue: '神原摄影家倒在最后一行的油灯旁。' }
    ]
  },
  {
    id: 'case-10',
    title: '观光列车渡河前一分钟',
    difficulty: 'hard',
    size: 9,
    intro: '本案参考 River Crossing 的 9x9 终局结构，改写为观光列车即将过桥前的案件。',
    rooms: ['train-carpet', 'bridge-metal', 'hotel-carpet', 'hotel-stone'],
    support: '柯南',
    suspects: [
      { id: 'case10-conductor', name: '秋山车掌', accent: '#264653', room: '一号车厢', object: 'ticket-clip', solutionCell: '0-6', clue: '秋山车掌在第 7 列的验票夹旁。' },
      { id: 'case10-tourist', name: '星野旅客', accent: '#2a9d8f', room: '观景窗', object: 'observation-rail', solutionCell: '1-8', clue: '星野旅客靠着观景栏杆。' },
      { id: 'case10-mechanic', name: '井上维修员', accent: '#e9c46a', room: '机械柜', object: 'train-seat', solutionCell: '2-1', clue: '井上维修员检查过列车座椅。' },
      { id: 'case10-sales', name: '矢岛推销员', accent: '#f4a261', room: '餐车', object: 'dining-table', solutionCell: '3-4', clue: '矢岛推销员靠近餐桌。' },
      { id: 'case10-steward', name: '水岛乘务员', accent: '#e76f51', room: '服务台', object: 'coffee-cup', solutionCell: '4-7', clue: '水岛乘务员端着咖啡杯。' },
      { id: 'case10-cartographer', name: '八代制图师', accent: '#1d3557', room: '桥梁侧窗', object: 'map-stand', solutionCell: '5-0', clue: '八代制图师展开了地图架。' },
      { id: 'case10-magician', name: '浅仓魔术师', accent: '#457b9d', room: '行李架', object: 'luggage-rack', solutionCell: '6-2', clue: '浅仓魔术师靠着行李架。' },
      { id: 'case10-guard', name: '黑岩警备员', accent: '#a8dadc', room: '车门口', object: 'train-door', solutionCell: '7-5', clue: '黑岩警备员守在车门旁。' },
      { id: 'case10-victim', name: '雾岛社长', accent: '#ffb703', room: '贵宾席', object: 'trash-bin', solutionCell: '8-3', clue: '雾岛社长倒在最后一行的垃圾桶旁。' }
    ]
  }
];

export const conanCases: CaseDefinition[] = configs.map(buildConanCase);
