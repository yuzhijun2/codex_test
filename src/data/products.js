export const categories = [
  { id: 'all', name: '全部', icon: '📱' },
  { id: 'smartphone', name: '智能手机', icon: '📱' },
  { id: 'laptop', name: '笔记本电脑', icon: '💻' },
  { id: 'tablet', name: '平板电脑', icon: '📲' },
  { id: 'audio', name: '音频设备', icon: '🎧' },
  { id: 'wearable', name: '智能穿戴', icon: '⌚' },\n  { id: 'gaming', name: '游戏主机', icon: '🎮' }\n]

export const products = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    category: 'smartphone',
    price: 9999,
    originalPrice: 10999,
    rating: 4.8,
    reviews: 2846,
    description: 'A17 Pro 芯片 · 钛金属设计 · 4800万像素专业级相机系统 · 支持USB-C · 支持卫星SOS紧急联络',
    image: 'https://picsum.photos/seed/iphone15pro/400/300',
    badge: '热卖',
    colors: ['#4a4a4a', '#c0c0c0', '#f5f5f5', '#1a2a3a'],
    storage: ['256GB', '512GB', '1TB']
  productReviews: [
    {"user": "张伟", "rating": 5, "comment": "第一次用苹果手机，系统和相机效果真的让人惊喜，钛金属质感也很好"},
    {"user": "李敏", "rating": 5, "comment": "拍照真的强，晚上拍光也很清晰，电池一天一充完全够用"},
    {"user": "王芳", "rating": 4, "comment": "性价比有点低，但体验确实是杀手级别，心动就冲吧"}
  ],
  },
  {
    id: 2,
    name: 'MacBook Air 15" M3',
    brand: 'Apple',
    category: 'laptop',
    price: 10999,
    originalPrice: 12499,
    rating: 4.9,
    reviews: 1852,
    description: 'M3 芯片 · 15.3英寸Liquid Retina显示屏 · 18小时续航 · 8核CPU · 10核GPU · 轻薄仅1.51kg',
    image: 'https://picsum.photos/seed/macbookair/400/300',
    badge: '新品',
    colors: ['#c0c0c0', '#3d3d3d', '#f5e6d0'],
    storage: ['256GB', '512GB', '1TB', '2TB']
  productReviews: [
    {"user": "Alex Chen", "rating": 5, "comment": "M3芯片性能太强了，编译代码飞快，而且完全不需要风扇"},
    {"user": "设计师小林", "rating": 5, "comment": "剪4K视频毫无压力，屏幕色彩准，轻薄到可以天天背着"},
    {"user": "程序员老王", "rating": 4, "comment": "续航确实强，但16GB内存开多了Docker还是有点紧"}
  ],
  },
  {
    id: 3,
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    category: 'audio',
    price: 2399,
    originalPrice: 2999,
    rating: 4.7,
    reviews: 3621,
    description: '行业领先降噪 · 30小时续航 · 自适应声音控制 · 高解析度音频 · 舒适头梁设计 · 快充3分钟播放3小时',
    image: 'https://picsum.photos/seed/sonyxm5/400/300',
    badge: '爆款',
    colors: ['#2d2d2d', '#e8e8e8'],
    storage: null
  productReviews: [
    {"user": "音频发烧友", "rating": 5, "comment": "降噪效果一绝，坐地铁完全听不到噪音，音质通透"},
    {"user": "Lisa Z", "rating": 5, "comment": "戴着非常舒适，不夹头，出差必备，续航也超长"},
    {"user": "Tom", "rating": 4, "comment": "音质比XM4有提升但不大，降噪确实更强了"}
  ],
  },
  {
    id: 4,
    name: 'iPad Air M2',
    brand: 'Apple',
    category: 'tablet',
    price: 4799,
    originalPrice: 5499,
    rating: 4.8,
    reviews: 1456,
    description: 'M2 芯片 · 11英寸Liquid Retina显示屏 · 支持Apple Pencil Pro · 轻薄便携 · 全天续航',
    image: 'https://picsum.photos/seed/ipadair/400/300',
    badge: '热卖',
    colors: ['#c0c0c0', '#3d5a80', '#5c4a3d', '#7a5c4a'],
    storage: ['128GB', '256GB', '512GB', '1TB']
  productReviews: [
    {"user": "学生小陈", "rating": 5, "comment": "记笔记画画太好用了，搭配pencil pro体验完美"},
    {"user": "插画师阿飞", "rating": 4, "comment": "procreate流畅运行，但是屏幕没有pro的Promotion"},
    {"user": "职场Amy", "rating": 5, "comment": "轻办公完全够用，分屏看书查资料很方便"}
  ],
  },
  {
    id: 5,
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    category: 'smartphone',
    price: 8999,
    originalPrice: 9699,
    rating: 4.7,
    reviews: 2154,
    description: '骁龙8 Gen 3 · Galaxy AI智能助手 · 2亿像素相机 · S Pen内置 · 钛金属框架 · 5000mAh电池',
    image: 'https://picsum.photos/seed/galaxys24/400/300',
    badge: '新品',
    colors: ['#2d2d2d', '#f5e6cc', '#c4a882', '#6b7b8d'],
    storage: ['256GB', '512GB', '1TB']
  productReviews: [
    {"user": "安卓党小明", "rating": 5, "comment": "Galaxy AI太好用了，即圈即搜功能超方便"},
    {"user": "摄影师老王", "rating": 5, "comment": "长焦无敌，演唱会神器，S Pen也很有用"},
    {"user": "天天", "rating": 4, "comment": "OneUI还有待优化，但硬件是真的顶"}
  ],
  },
  {
    id: 6,
    name: 'Dell XPS 16',
    brand: 'Dell',
    category: 'laptop',
    price: 15999,
    originalPrice: 17999,
    rating: 4.6,
    reviews: 984,
    description: 'Intel Core Ultra 9 · RTX 4070 · 16.3英寸4K OLED · 64GB内存 · 铝合金机身 · 指纹识别',
    image: 'https://picsum.photos/seed/dellxps16/400/300',
    badge: '旗舰',
    colors: ['#c0c0c0', '#1a1a2e'],
    storage: ['512GB', '1TB', '2TB']
  productReviews: [
    {"user": "设计师林晨", "rating": 5, "comment": "4K OLED屏幕惊艳到我了，色准完美，设计工作首选"},
    {"user": "程序员凯文", "rating": 4, "comment": "性能释放不错，RTX4070跑深度学习可以的"},
    {"user": "商务人士", "rating": 4, "comment": "做工精致，但续航比预期短了点"}
  ],
  },
  {
    id: 7,
    name: 'AirPods Pro 2',
    brand: 'Apple',
    category: 'audio',
    price: 1899,
    originalPrice: 1999,
    rating: 4.8,
    reviews: 5213,
    description: 'H2芯片 · 自适应降噪 · 个性化空间音频 · 触控调节音量 · USB-C充电盒 · 6小时续航',
    image: 'https://picsum.photos/seed/airpodspro/400/300',
    badge: '爆款',
    colors: ['#ffffff'],
    storage: null
  productReviews: [
    {"user": "果粉小李", "rating": 5, "comment": "空间音频太绝了，看电影身临其境"},
    {"user": "跑步达人", "rating": 5, "comment": "戴着跑步完全不会掉，自适应降噪很智能"},
    {"user": "通勤族", "rating": 5, "comment": "降噪模式在地铁上也能听清播客，强烈推荐"},
    {"user": "音乐人Tony", "rating": 4, "comment": "音质比上一代有提升，但和有线比还是有差距"}
  ],
  },
  {
    id: 8,
    name: 'Google Pixel 8 Pro',
    brand: 'Google',
    category: 'smartphone',
    price: 6999,
    originalPrice: 7999,
    rating: 4.5,
    reviews: 1328,
    description: 'Tensor G3芯片 · 5000万像素专业相机 · AI魔术橡皮擦 · 6.7英寸120Hz LTPO屏幕 · 7年系统更新',
    image: 'https://picsum.photos/seed/pixel8pro/400/300',
    badge: null,
    colors: ['#3d3d3d', '#e8e0d0', '#7a9bb5'],
    storage: ['128GB', '256GB', '512GB']
  productReviews: [
    {"user": "谷歌粉", "rating": 5, "comment": "AI照片编辑魔法橡皮擦超强，拍照效果自然真实"},
    {"user": "极客小王", "rating": 4, "comment": "原生安卓体验确实好，7年更新太良心了"},
    {"user": "摄影爱好者", "rating": 4, "comment": "计算摄影很厉害，但硬件落后国产机了"}
  ],
  },
  {
    id: 9,
    name: 'Galaxy Tab S9 Ultra',
    brand: 'Samsung',
    category: 'tablet',
    price: 7999,
    originalPrice: 8999,
    rating: 4.6,
    reviews: 786,
    description: '14.6英寸Dynamic AMOLED 2X · 骁龙8 Gen 2 · IP68防水 · S Pen · 11200mAh电池 · DeX模式',
    image: 'https://picsum.photos/seed/tabs9ultra/400/300',
    badge: '大屏',
    colors: ['#1a1a2e', '#c0c0c0'],
    storage: ['256GB', '512GB', '1TB']
  productReviews: [
    {"user": "学生张涛", "rating": 5, "comment": "14寸大屏看文献PDF太舒服了，多窗口很实用"},
    {"user": "画画的小雨", "rating": 4, "comment": "S Pen延迟很低，画画体验不错，就是有点大"},
    {"user": "视频党", "rating": 5, "comment": "AMOLED屏幕看电影效果顶级，四扬声器很震撼"}
  ],
  },
  {
    id: 10,
    name: 'Apple Watch Ultra 2',
    brand: 'Apple',
    category: 'wearable',
    price: 5999,
    originalPrice: 6299,
    rating: 4.7,
    reviews: 1245,
    description: 'S9芯片 · 49mm钛金属表壳 · 2000尼特亮度 · 精准双频GPS · 86小时续航 · 水深温度感应',
    image: 'https://picsum.photos/seed/awu2/400/300',
    badge: '户外',
    colors: ['#c0c0c0', '#2d3a3a'],
    storage: null
  productReviews: [
    {"user": "户外达人", "rating": 5, "comment": "登山徒步记录轨迹很准，续航比普通版强太多了"},
    {"user": "潜水爱好者", "rating": 5, "comment": "带着潜水深40米完全ok，水温深度都能显示"},
    {"user": "商务KK", "rating": 4, "comment": "太大太重了，不过功能确实强大"}
  ],
  },
  {
    id: 11,
    name: 'Bose QuietComfort Ultra',
    brand: 'Bose',
    category: 'audio',
    price: 2999,
    originalPrice: 3299,
    rating: 4.7,
    reviews: 1836,
    description: '沉浸空间音频 · CustomTune智能调校 · 标志性降噪 · 24小时续航 · 骁龙畅听 · 折叠便携',
    image: 'https://picsum.photos/seed/boseqc/400/300',
    badge: '音质',
    colors: ['#2d2d2d', '#e0ddd5', '#5c3a2d'],
    storage: null
  productReviews: [
    {"user": "差旅党", "rating": 5, "comment": "沉浸式空间音频真的绝，坐飞机必备"},
    {"user": "音频评测师", "rating": 5, "comment": "CustomTune自适应校准很智能，每个耳朵校准一次"},
    {"user": "办公族Lisa", "rating": 4, "comment": "降噪和舒适度都比AirPods Max好，但收纳盒太大"}
  ],
  },
  {
    id: 12,
    name: 'Samsung Galaxy Watch 6 Classic',
    brand: 'Samsung',
    category: 'wearable',
    price: 3299,
    originalPrice: 3699,
    rating: 4.5,
    reviews: 956,
    description: '47mm · 旋转表圈 · 蓝宝石玻璃 · 身体成分测量 · 心电图 · 睡眠分析 · Wear OS · 全天续航',
    image: 'https://picsum.photos/seed/gwatch6/400/300',
    badge: null,
    colors: ['#2d2d2d', '#c0c0c0'],
    storage: null
  productReviews: [
    {"user": "健身达人", "rating": 5, "comment": "旋转表圈太好用了，体能追踪数据很专业"},
    {"user": "健康控", "rating": 4, "comment": "体脂和骨骼肌测量很准，睡眠分析也详细"},
    {"user": "颜值党", "rating": 5, "comment": "蓝宝石玻璃很有质感，机械表风格很优雅"}
  ],
  },

  // ---- ???? (13-27) ----
  {
    id: 13,
    name: 'Xiaomi 14 Ultra',
    brand: 'Xiaomi',
    category: 'smartphone',
    price: 5999,
    originalPrice: 6499,
    rating: 4.7,
    reviews: 3127,
    description: '骁龙8 Gen 3 · 徕卡光学Summilux镜头 · 1英寸LYT-900主摄 · 50MP全焦段 · 5300mAh金沙江电池 · 小米澎湃OS',
    image: 'https://picsum.photos/seed/xiaomi14u/400/300',
    badge: '旗舰',
    colors: ['#2d2d2d', '#f5f5f5', '#8a6d3b'],
    storage: ['256GB', '512GB', '1TB']
  productReviews: [
    {"user": "米粉阿强", "rating": 5, "comment": "徕卡拍照真的太毒了，德味十足，拍摄体验拉满"},
    {"user": "手机摄影师", "rating": 5, "comment": "一英寸大底+可变光圈，夜景表现堪比微单"},
    {"user": "实用主义者", "rating": 4, "comment": "性能拍照都顶级，但MIUI广告还是有点多"}
  ],
  },
  {
    id: 14,
    name: 'OnePlus 12',
    brand: 'OnePlus',
    category: 'smartphone',
    price: 4799,
    originalPrice: 5299,
    rating: 4.6,
    reviews: 1845,
    description: '骁龙8 Gen 3 · 2K 120Hz BOE东方屏 · 哈苏全焦段三摄 · 5400mAh+100W超级闪充 · 仿生振感马达 Turbo',
    image: 'https://picsum.photos/seed/oneplus12/400/300',
    badge: null,
    colors: ['#2d4730', '#f5f5f5', '#1a1a1a'],
    storage: ['256GB', '512GB', '1TB']
  productReviews: [
    {"user": "加油老用户", "rating": 5, "comment": "哈苏色系真的很舒服，快充100W太爽了"},
    {"user": "游戏玩家", "rating": 5, "comment": "东方屏显示效果顶级，玩游戏很流畅不发热"},
    {"user": "小美", "rating": 4, "comment": "性价比很高，但防水等级一般般"}
  ],
  },
  {
    id: 15,
    name: 'Nothing Phone (3)',
    brand: 'Nothing',
    category: 'smartphone',
    price: 3999,
    originalPrice: 4499,
    rating: 4.4,
    reviews: 892,
    description: '透明设计 · Glyph Interface灯光交互 · 骁龙8s Gen 3 · 50MP双摄 · 6.7英寸LTPO OLED · Nothing OS 3.0',
    image: 'https://picsum.photos/seed/nothing3/400/300',
    badge: '设计',
    colors: ['#f5f5f5', '#2d2d2d'],
    storage: ['256GB', '512GB']
  productReviews: [
    {"user": "设计控", "rating": 5, "comment": "Glyph灯光交互太酷了，独一无二的辨识度"},
    {"user": "极简主义", "rating": 4, "comment": "透明背板的设计理念很棒，系统也很干净"},
    {"user": "数码博主", "rating": 4, "comment": "颜值满分但相机中规中矩，适合追求个性的人"}
  ],
  },
  {
    id: 16,
    name: 'ThinkPad X1 Carbon Gen 12',
    brand: 'Lenovo',
    category: 'laptop',
    price: 12999,
    originalPrice: 14999,
    rating: 4.8,
    reviews: 721,
    description: 'Intel Core Ultra 7 · 14" 2.8K OLED · 16GB LPDDR5 · 航空级碳纤维 · 1.09kg超轻机身 · MIL-STD-810H军标认证',
    image: 'https://picsum.photos/seed/x1carbon/400/300',
    badge: '商务',
    colors: ['#2d2d2d'],
    storage: ['512GB', '1TB', '2TB']
  productReviews: [
    {"user": "商务精英", "rating": 5, "comment": "键盘手感一如既往的好，小红点还是那么好用"},
    {"user": "程序员老张", "rating": 5, "comment": "1kg出头真的很轻，每天背着通勤毫无压力"},
    {"user": "IT经理", "rating": 4, "comment": "质量可靠，军规认证不是吹的，但价格偏高"}
  ],
  },
  {
    id: 17,
    name: 'ROG Zephyrus G14',
    brand: 'ASUS',
    category: 'laptop',
    price: 10999,
    originalPrice: 12499,
    rating: 4.6,
    reviews: 1532,
    description: 'AMD Ryzen 9 · RTX 4070 · 14" 2.5K 165Hz · 16GB DDR5 · 1TB PCIe 4.0 · 冰翼散热 · 全铝合金机身',
    image: 'https://picsum.photos/seed/rogzephyrus/400/300',
    badge: '性能',
    colors: ['#2d2d2d', '#c0c0c0'],
    storage: ['1TB', '2TB']
  productReviews: [
    {"user": "游戏少年", "rating": 5, "comment": "RTX4070玩3A大作高画质稳60帧，散热很强"},
    {"user": "大学生", "rating": 5, "comment": "续航比想象中好，带去图书馆学习回来还有电"},
    {"user": "设计师", "rating": 4, "comment": "性能强颜值高，但屏幕偏小做设计有点勉强"}
  ],
  },
  {
    id: 18,
    name: 'iPad Pro 13" M4',
    brand: 'Apple',
    category: 'tablet',
    price: 9999,
    originalPrice: 10999,
    rating: 4.9,
    reviews: 654,
    description: 'M4芯片 · Ultra Retina XDR双层串联OLED · 超薄5.1mm · Apple Pencil Pro · 全新妙控键盘 · 全天续航',
    image: 'https://picsum.photos/seed/ipadprom4/400/300',
    badge: '旗舰',
    colors: ['#c0c0c0', '#2d2d2d'],
    storage: ['256GB', '512GB', '1TB', '2TB']
  productReviews: [
    {"user": "设计师小林", "rating": 5, "comment": "双层串联OLED太惊艳了，HDR内容亮度爆棚"},
    {"user": "插画师Amber", "rating": 5, "comment": "M4跑Procreate超流畅，新Pencil Pro悬停功能好用"},
    {"user": "视频剪辑师", "rating": 5, "comment": "5.1mm比想象中还薄，剪4K视频不卡顿"}
  ],
  },
  {
    id: 19,
    name: 'Xiaomi Pad 7 Pro',
    brand: 'Xiaomi',
    category: 'tablet',
    price: 3299,
    originalPrice: 3699,
    rating: 4.5,
    reviews: 1089,
    description: '骁龙8 Gen 3领先版 · 12.4" 3K 144Hz · 10000mAh+120W秒充 · 多功能办公配件 · 小米澎湃OS · 8扬声器',
    image: 'https://picsum.photos/seed/mipad7pro/400/300',
    badge: '性价比',
    colors: ['#3d5a80', '#f5f5f5'],
    storage: ['256GB', '512GB']
  productReviews: [
    {"user": "学生党", "rating": 5, "comment": "3K屏看书很清晰，120W充电太快了"},
    {"user": "考研党Amy", "rating": 4, "comment": "记笔记看网课足够用了，性价比很高"},
    {"user": "家庭用户", "rating": 5, "comment": "买给小孩上网课，屏幕大护眼做得不错"}
  ],
  },
  {
    id: 20,
    name: 'Sony WF-1000XM5',
    brand: 'Sony',
    category: 'audio',
    price: 1999,
    originalPrice: 2499,
    rating: 4.7,
    reviews: 2846,
    description: '新一代降噪芯片 · 8.4mm驱动单元X · Hi-Res Wireless · LDAC · IPX4防水 · 舒适降噪豆 · 24h总续航',
    image: 'https://picsum.photos/seed/wfxm5/400/300',
    badge: null,
    colors: ['#2d2d2d', '#f5f5f5'],
    storage: null
  productReviews: [
    {"user": "通勤族", "rating": 5, "comment": "降噪豆里最强没有之一，比Bose更均衡"},
    {"user": "音乐爱好者", "rating": 5, "comment": "LDAC音质真的很棒，高音清澈低音有力"},
    {"user": "运动达人", "rating": 4, "comment": "IPX4防水跑步够用，但比xm4大了一点"}
  ],
  },
  {
    id: 21,
    name: 'AirPods Max',
    brand: 'Apple',
    category: 'audio',
    price: 3999,
    originalPrice: 4399,
    rating: 4.6,
    reviews: 2156,
    description: 'Apple H1芯片 · 主动降噪+通透模式 · 高保真音质 · 不锈钢头梁 · 记忆棉耳罩 · 20h续航 · 闪电充电',
    image: 'https://picsum.photos/seed/airpodsmax/400/300',
    badge: null,
    colors: ['#c0c0c0', '#3d3d3d', '#3d5a80', '#8b4513'],
    storage: null
  productReviews: [
    {"user": "果粉", "rating": 5, "comment": "音质比AirPods Pro好太多了，耳罩佩戴很舒适"},
    {"user": "音频发烧友", "rating": 4, "comment": "音质不错但价格偏贵，而且没有开关机键不太方便"},
    {"user": "设计师", "rating": 4, "comment": "颜值高质感好，但智能保护套的设计很奇葩"}
  ],
  },
  {
    id: 22,
    name: 'Oura Ring 4',
    brand: 'Oura',
    category: 'wearable',
    price: 2999,
    originalPrice: 3299,
    rating: 4.5,
    reviews: 1342,
    description: '钒金属智能戒指 · 睡眠追踪 · 心率/血氧/压力监测 · 活动评分 · 体温趋势 · 7天续航 · 隐形佩戴',
    image: 'https://picsum.photos/seed/ouraring4/400/300',
    badge: null,
    colors: ['#c0c0c0', '#2d2d2d', '#8a6d3b'],
    storage: null
  productReviews: [
    {"user": "健康达人", "rating": 5, "comment": "睡眠追踪比手表准，白天戴着也不突兀"},
    {"user": "创业者", "rating": 4, "comment": "压力监测很有用，但订阅费让人有点不爽"},
    {"user": "运动爱好者", "rating": 5, "comment": "活动评分很科学，激励你每天完成目标"}
  ],
  },
  {
    id: 23,
    name: 'Huawei Watch GT 4',
    brand: 'Huawei',
    category: 'wearable',
    price: 1588,
    originalPrice: 1788,
    rating: 4.6,
    reviews: 4521,
    description: '46mm · 1.43" AMOLED · 活力三环 · TruSeen 5.5心率 · 100+运动模式 · 北斗+GPS · 14天超长续航',
    image: 'https://picsum.photos/seed/hwgt4/400/300',
    badge: '热卖',
    colors: ['#2d2d2d', '#c0c0c0', '#8a6d3b'],
    storage: null
  productReviews: [
    {"user": "华为粉", "rating": 5, "comment": "14天续航太强了，比Apple Watch省心太多"},
    {"user": "跑步控", "rating": 5, "comment": "GPS定位很准，运动数据丰富，表盘选择多"},
    {"user": "职场人士", "rating": 4, "comment": "外观商务大气，但第三方的应用生态还不够"}
  ],
  },
  {
    id: 24,
    name: 'Nintendo Switch OLED',
    brand: 'Nintendo',
    category: 'gaming',
    price: 2599,
    originalPrice: 2899,
    rating: 4.8,
    reviews: 8652,
    description: '7" OLED屏幕 · 可拆卸Joy-Con · 掌机/主机/TV模式 · 482g轻便 · 64GB内存 · 最长9h续航 · 多款独占大作',
    image: 'https://picsum.photos/seed/nsswitch/400/300',
    badge: '爆款',
    colors: ['#ff3b30', '#3d3d3d', '#00bfff'],
    storage: ['64GB']
  productReviews: [
    {"user": "游戏宅", "rating": 5, "comment": "OLED屏幕提升巨大，掌机模式下色彩艳丽很多"},
    {"user": "任天堂粉", "rating": 5, "comment": "塞尔达+马里奥，这两个独占就值回票价了"},
    {"user": "家庭用户", "rating": 5, "comment": "买来给孩子玩的，全家一起玩很适合亲子互动"},
    {"user": "掌机爱好者", "rating": 4, "comment": "性能确实落后了，希望下一代早日到来"}
  ],
  },
  {
    id: 25,
    name: 'PlayStation 5 Slim',
    brand: 'Sony',
    category: 'gaming',
    price: 3599,
    originalPrice: 3999,
    rating: 4.7,
    reviews: 5431,
    description: 'AMD Zen2+RDNA 3 · 超高速SSD · DualSense无线手柄 · 4K 120Hz · 光线追踪 · 向下兼容PS4 · 薄款设计',
    image: 'https://picsum.photos/seed/ps5slim/400/300',
    badge: null,
    colors: ['#ffffff', '#2d2d2d'],
    storage: ['1TB']
  productReviews: [
    {"user": "主机玩家", "rating": 5, "comment": "DualSense手柄的触觉反馈太绝了，沉浸感拉满"},
    {"user": "战神粉", "rating": 4, "comment": "独占游戏质量高，但体积还是偏大"},
    {"user": "跨平台玩家", "rating": 5, "comment": "读盘速度快到离谱，SSD确实是次世代标配"}
  ],
  },
  {
    id: 26,
    name: 'Xbox Series X 1TB',
    brand: 'Microsoft',
    category: 'gaming',
    price: 3899,
    originalPrice: 4299,
    rating: 4.6,
    reviews: 3258,
    description: 'AMD Zen2+RDNA 2 · 12TFLOPS · 1TB NVMe SSD · Quick Resume · 4K 120Hz · 光线追踪 · Xbox Game Pass',
    image: 'https://picsum.photos/seed/xboxsx/400/300',
    badge: null,
    colors: ['#2d2d2d'],
    storage: ['1TB', '2TB']
  productReviews: [
    {"user": "XGP用户", "rating": 5, "comment": "Xbox Game Pass太香了，几百块钱玩几百个游戏"},
    {"user": "射击游戏粉", "rating": 4, "comment": "Quick Resume太好用了，但手柄不带陀螺仪"},
    {"user": "家庭用户", "rating": 5, "comment": "给小孩生日买的，小朋友超级喜欢"}
  ],
  },
  {
    id: 27,
    name: 'Steam Deck OLED',
    brand: 'Valve',
    category: 'gaming',
    price: 4599,
    originalPrice: 4999,
    rating: 4.7,
    reviews: 1892,
    description: 'AMD APU · 7.4" HDR OLED 90Hz · SteamOS · 512GB/1TB · 全能掌机 · 数千款PC游戏 · 主动散热 · 可扩展SSD',
    image: 'https://picsum.photos/seed/steamdeck/400/300',
    badge: '新品',
    colors: ['#2d2d2d'],
    storage: ['512GB', '1TB']
  productReviews: [
    {"user": "PC玩家", "rating": 5, "comment": "HDR OLED屏幕太美了，PC游戏随身带的梦想成真"},
    {"user": "出差党", "rating": 5, "comment": "出差终于可以玩文明6了，续航也比LCD版好很多"},
    {"user": "独立游戏迷", "rating": 5, "comment": "Steam OS体验完整，Hades和Dead Cells玩到停不下来"}
  ],
  }
]
