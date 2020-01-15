// 因为a岛的 分类接口不是 https协议 如果需要板块只能 写死了 QAQ

const colorlist=['red','orange','yellow','olive','cyan','blue','purple','mauve','pink','brown']




const imgPrefix="https://nmbimg.fastmirror.org/thumb/"

const tabList =[
        {
            "fgroup": "4",
            "id": "4",
            "name": "综合版1",
            "showName": "",
            "rule": "发言前请点击右上角版规，并通过值班室和城墙版了解违规范围\n 本岛普遍反感情感、晒妹、嘴臭，禁止涉政涉黄犯罪等内容"
        },
        {
            "fgroup": "4",
            "id": "120",
            "name": "围炉",
            "showName": "综合2(围炉)"
        },
        {
            "fgroup": "4",
            "id": "20",
            "name": "欢乐恶搞",
            "showName": "",
            "rule": "前提是欢乐，其次才可以恶搞\n 这里不是法外之地，请遵守总版规"
        },
        {
            "fgroup": "4",
            "id": "121",
            "name": "速报2",
            "showName": "速报2",
            "rule": "时事/热点/民生等社会性话题请只在本版进行讨论\n 消息需完整，国内消息需来源自官媒或可信媒体（严禁自媒体）\n 严禁键政或转进敏感话题"
        },
        {
            "fgroup": "4",
            "id": "11",
            "name": "推理",
            "showName": "推理(脑洞)"
        },
        {
            "fgroup": "4",
            "id": "111",
            "name": "跑团",
            "showName": "跑团",
            "rule": "请勿发表违法内容，完结或弃坑团请在版规集中串中求助本版红名"
        },
        {
            "fgroup": "4",
            "id": "30",
            "name": "技术宅",
            "showName": "技术(IT)",
            "rule": "纯软件技术讨论，硬件讨论请至数码版"
        },
        {
            "fgroup": "4",
            "id": "32",
            "name": "料理",
            "showName": "料理"
        },
        {
            "fgroup": "4",
            "id": "40",
            "name": "猫版",
            "showName": "喵版"
        },
        {
            "fgroup": "4",
            "id": "35",
            "name": "音乐",
            "showName": ""
        },
        {
            "fgroup": "4",
            "id": "56",
            "name": "考试",
            "showName": "学业(校园)",
            "rule": "考试版，可以备考互助、日西成绩"
        },
        {
            "fgroup": "4",
            "id": "110",
            "name": "社畜",
            "showName": "社畜",
            "rule": "可以讨论工作、投资、车房、养老相关，禁止晒妹晒配偶\n 育儿相关请至育儿版\n 投资有风险，请谨慎考虑张贴真实信息的后果，本站不对个人信息泄露引起的后果负责"
        },
        {
            "fgroup": "4",
            "id": "15",
            "name": "科学",
            "showName": "科学(理学)"
        },
        {
            "fgroup": "4",
            "id": "103",
            "name": "文学",
            "showName": "文学(推书)"
        },
        {
            "fgroup": "4",
            "id": "17",
            "name": "二次创作",
            "showName": "绘画涂鸦(二创)",
            "rule": "深海巨触与萌新沙包的乐园，欢迎贴原创或二创绘图或毁图，严禁擦边涉黄内容"
        },
        {
            "fgroup": "4",
            "id": "98",
            "name": "姐妹1",
            "showName": "姐妹(淑女)",
            "rule": "这里默认使用女性视角发言，本版普遍反感情感和刷存在感等内容"
        },
        {
            "fgroup": "4",
            "id": "75",
            "name": "数码",
            "showName": "",
            "rule": "3C数码硬件相关讨论，水军自重，软件请到技术版"
        },
        {
            "fgroup": "4",
            "id": "97",
            "name": "女装",
            "showName": "女装(时尚)",
            "rule": "女装只有0次和无数次！\n 请把握尺度，禁止发表擦边内容"
        },
        {
            "fgroup": "4",
            "id": "89",
            "name": "日记",
            "showName": "日记(树洞)",
            "rule": "这里发串不会显示在时间线\n 原则上不鼓励骚扰他人，Po主可点举报要求删除自己串内的回复\n 禁止发表违法违规内容"
        },
        {
            "fgroup": "4",
            "id": "96",
            "name": "圈内",
            "showName": "",
            "rule": "一切岛务都在集中串中讨论，有事找红名前请先自助查询集中串FAQ\n 这里不欢迎骑脸的云红名，不满现状的最好办法是答题充值，脚踏实地为岛民服务"
        },
        {
            "fgroup": "4",
            "id": "81",
            "name": "都市怪谈",
            "showName": ""
        },
        {
            "fgroup": "4",
            "id": "106",
            "name": "买买买",
            "showName": "买买买",
            "rule": "禁止擅自发表商业广告、推广链接，在本站打广告请联系help@adnmb.com\n 友情提示：网络交易有风险，二手交易信息请至集中串发布，单开删除"
        },
        {
            "fgroup": "1",
            "id": "14",
            "name": "动画",
            "showName": "",
            "rule": "发布新串前请善用搜索，如有相关集中串，请勿单独另发"
        },
        {
            "fgroup": "1",
            "id": "12",
            "name": "漫画",
            "showName": "",
            "rule": "发图、求问或指路黄漫等同于发车会被封禁，请勿发表擦边内容"
        },
        {
            "fgroup": "1",
            "id": "90",
            "name": "美漫",
            "showName": "美漫(小马)"
        },
        {
            "fgroup": "1",
            "id": "99",
            "name": "国漫",
            "showName": ""
        },
        {
            "fgroup": "1",
            "id": "19",
            "name": "小说",
            "showName": "小说(连载)"
        },
        {
            "fgroup": "1",
            "id": "87",
            "name": "轻小说",
            "showName": ""
        },
        {
            "fgroup": "1",
            "id": "64",
            "name": "GALGAME",
            "showName": ""
        },
        {
            "fgroup": "1",
            "id": "5",
            "name": "东方Project",
            "showName": ""
        },
        {
            "fgroup": "1",
            "id": "93",
            "name": "舰娘",
            "showName": ""
        },
        {
            "fgroup": "1",
            "id": "101",
            "name": "虚拟偶像",
            "showName": "虚拟偶像(LL)"
        },
        {
            "fgroup": "1",
            "id": "6",
            "name": "VOCALOID",
            "showName": ""
        },
        {
            "fgroup": "3",
            "id": "2",
            "name": "游戏",
            "showName": "游戏综合版",
            "rule": "发布新串前请善用搜索，如有相关集中串，请勿单独另发"
        },
        {
            "fgroup": "3",
            "id": "72",
            "name": "DNF",
            "showName": ""
        },
        {
            "fgroup": "3",
            "id": "124",
            "name": "SE",
            "showName": "Square-Enix"
        },
        {
            "fgroup": "3",
            "id": "3",
            "name": "手游",
            "showName": "手游"
        },
        {
            "fgroup": "3",
            "id": "107",
            "name": "Steam",
            "showName": "Steam"
        },
        {
            "fgroup": "3",
            "id": "24",
            "name": "索尼",
            "showName": ""
        },
        {
            "fgroup": "3",
            "id": "22",
            "name": "LOL",
            "showName": ""
        },
        {
            "fgroup": "3",
            "id": "70",
            "name": "DOTA",
            "showName": "DOTA+刀牌"
        },
        {
            "fgroup": "3",
            "id": "38",
            "name": "口袋妖怪",
            "showName": "精灵宝可梦"
        },
        {
            "fgroup": "3",
            "id": "86",
            "name": "战争雷霆",
            "showName": ""
        },
        {
            "fgroup": "3",
            "id": "51",
            "name": "WOT",
            "showName": "坦克战机战舰世界"
        },
        {
            "fgroup": "3",
            "id": "10",
            "name": "Minecraft",
            "showName": ""
        },
        {
            "fgroup": "3",
            "id": "28",
            "name": "怪物猎人",
            "showName": ""
        },
        {
            "fgroup": "3",
            "id": "108",
            "name": "3A游戏",
            "showName": "3A游戏"
        },
        {
            "fgroup": "3",
            "id": "119",
            "name": "彩虹六号",
            "showName": "彩虹六号"
        },
        {
            "fgroup": "3",
            "id": "23",
            "name": "暴雪游戏",
            "showName": "暴雪游戏"
        },
        {
            "fgroup": "3",
            "id": "45",
            "name": "卡牌桌游",
            "showName": ""
        },
        {
            "fgroup": "3",
            "id": "34",
            "name": "MUG",
            "showName": "音乐游戏"
        },
        {
            "fgroup": "3",
            "id": "29",
            "name": "AC大逃杀",
            "showName": ""
        },
        {
            "fgroup": "3",
            "id": "25",
            "name": "任天堂",
            "showName": ""
        },
        {
            "fgroup": "8",
            "id": "16",
            "name": "AKB",
            "showName": "日本偶像(AKB)"
        },
        {
            "fgroup": "8",
            "id": "100",
            "name": "SNH48",
            "showName": "中国偶像(SNH)"
        },
        {
            "fgroup": "8",
            "id": "13",
            "name": "COSPLAY",
            "showName": "眼科(Cosplay)"
        },
        {
            "fgroup": "8",
            "id": "55",
            "name": "声优",
            "showName": ""
        },
        {
            "fgroup": "8",
            "id": "39",
            "name": "模型",
            "showName": "模型(手办)"
        },
        {
            "fgroup": "5",
            "id": "31",
            "name": "影视",
            "showName": "电影/电视"
        },
        {
            "fgroup": "5",
            "id": "54",
            "name": "摄影",
            "showName": ""
        },
        {
            "fgroup": "5",
            "id": "37",
            "name": "军武",
            "showName": "",
            "rule": "请勿涉政转进，违者直接碎光"
        },
        {
            "fgroup": "5",
            "id": "33",
            "name": "体育",
            "showName": "体育"
        },
        {
            "fgroup": "6",
            "id": "18",
            "name": "值班室",
            "showName": "",
            "rule": "举报处理时间通常为半天左右，SAGE表示已阅，欢迎充值红名，为维持A岛的和谐讨论环境贡献一份力量"
        },
        {
            "fgroup": "6",
            "id": "112",
            "name": "城墙",
            "showName": "",
            "rule": "看看版规？你确定仍要在这里发言吗？"
        },
        {
            "fgroup": "6",
            "id": "117",
            "name": "技术支持",
            "showName": "",
            "rule": "请描述清楚现象（发生了什么），复现方法（怎么做才会发生），网络环境（地理位置，运营商），账号信息（如有必要）\n 打不开岛时可以使用绿岛app的网络诊断功能发送到admin@adnmb.com"
        },
        {
            "fgroup": "1",
            "id": "114",
            "name": "询问3",
            "showName": "询问3",
            "rule": "云搜索版，伸手前请百度，禁止任何违法违规内容"
        },
        {
            "fgroup": "1",
            "id": "118",
            "name": "宠物",
            "showName": "宠物",
            "rule": "可以发表除猫以外的各种宠物（包括狗）相关内容，撸猫请至猫版"
        },
        {
            "fgroup": "1",
            "id": "115",
            "name": "摄影2",
            "showName": "摄影2",
            "rule": "禁止发盗摄，发表作品时请尽量附上EXIF信息，写明光圈快门ISO机身镜头型号等方便学习交流"
        },
        {
            "fgroup": "8",
            "id": "116",
            "name": "主播",
            "showName": "主播",
            "rule": "可以讨论包括但不限于国内外虚拟主播、真人主播的直播、录播和主播本人相关话题\n 禁止人身攻击、踩一捧一，不支持挖中之人/前世以及gachi串中anti行为"
        },
        {
            "fgroup": "4",
            "id": "113",
            "name": "育儿",
            "showName": "育儿",
            "rule": "可以晒娃，不可以晒妹"
        },
        {
            "fgroup": "1",
            "id": "120",
            "name": "围炉",
            "showName": "",
            "rule": "尊重他人才能获得温暖，本版禁止一切广义上的现充、骑脸和暴躁行为"
        },
        {
            "fgroup": "1",
            "id": "9",
            "name": "特摄",
            "showName": "特摄"
        }
    ]
const newsList = [{
		id: 1,
		title: '从亲密无间到相爱相杀，这就是人类一败涂地的真相',
		author: 'TapTap',
		images: [
			'http://fc-feed.cdn.bcebos.com/0/pic/9107b498a0cbea000842763091e833b6.jpg',
			'http://fc-feed.cdn.bcebos.com/0/pic/dc4b0610241d7016279f4f4652ea0886.jpg',
			'http://fc-feed.cdn.bcebos.com/0/pic/0f6effa42536fb5c2ca945bd46c59335.jpg',
		],
		time: '2小时前',
		type: 3,
	}
]


export default {
	tabList,
	newsList,
	colorlist
}
