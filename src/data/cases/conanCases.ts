import type { CaseDefinition } from '../../game/types';
import { buildConanCase, type ConanCaseConfig } from './conanCaseBuilder';

const configs: ConanCaseConfig[] = [
  {
    id: 'case-01',
    title: '阿笠博士家的可乐失踪',
    difficulty: 'very-easy',
    size: 5,
    intro: '阿笠博士家冰箱里的可乐少了一瓶。先从熟人圈开始：每名角色只出现一次，每行每列最多一人。',
    culpritLabel: '偷喝可乐的人',
    culpritId: 'case01-genta',
    rooms: ['agasa-lab', 'agasa-living', 'agasa-yard', 'agasa-kitchen'],
    roomLayout: [
      'agasa-lab agasa-lab agasa-living agasa-living agasa-living',
      'agasa-lab agasa-lab agasa-living agasa-living agasa-living',
      'agasa-yard agasa-yard agasa-kitchen agasa-kitchen agasa-kitchen',
      'agasa-yard agasa-yard agasa-kitchen agasa-kitchen agasa-kitchen',
      'agasa-yard agasa-yard agasa-kitchen agasa-kitchen agasa-kitchen'
    ],
    cellObjects: {
      '0-1': 'refrigerator',
      '1-4': 'telephone',
      '2-0': 'detective-badge',
      '2-4': 'coffee-cup',
      '3-3': 'soccer-ball',
      '4-2': 'school-bag'
    },
    support: '阿笠博士',
    suspects: [
      { id: 'case01-conan', name: '江户川柯南', accent: '#2d7dd2', portraitKey: 'cast-edogawa-conan', room: '足球', object: 'soccer-ball', solutionCell: '3-3', clue: '柯南最后停在第 4 行第 4 列的足球旁。' },
      { id: 'case01-ran', name: '毛利兰', accent: '#ef476f', portraitKey: 'cast-mouri-ran', room: '电话旁', object: 'telephone', solutionCell: '1-4', clue: '小兰接电话的位置在第 2 行第 5 列。' },
      { id: 'case01-ayumi', name: '吉田步美', accent: '#ffb703', portraitKey: 'cast-yoshida-ayumi', room: '侦探徽章', object: 'detective-badge', solutionCell: '2-0', clue: '步美一直守着第 3 行的侦探徽章。' },
      { id: 'case01-mitsuhiko', name: '圆谷光彦', accent: '#06d6a0', portraitKey: 'cast-tsuburaya-mitsuhiko', room: '书包', object: 'school-bag', solutionCell: '4-2', clue: '光彦的书包在第 5 行第 3 列。' },
      { id: 'case01-genta', name: '小岛元太', accent: '#8bd450', portraitKey: 'cast-kojima-genta', room: '冰箱', object: 'refrigerator', solutionCell: '0-1', clue: '元太靠近第 1 行的冰箱。' }
    ]
  },
  {
    id: 'case-02',
    title: '毛利侦探事务所的碎花瓶',
    difficulty: 'easy',
    size: 5,
    intro: '事务所的花瓶碎在会客区。小兰把大家的位置写成线索，找出真正打翻花瓶的人。',
    culpritLabel: '打翻花瓶的人',
    culpritId: 'case02-kogoro',
    rooms: ['agency-office', 'agency-window', 'agency-entry', 'agency-living'],
    support: '小兰',
    suspects: [
      { id: 'case02-conan', name: '江户川柯南', accent: '#2d7dd2', portraitKey: 'cast-edogawa-conan', room: '变声器旁', object: 'voice-changer', solutionCell: '0-3', clue: '柯南把变声器放在第 1 行第 4 列。' },
      { id: 'case02-ran', name: '毛利兰', accent: '#ef476f', portraitKey: 'cast-mouri-ran', room: '花盆旁', object: 'flower-pot', solutionCell: '1-0', clue: '小兰在第 2 行的花盆旁整理碎片。' },
      { id: 'case02-kogoro', name: '毛利小五郎', accent: '#8d5524', portraitKey: 'cast-mouri-kogoro', room: '沙发', object: 'sofa', solutionCell: '2-4', clue: '毛利小五郎的拖鞋停在第 3 行第 5 列的沙发边。' },
      { id: 'case02-sonoko', name: '铃木园子', accent: '#f72585', portraitKey: 'cast-sonoko-suzuki', room: '照相机', object: 'camera', solutionCell: '3-1', clue: '园子拍照的位置在第 4 行第 2 列。' },
      { id: 'case02-agasa', name: '阿笠博士', accent: '#80ed99', portraitKey: 'cast-agasa-professor', room: '资料柜', object: 'filing-cabinet', solutionCell: '4-2', clue: '阿笠博士查看资料柜的位置在第 5 行第 3 列。' }
    ]
  },
  {
    id: 'case-03',
    title: '帝丹小学的侦探徽章恶作剧',
    difficulty: 'easy',
    size: 6,
    intro: '少年侦探团的备用徽章被藏起来了。灰原把大家下课后的移动路线压缩成 6x6 棋盘。',
    culpritLabel: '藏起侦探徽章的人',
    culpritId: 'case03-genta',
    rooms: ['school-classroom', 'school-hall', 'school-yard', 'school-library'],
    support: '灰原',
    suspects: [
      { id: 'case03-conan', name: '江户川柯南', accent: '#2d7dd2', portraitKey: 'cast-edogawa-conan', room: '徽章盒', object: 'detective-badge', solutionCell: '0-5', clue: '柯南检查徽章盒的位置在第 1 行第 6 列。' },
      { id: 'case03-ai', name: '灰原哀', accent: '#9b5de5', portraitKey: 'cast-ai-haibara', room: '储物柜', object: 'locker', solutionCell: '1-2', clue: '灰原在第 2 行的储物柜旁。' },
      { id: 'case03-ayumi', name: '吉田步美', accent: '#ffb703', portraitKey: 'cast-yoshida-ayumi', room: '书包', object: 'school-bag', solutionCell: '2-4', clue: '步美的书包在第 3 行第 5 列。' },
      { id: 'case03-mitsuhiko', name: '圆谷光彦', accent: '#06d6a0', portraitKey: 'cast-tsuburaya-mitsuhiko', room: '课桌', object: 'school-desk', solutionCell: '3-1', clue: '光彦靠着第 4 行第 2 列的课桌。' },
      { id: 'case03-genta', name: '小岛元太', accent: '#8bd450', portraitKey: 'cast-kojima-genta', room: '黑板擦', object: 'blackboard-eraser', solutionCell: '4-3', clue: '元太的黑板擦在第 5 行第 4 列。' },
      { id: 'case03-agasa', name: '阿笠博士', accent: '#80ed99', portraitKey: 'cast-agasa-professor', room: '自动售货机', object: 'vending-machine', solutionCell: '5-0', clue: '阿笠博士在第 6 行的自动售货机旁等大家。' }
    ]
  },
  {
    id: 'case-04',
    title: '波洛咖啡厅的三明治错拿',
    difficulty: 'easy',
    size: 6,
    intro: '波洛咖啡厅的三明治被人拿错。安室把吧台、座位和后厨线索拆成更密的 6x6 练习。',
    culpritLabel: '拿错三明治的人',
    culpritId: 'case04-kogoro',
    rooms: ['polo-counter', 'polo-kitchen', 'polo-seats', 'polo-entry'],
    roomLayout: [
      'polo-counter polo-counter polo-counter polo-kitchen polo-kitchen polo-kitchen',
      'polo-counter polo-counter polo-seats polo-seats polo-kitchen polo-kitchen',
      'polo-entry polo-counter polo-seats polo-seats polo-seats polo-kitchen',
      'polo-entry polo-entry polo-seats polo-seats polo-seats polo-seats',
      'polo-entry polo-entry polo-counter polo-counter polo-seats polo-seats',
      'polo-entry polo-entry polo-entry polo-counter polo-counter polo-seats'
    ],
    cellObjects: {
      '0-1': 'coffee-cup',
      '0-4': 'menu-board',
      '1-4': 'menu-board',
      '2-5': 'cutting-board',
      '3-0': 'counter-stool',
      '3-4': 'round-table',
      '4-2': 'cash-register',
      '5-3': 'coffee-table',
      '5-5': 'umbrella-stand'
    },
    support: '安室',
    suspects: [
      { id: 'case04-amuro', name: '安室透', accent: '#f4a261', portraitKey: 'cast-amuro-cafe-detective', room: '咖啡杯', object: 'coffee-cup', solutionCell: '0-1', clue: '安室透确认咖啡杯在第 1 行第 2 列。' },
      { id: 'case04-ran', name: '毛利兰', accent: '#ef476f', portraitKey: 'cast-mouri-ran', room: '菜单板', object: 'menu-board', solutionCell: '1-4', clue: '小兰看菜单的位置在第 2 行第 5 列。' },
      { id: 'case04-conan', name: '江户川柯南', accent: '#2d7dd2', portraitKey: 'cast-edogawa-conan', room: '砧板', object: 'cutting-board', solutionCell: '2-5', clue: '柯南检查第 3 行第 6 列的砧板。' },
      { id: 'case04-sonoko', name: '铃木园子', accent: '#f72585', portraitKey: 'cast-sonoko-suzuki', room: '高脚凳', object: 'counter-stool', solutionCell: '3-0', clue: '园子坐在第 4 行的高脚凳旁。' },
      { id: 'case04-kogoro', name: '毛利小五郎', accent: '#8d5524', portraitKey: 'cast-mouri-kogoro', room: '收银机', object: 'cash-register', solutionCell: '4-2', clue: '毛利小五郎停在第 5 行第 3 列的收银机旁。' },
      { id: 'case04-ai', name: '灰原哀', accent: '#9b5de5', portraitKey: 'cast-ai-haibara', room: '茶几', object: 'coffee-table', solutionCell: '5-3', clue: '灰原在第 6 行第 4 列的茶几旁。' }
    ]
  },
  {
    id: 'case-05',
    title: '服部平次的护身符风波',
    difficulty: 'easy',
    size: 6,
    intro: '服部平次来东京找柯南，和叶的护身符却被人拿错。这里仍是生活化误会，但角色开始扩展。',
    culpritLabel: '拿错护身符的人',
    culpritId: 'case05-heiji',
    rooms: ['osaka-room', 'osaka-kitchen', 'osaka-entry', 'osaka-street'],
    roomLayout: [
      'osaka-room osaka-room osaka-entry osaka-entry osaka-street osaka-street',
      'osaka-room osaka-kitchen osaka-kitchen osaka-entry osaka-street osaka-street',
      'osaka-room osaka-kitchen osaka-kitchen osaka-kitchen osaka-entry osaka-street',
      'osaka-room osaka-room osaka-kitchen osaka-entry osaka-entry osaka-street',
      'osaka-street osaka-room osaka-room osaka-room osaka-entry osaka-entry',
      'osaka-street osaka-street osaka-room osaka-room osaka-room osaka-entry'
    ],
    cellObjects: {
      '0-4': 'ticket',
      '1-1': 'gift-box',
      '1-4': 'umbrella-stand',
      '2-5': 'soccer-ball',
      '3-2': 'coffee-cup',
      '4-0': 'vending-machine',
      '4-4': 'streetlamp',
      '5-3': 'suitcase'
    },
    support: '柯南',
    suspects: [
      { id: 'case05-heiji', name: '服部平次', accent: '#2a9d8f', portraitKey: 'cast-heiji-hattori', room: '车票', object: 'ticket', solutionCell: '0-4', clue: '服部平次把车票放在第 1 行第 5 列。' },
      { id: 'case05-kazuha', name: '远山和叶', accent: '#ffb703', portraitKey: 'cast-kazuha-toyama', room: '护身符盒', object: 'gift-box', solutionCell: '1-1', clue: '和叶的护身符盒在第 2 行第 2 列。' },
      { id: 'case05-conan', name: '江户川柯南', accent: '#2d7dd2', portraitKey: 'cast-edogawa-conan', room: '足球', object: 'soccer-ball', solutionCell: '2-5', clue: '柯南站在第 3 行第 6 列的足球旁。' },
      { id: 'case05-ran', name: '毛利兰', accent: '#ef476f', portraitKey: 'cast-mouri-ran', room: '咖啡杯', object: 'coffee-cup', solutionCell: '3-2', clue: '小兰端着第 4 行第 3 列的咖啡杯。' },
      { id: 'case05-kogoro', name: '毛利小五郎', accent: '#8d5524', portraitKey: 'cast-mouri-kogoro', room: '自动售货机', object: 'vending-machine', solutionCell: '4-0', clue: '毛利小五郎在第 5 行的自动售货机旁。' },
      { id: 'case05-sonoko', name: '铃木园子', accent: '#f72585', portraitKey: 'cast-sonoko-suzuki', room: '行李箱', object: 'suitcase', solutionCell: '5-3', clue: '园子的行李箱在第 6 行第 4 列。' }
    ]
  },
  {
    id: 'case-06',
    title: '铃木美术馆的珠宝失窃案：谁放走了怪盗基德',
    difficulty: 'easy',
    size: 7,
    intro: '铃木美术馆的宝石失踪，怪盗基德也混进人群。这里开始进入真正的案件线。',
    culpritLabel: '放走怪盗基德的人',
    culpritId: 'case06-sonoko',
    rooms: ['museum-gallery', 'museum-vault', 'museum-stage', 'museum-exit'],
    roomLayout: [
      'museum-gallery museum-gallery museum-gallery museum-stage museum-stage museum-vault museum-vault',
      'museum-gallery museum-stage museum-stage museum-stage museum-vault museum-vault museum-vault',
      'museum-gallery museum-gallery museum-stage museum-stage museum-stage museum-vault museum-exit',
      'museum-exit museum-gallery museum-gallery museum-stage museum-vault museum-vault museum-exit',
      'museum-exit museum-exit museum-gallery museum-gallery museum-stage museum-stage museum-exit',
      'museum-exit museum-gallery museum-gallery museum-vault museum-vault museum-stage museum-stage',
      'museum-exit museum-exit museum-gallery museum-gallery museum-vault museum-vault museum-stage'
    ],
    cellObjects: {
      '0-6': 'vanity-mirror',
      '1-1': 'gift-box',
      '1-5': 'light-stand',
      '2-4': 'camera',
      '3-0': 'skateboard',
      '3-3': 'champagne-tower',
      '4-5': 'flower-pot',
      '5-2': 'ticket',
      '5-5': 'costume-rack',
      '6-3': 'suitcase'
    },
    support: '园子',
    suspects: [
      { id: 'case06-kid', name: '怪盗基德', accent: '#f8f9fa', portraitKey: 'cast-kaito-kid', room: '化妆镜', object: 'vanity-mirror', solutionCell: '0-6', clue: '怪盗基德出现在第 1 行第 7 列的化妆镜旁。' },
      { id: 'case06-sonoko', name: '铃木园子', accent: '#f72585', portraitKey: 'cast-sonoko-suzuki', room: '礼盒', object: 'gift-box', solutionCell: '1-1', clue: '园子抱着第 2 行第 2 列的礼盒。' },
      { id: 'case06-kogoro', name: '毛利小五郎', accent: '#8d5524', portraitKey: 'cast-mouri-kogoro', room: '摄影机', object: 'camera', solutionCell: '2-4', clue: '毛利小五郎检查第 3 行第 5 列的摄影机。' },
      { id: 'case06-conan', name: '江户川柯南', accent: '#2d7dd2', portraitKey: 'cast-edogawa-conan', room: '滑板', object: 'skateboard', solutionCell: '3-0', clue: '柯南的滑板在第 4 行第 1 列。' },
      { id: 'case06-ran', name: '毛利兰', accent: '#ef476f', portraitKey: 'cast-mouri-ran', room: '花盆', object: 'flower-pot', solutionCell: '4-5', clue: '小兰在第 5 行第 6 列的花盆旁。' },
      { id: 'case06-heiji', name: '服部平次', accent: '#2a9d8f', portraitKey: 'cast-heiji-hattori', room: '票据', object: 'ticket', solutionCell: '5-2', clue: '服部平次拿着第 6 行第 3 列的票据。' },
      { id: 'case06-kazuha', name: '远山和叶', accent: '#ffb703', portraitKey: 'cast-kazuha-toyama', room: '行李箱', object: 'suitcase', solutionCell: '6-3', clue: '和叶的行李箱在第 7 行第 4 列。' }
    ]
  },
  {
    id: 'case-07',
    title: '料理棚的无声事故',
    difficulty: 'medium',
    size: 8,
    intro: "本案参考 Hell's Kitchen 的 8x8 密集厨房布局，改写为电视台料理棚。",
    rooms: ['kitchen-tile', 'backstage-rubber', 'cafe-wood', 'hotel-carpet'],
    roomLayout: [
      'kitchen-kitchen kitchen-kitchen kitchen-kitchen kitchen-kitchen kitchen-kitchen kitchen-restroom kitchen-restroom kitchen-restroom',
      'kitchen-kitchen kitchen-kitchen kitchen-kitchen kitchen-kitchen kitchen-kitchen kitchen-kitchen kitchen-restroom kitchen-restroom',
      'kitchen-kitchen kitchen-kitchen kitchen-kitchen kitchen-kitchen kitchen-kitchen kitchen-kitchen kitchen-restroom kitchen-restroom',
      'kitchen-kitchen kitchen-kitchen kitchen-kitchen kitchen-kitchen kitchen-kitchen kitchen-restroom kitchen-restroom kitchen-restroom',
      'kitchen-reception kitchen-dining kitchen-dining kitchen-dining kitchen-dining kitchen-dining kitchen-dining kitchen-dining',
      'kitchen-reception kitchen-dining kitchen-dining kitchen-dining kitchen-dining kitchen-dining kitchen-dining kitchen-dining',
      'kitchen-reception kitchen-reception kitchen-dining kitchen-dining kitchen-dining kitchen-dining kitchen-dining kitchen-dining',
      'kitchen-reception kitchen-reception kitchen-dining kitchen-dining kitchen-dining kitchen-dining kitchen-dining kitchen-dining'
    ],
    cellObjects: {
      '0-2': 'cooking-pot',
      '0-7': 'cooking-pot',
      '1-1': 'cutting-board',
      '1-5': 'prep-table',
      '2-4': 'prep-table',
      '3-6': 'plate',
      '4-0': 'camera',
      '4-2': 'round-table',
      '5-3': 'monitor-screen',
      '5-6': 'potted-plant',
      '6-5': 'counter-stool',
      '7-2': 'trash-bin',
      '7-6': 'chair'
    },
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
    roomLayout: [
      'wedding-west-court wedding-west-court wedding-chapel wedding-altar wedding-altar wedding-altar wedding-chapel wedding-east-court wedding-east-court',
      'wedding-west-court wedding-west-court wedding-chapel wedding-altar wedding-altar wedding-altar wedding-chapel wedding-east-court wedding-east-court',
      'wedding-west-court wedding-west-court wedding-chapel wedding-chapel wedding-altar wedding-chapel wedding-chapel wedding-east-court wedding-east-court',
      'wedding-west-court wedding-west-court wedding-chapel wedding-chapel wedding-altar wedding-chapel wedding-chapel wedding-east-court wedding-east-court',
      'wedding-west-court wedding-west-court wedding-chapel wedding-chapel wedding-altar wedding-chapel wedding-chapel wedding-east-court wedding-east-court',
      'wedding-west-court wedding-west-court wedding-chapel wedding-chapel wedding-altar wedding-chapel wedding-chapel wedding-east-court wedding-east-court',
      'wedding-west-court wedding-west-court wedding-chapel wedding-chapel wedding-chapel wedding-chapel wedding-chapel wedding-east-court wedding-east-court',
      'wedding-west-court wedding-west-court wedding-west-court wedding-porch wedding-porch wedding-porch wedding-east-court wedding-east-court wedding-east-court',
      'wedding-west-court wedding-west-court wedding-west-court wedding-porch wedding-porch wedding-porch wedding-east-court wedding-east-court wedding-east-court'
    ],
    cellObjects: {
      '0-8': 'flower-arch',
      '1-1': 'dining-table',
      '1-4': 'flower-pot',
      '2-4': 'champagne-tower',
      '3-7': 'microphone',
      '4-0': 'camera',
      '4-4': 'flower-pot',
      '5-2': 'chair',
      '6-5': 'gift-box',
      '7-3': 'keycard',
      '8-6': 'coat-rack'
    },
    support: '小兰',
    suspects: [
      { id: 'case08-bride', name: '白石新娘', accent: '#e5989b', room: '主舞台', object: 'flower-arch', solutionCell: '0-8', clue: '白石新娘站在第 9 列的花拱门旁。' },
      { id: 'case08-groom', name: '远山新郎', accent: '#355070', room: '誓约台', object: 'dining-table', solutionCell: '1-1', clue: '远山新郎站在第 2 行的餐桌旁。' },
      { id: 'case08-planner', name: '真锅策划', accent: '#6d597a', room: '控场区', object: 'champagne-tower', solutionCell: '2-4', clue: '真锅策划一直在香槟塔旁。' },
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
    roomLayout: [
      'cabin-forest-west cabin-forest-west cabin-forest-west cabin-forest-west cabin-forest-west cabin-forest-east cabin-forest-east cabin-forest-east cabin-forest-east',
      'cabin-forest-west cabin-forest-west cabin-forest-west cabin-forest-west cabin-forest-west cabin-forest-east cabin-forest-east cabin-forest-east cabin-forest-east',
      'cabin-forest-west cabin-forest-west cabin-forest-west cabin-forest-west cabin-lake cabin-lake cabin-forest-east cabin-forest-east cabin-forest-east',
      'cabin-forest-west cabin-forest-west cabin-forest-west cabin-lake cabin-lake cabin-lake cabin-lake cabin-forest-east cabin-forest-east',
      'cabin-forest-west cabin-forest-west cabin-lake cabin-lake cabin-lake cabin-lake cabin-lake cabin-forest-east cabin-forest-east',
      'cabin-forest-west cabin-forest-west cabin-lake cabin-lake cabin-lake cabin-lake cabin-lake cabin-lake cabin-forest-east',
      'cabin-forest-west cabin-forest-west cabin-forest-west cabin-lake cabin-lake cabin-cabin cabin-cabin cabin-cabin cabin-cabin',
      'cabin-shed cabin-forest-west cabin-forest-west cabin-forest-west cabin-forest-west cabin-cabin cabin-cabin cabin-cabin cabin-cabin',
      'cabin-shed cabin-shed cabin-forest-west cabin-forest-west cabin-forest-west cabin-cabin cabin-cabin cabin-cabin cabin-cabin'
    ],
    cellObjects: {
      '0-7': 'fireplace',
      '1-0': 'snow-boot',
      '2-5': 'bench',
      '3-8': 'coffee-table',
      '4-1': 'bookshelf',
      '5-3': 'lifebuoy',
      '6-6': 'sofa',
      '7-4': 'suitcase',
      '8-2': 'oil-lantern',
      '8-6': 'chair'
    },
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
    size: { rows: 9, columns: 10 },
    intro: '本案参考 River Crossing 的 9x10 终局结构，改写为观光列车即将过桥前的案件。',
    rooms: ['train-carpet', 'bridge-metal', 'hotel-carpet', 'hotel-stone'],
    roomLayout: [
      'crossing-river crossing-river crossing-river crossing-river crossing-cliffs crossing-cliffs crossing-cliffs crossing-woods crossing-woods crossing-woods',
      'crossing-river crossing-river crossing-river crossing-river crossing-cliffs crossing-woods crossing-woods crossing-woods crossing-woods crossing-woods',
      'crossing-river crossing-river crossing-river crossing-cliffs crossing-cliffs crossing-woods crossing-woods crossing-woods crossing-woods crossing-woods',
      'crossing-river crossing-river crossing-cliffs crossing-cliffs crossing-hunting-cabin crossing-woods crossing-woods crossing-woods crossing-woods crossing-woods',
      'crossing-river crossing-river crossing-cliffs crossing-hunting-cabin crossing-hunting-cabin crossing-woods crossing-woods crossing-woods crossing-woods crossing-woods',
      'crossing-river crossing-cliffs crossing-cliffs crossing-woods crossing-hunting-cabin crossing-hunting-cabin crossing-woods crossing-woods crossing-woods crossing-woods',
      'crossing-river crossing-cliffs crossing-woods crossing-woods crossing-woods crossing-fort crossing-fort crossing-fort crossing-fort crossing-woods',
      'crossing-river crossing-river crossing-woods crossing-woods crossing-woods crossing-fort crossing-fort crossing-fort crossing-fort crossing-fort',
      'crossing-river crossing-woods crossing-woods crossing-woods crossing-woods crossing-woods crossing-fort crossing-fort crossing-fort crossing-fort'
    ],
    cellObjects: {
      '0-8': 'ticket-clip',
      '1-2': 'observation-rail',
      '2-9': 'train-seat',
      '3-4': 'dining-table',
      '4-7': 'coffee-cup',
      '5-0': 'map-stand',
      '6-3': 'luggage-rack',
      '7-6': 'train-door',
      '8-1': 'trash-bin',
      '8-4': 'bench'
    },
    support: '柯南',
    suspects: [
      { id: 'case10-conductor', name: '秋山车掌', accent: '#264653', room: '一号车厢', object: 'ticket-clip', solutionCell: '0-8', clue: '秋山车掌在第 9 列的验票夹旁。' },
      { id: 'case10-tourist', name: '星野旅客', accent: '#2a9d8f', room: '观景窗', object: 'observation-rail', solutionCell: '1-2', clue: '星野旅客在第 2 行的观景栏杆旁。' },
      { id: 'case10-mechanic', name: '井上维修员', accent: '#e9c46a', room: '机械柜', object: 'train-seat', solutionCell: '2-9', clue: '井上维修员在第 10 列检查列车座椅。' },
      { id: 'case10-sales', name: '矢岛推销员', accent: '#f4a261', room: '餐车', object: 'dining-table', solutionCell: '3-4', clue: '矢岛推销员靠近餐桌。' },
      { id: 'case10-steward', name: '水岛乘务员', accent: '#e76f51', room: '服务台', object: 'coffee-cup', solutionCell: '4-7', clue: '水岛乘务员端着咖啡杯。' },
      { id: 'case10-cartographer', name: '八代制图师', accent: '#1d3557', room: '桥梁侧窗', object: 'map-stand', solutionCell: '5-0', clue: '八代制图师展开了地图架。' },
      { id: 'case10-magician', name: '浅仓魔术师', accent: '#457b9d', room: '行李架', object: 'luggage-rack', solutionCell: '6-3', clue: '浅仓魔术师靠着第 4 列的行李架。' },
      { id: 'case10-guard', name: '黑岩警备员', accent: '#a8dadc', room: '车门口', object: 'train-door', solutionCell: '7-6', clue: '黑岩警备员守在第 7 列的车门旁。' },
      { id: 'case10-victim', name: '雾岛社长', accent: '#ffb703', room: '贵宾席', object: 'trash-bin', solutionCell: '8-1', clue: '雾岛社长倒在最后一行的垃圾桶旁。' }
    ]
  }
];

export const conanCases: CaseDefinition[] = configs.map(buildConanCase);
