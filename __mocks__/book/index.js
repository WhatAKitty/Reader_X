/**
 *  'BookId': 1006853204,
    'BookName': '文化入侵异世界',
    'AuthorId': 3112022,
    'Author': '姐姐的新娘',
    'IsVip': 1,
    'ImageStatus': 1,
    'LastUpdateChapterID': 376292828,
    'LastUpdateChapterName': '第三百零一章 过时',
    'LastChapterUpdateTime': 1506786023000,
    'LastVipUpdateChapterId': 387124661,
    'LastVipUpdateChapterName': '第三百零一章 过时',
    'LastVipChapterUpdateTime': 1506786023000,
    'WordsCount': 682009,
    'CategoryName': '科幻',
    'subCategoryName': '时空穿梭',
    'CategoryId': 100117,
    'BookStatus': '连载',
    'EnableBookUnitBuy': 0,
    'EnableBookUnitLease': 0,
    'BssReadTotal': 685864,
    'BssRecomTotal': 152538,
    'Label': '明星|种田文|赚钱',
    'Description': '一群巨龙搬着小板凳日夜追看《权力游戏》。精灵大德鲁伊们因为《忠犬八公的故事》而潸然泪下。人类与矮人在《炉石传说》酒馆中为一张传说卡牌而大大出手。甚至就连神明也亲',
    'ReadingType': 5,
    'AlgInfo': '',
    'Adid': 0,
    'overrating': null,
    'SourceType': 0,
    'SourceDesc': null,
    'AuthorTagId': '明星|种田文|赚钱',
    'BookInternalId': 5841993,
    'prob': 0,
    'recommendRate': null,
    'staticscore1': 5423
 */
import { Mock } from 'react-native-fetch-mock';

export default {
  '/api/v1/books': ({ method, url, params, urlparams, headers }) => {
    const all = Mock.mock({
      'list|2': [{
        'bookId|+1': 1006853204,
        'bookName': '文化入侵异世界',
        'authorId': 3112022,
        'author': '姐姐的新娘',
        'isVip': 1,
        'imageStatus': 1,
        'lastUpdateChapterID': 376292828,
        'lastUpdateChapterName': '第三百零一章 过时',
        'lastChapterUpdateTime': 1506786023000,
        'lastVipUpdateChapterId': 387124661,
        'lastVipUpdateChapterName': '第三百零一章 过时',
        'lastVipChapterUpdateTime': 1506786023000,
        'wordsCount': 682009,
        'categoryName': '科幻',
        'subCategoryName': '时空穿梭',
        'categoryId': 100117,
        'bookStatus': '连载',
        'enableBookUnitBuy': 0,
        'enableBookUnitLease': 0,
        'bssReadTotal': 685864,
        'bssRecomTotal': 152538,
        'label': '明星|种田文|赚钱',
        'description': '一群巨龙搬着小板凳日夜追看《权力游戏》。精灵大德鲁伊们因为《忠犬八公的故事》而潸然泪下。人类与矮人在《炉石传说》酒馆中为一张传说卡牌而大大出手。甚至就连神明也亲',
        'readingType': 5,
        'algInfo': '',
        'adid': 0,
        'overrating': null,
        'sourceType': 0,
        'sourceDesc': null,
        'authorTagId': '明星|种田文|赚钱',
        'bookInternalId': 5841993,
        'prob': 0,
        'recommendRate': null,
        'staticscore1': 5423
      }]
    }).list;
    return {
      status: 200,
      data: all,
    };
  },
  '/api/v1/books/{id}': ({ method, url, params, urlparams, headers }) => {
    const obj = Mock.mock({
      'obj': {
        'BookId': 1209977,
        'BookName': '斗破苍穹',
        'AuthorId': 1019021,
        'Author': '天蚕土豆',
        'ChannelId': 1,
        'ChannelName': '奇幻·玄幻',
        'WordsCnt': 5194967,
        'CategoryId': 21,
        'CategoryName': '玄幻',
        'SubCategoryName': '异世大陆',
        'SubCategoryId': 73,
        'CollectCnt': 1532249,
        'ShowTime': 0,
        'BookIntro': null,
        'ForumId': 0,
        'FreeType': 1,
        'ImageStatus': 1,
        'RecommendAll': 6693122,
        'ClickAll': 150655136,
        'ClickMonth': 114,
        'ClickWeek': 60,
        'VoteAll': 6693122,
        'VoteMonth': 379,
        'VoteWeek': 180,
        'LastVipUpdateChapterId': 23720626,
        'LastVipUpdateChapterName': '新书大主宰已发。',
        'LastVipChapterUpdateTime': 1372821505000,
        'LastUpdateChapterID': 23720626,
        'LastUpdateChapterName': '第九十五章 眼光挺差',
        'LastChapterUpdateTime': 1243770561000,
        'AuthorOtherBooksCount': 2,
        'BookFansCount': 3392723,
        'LastUpdateChapter': '',
        'LastUpdateVipChapter': '',
        'IsMeng': 0,
        'IsVip': 1,
        'BookStatus': '完本',
        'SignStatus': 'Ａ级签约',
        'IsCanDaShang': 1,
        'IscanPraise': 0,
        'IsQin': 0,
        'YinXiang': {
          'Enable': 1,
          'LabelList': [{
            'Name': '热血',
            'Count': 7
          }, {
            'Name': '斗气',
            'Count': 6
          }, {
            'Name': '小白',
            'Count': 5
          }, {
            'Name': '奋斗',
            'Count': 2
          }, {
            'Name': '淡定',
            'Count': 2
          }, {
            'Name': '励志',
            'Count': 1
          }, {
            'Name': '爽文',
            'Count': 1
          }, {
            'Name': '胖子',
            'Count': 1
          }],
          'DefaultLabel': null
        },
        'RpId': 0,
        'From': '起点中文网',
        'WholeSale': 0,
        'TotalPrice': 0,
        'Chapters': null,
        'Volumes': null,
        'FirstVipChapterId': 0,
        'FirstUnitId': 0,
        'BookHonor': [{
          'Honors': '精品频道',
          'Time': 1373230801000,
          'HonorType': 'Badge',
          'HonorICON': 'https://qidian.gtimg.com/qd/images/book/badges/84jingpinpindao.png',
          'HonorSubTitle': '被收录入精品频道'
        }, {
          'Honors': '习惯性爆发',
          'Time': 1340764715000,
          'HonorType': 'Badge',
          'HonorICON': 'https://qidian.gtimg.com/qd/images/book/badges/84xiguanxingbaofa.png',
          'HonorSubTitle': '正式章节10次以上日更万字'
        }, {
          'Honors': '日进斗金',
          'Time': 1331775390000,
          'HonorType': 'Badge',
          'HonorICON': 'https://qidian.gtimg.com/qd/images/book/badges/84rijindoujin.png',
          'HonorSubTitle': '单天获得100W起点币的打赏'
        }, {
          'Honors': '谢主隆恩',
          'Time': 1331706961000,
          'HonorType': 'Badge',
          'HonorICON': 'https://qidian.gtimg.com/qd/images/book/badges/84xiezhulongen.png',
          'HonorSubTitle': '获得过10000次打赏'
        }, {
          'Honors': '月票第一',
          'Time': 1331615746000,
          'HonorType': 'Badge',
          'HonorICON': 'https://qidian.gtimg.com/qd/images/book/badges/84yuepiaodiyi.png',
          'HonorSubTitle': '曾经获得过单月月票榜第一'
        }, {
          'Honors': '百盟争霸',
          'Time': 1330072635000,
          'HonorType': 'Badge',
          'HonorICON': 'https://qidian.gtimg.com/qd/images/book/badges/84baimengzhengba.png',
          'HonorSubTitle': '拥有100个及以上盟主级别粉丝'
        }, {
          'Honors': '更上一层楼',
          'Time': 1249401600000,
          'HonorType': 'Badge',
          'HonorICON': 'https://qidian.gtimg.com/qd/images/book/badges/84gengshangyicenglou.png',
          'HonorSubTitle': '连续30天至少日更3000字'
        }],
        'AuthorInfo': {
          'RealImageUrl': 'https://qidian.qpic.cn/qd_face/349573/520843/100',
          'AuthorDesc': '网络文学资深玄幻小说作家',
          'AuthorBook': '著有《斗破苍穹》《武动乾坤》《大主宰》',
          'UserId': 20224457,
          'IsFollow': 0,
          'AuthorId': 1019021,
          'AuthorName': '天蚕土豆',
          'AuthorLevel': 'Lv5',
          'AuthorLevelId': 3,
          'Books': null,
          'AuthorWordsCount': 0,
          'WriteDayCount': 0,
          'AuthorFansCount': 8655340,
          'AuthorDynamic': null,
          'DynamicInfo': null,
          'AuthorTitleInfo': null,
          'NewBookNoticeInfoList': null,
          'TABookList': null,
          'YOUTABookList': null
        },
        'AuthorRecommend': [{
          'BookId': 2048120,
          'BookName': '武动乾坤',
          'AuthorId': 1019021,
          'AuthorName': '',
          'Author': '天蚕土豆',
          'CategoryId': 21,
          'CategoryName': '玄幻',
          'ImageStatus': 1,
          'LastUpdateChapterID': 34384468,
          'LastUpdateChapterName': '第九十三章 古大师',
          'LastChapterUpdateTime': 1314781451000,
          'LastVipUpdateChapterId': 34384468,
          'LastVipUpdateChapterName': '新书大主宰已发。',
          'LastVipChapterUpdateTime': 1372821529000,
          'IsVip': 1,
          'BookStatus': '完本',
          'WordsCount': 0,
          'Label': null,
          'IsQin': 0,
          'BssReadTotal': 73026504,
          'BssRecomTotal': 739104,
          'Price': null,
          'NewPrice': null,
          'Recommendation': null,
          'RecommenId': 0,
          'GroupName': '作者还写过',
          'ReadingType': 5,
          'AlgInfo': '',
          'PartCount': 0,
          'SourceBookId': 0,
          'BookPartInfo': null,
          'ChargeType': 0,
          'TotalPrice': 0,
          'Description': '修炼一途，乃窃阴阳，夺造化，转涅盘，握生死，掌轮回。武之极，...'
        }, {
          'BookId': 2750457,
          'BookName': '大主宰',
          'AuthorId': 1019021,
          'AuthorName': '',
          'Author': '天蚕土豆',
          'CategoryId': 21,
          'CategoryName': '玄幻',
          'ImageStatus': 1,
          'LastUpdateChapterID': 47024266,
          'LastUpdateChapterName': '我的第四本书要上架了，请大家内详。',
          'LastChapterUpdateTime': 1375260889000,
          'LastVipUpdateChapterId': 47024266,
          'LastVipUpdateChapterName': '第一千五百五十一章 邪神陨落（大结局）',
          'LastVipChapterUpdateTime': 1499518184000,
          'IsVip': 1,
          'BookStatus': '完本',
          'WordsCount': 0,
          'Label': null,
          'IsQin': 0,
          'BssReadTotal': 36651788,
          'BssRecomTotal': 1590024,
          'Price': null,
          'NewPrice': null,
          'Recommendation': null,
          'RecommenId': 0,
          'GroupName': '作者还写过',
          'ReadingType': 5,
          'AlgInfo': '',
          'PartCount': 0,
          'SourceBookId': 0,
          'BookPartInfo': null,
          'ChargeType': 0,
          'TotalPrice': 0,
          'Description': '大千世界，位面交汇，万族林立，群雄荟萃，一位位来自下位面的天...'
        }],
        'BookFriendsRecommend': [{
          'BookId': 2180332,
          'BookName': '肌肉魔法师',
          'AuthorId': 2336208,
          'AuthorName': '',
          'Author': '烟雨织轻愁',
          'CategoryId': 21,
          'CategoryName': '玄幻',
          'ImageStatus': 1,
          'LastUpdateChapterID': 49853232,
          'LastUpdateChapterName': '第六十六章：大结局',
          'LastChapterUpdateTime': 1386639877000,
          'LastVipUpdateChapterId': 49853232,
          'LastVipUpdateChapterName': '',
          'LastVipChapterUpdateTime': -62135798400000,
          'IsVip': 0,
          'BookStatus': '完本',
          'WordsCount': 0,
          'Label': null,
          'IsQin': 0,
          'BssReadTotal': 16884,
          'BssRecomTotal': 100,
          'Price': null,
          'NewPrice': null,
          'Recommendation': null,
          'RecommenId': 0,
          'GroupName': '书友还看过',
          'ReadingType': 4,
          'AlgInfo': '180.7.2',
          'PartCount': 0,
          'SourceBookId': 0,
          'BookPartInfo': null,
          'ChargeType': 0,
          'TotalPrice': 0,
          'Description': '流氓不可怕，可怕流氓有文化！魔法师不可怕，可怕魔法师有肌肉！什么？你是魔法师？我也是魔法师，并且我敢保证，我施展魔法比你快！什么？你是武士？不好意思，我是炼体士，凭你的攻击，根本就破不了我的防！重生后的林飞，完美地利用前世的种种机缘，一步步地踏上巅峰！这一世，势不留下遗憾！'
        }, {
          'BookId': 3506478,
          'BookName': '妖神记',
          'AuthorId': 1038481,
          'AuthorName': '',
          'Author': '发飙的蜗牛',
          'CategoryId': 21,
          'CategoryName': '玄幻',
          'ImageStatus': 1,
          'LastUpdateChapterID': 86286632,
          'LastUpdateChapterName': '第一百三十二章 拳刺（急求推荐票！！）',
          'LastChapterUpdateTime': 1438326101000,
          'LastVipUpdateChapterId': 86286632,
          'LastVipUpdateChapterName': '第四百五十七章 女弟子',
          'LastVipChapterUpdateTime': 1505014046000,
          'IsVip': 1,
          'BookStatus': '连载',
          'WordsCount': 0,
          'Label': null,
          'IsQin': 0,
          'BssReadTotal': 3058603,
          'BssRecomTotal': 183410,
          'Price': null,
          'NewPrice': null,
          'Recommendation': null,
          'RecommenId': 0,
          'GroupName': '书友还看过',
          'ReadingType': 5,
          'AlgInfo': '180.7.2',
          'PartCount': 0,
          'SourceBookId': 0,
          'BookPartInfo': null,
          'ChargeType': 0,
          'TotalPrice': 0,
          'Description': '妖神重生，谁与争锋。这是一个妖灵的世界，人们猎杀妖兽，获取妖灵，将妖灵融入灵魂海中，就可以获得强大的力量。因为一本时空妖灵之书，聂离回到了年少的时代……~~《妖神记》是蜗牛精心雕琢的一部玄幻作品，将会是一部与众不同的玄幻故事，另外《妖神记》的漫画也在腾讯动漫同时发布，画风非常精美，请大家多多支持。~~'
        }, {
          'BookId': 1004853354,
          'BookName': '天主凡人',
          'AuthorId': 3327498,
          'AuthorName': '',
          'Author': '落十方',
          'CategoryId': 21,
          'CategoryName': '玄幻',
          'ImageStatus': 1,
          'LastUpdateChapterID': 369180392,
          'LastUpdateChapterName': '关于粉丝节及新书一事【完本】',
          'LastChapterUpdateTime': 1493993807000,
          'LastVipUpdateChapterId': 369180392,
          'LastVipUpdateChapterName': '',
          'LastVipChapterUpdateTime': -62135798400000,
          'IsVip': 0,
          'BookStatus': '完本',
          'WordsCount': 0,
          'Label': null,
          'IsQin': 0,
          'BssReadTotal': 26138,
          'BssRecomTotal': 1815,
          'Price': null,
          'NewPrice': null,
          'Recommendation': null,
          'RecommenId': 0,
          'GroupName': '书友还看过',
          'ReadingType': 4,
          'AlgInfo': '180.7.2',
          'PartCount': 0,
          'SourceBookId': 0,
          'BookPartInfo': null,
          'ChargeType': 0,
          'TotalPrice': 0,
          'Description': '乱古岁月，群星陨落，日月颠离，天地一片黯淡。古老浩瀚的天穹之城，遮日月，蔽星芒，被天地所暗藏。这里，人族卑微似蝼蚁，而万族强盛，群魔乱舞。试问诸天万族，执子博天，又有谁人跳出这天穹枷锁？少年出自天穹之城，闯入浩瀚无尽的神秘世界，世间沧海一栗由此揭开。'
        }, {
          'BookId': 163560,
          'BookName': '恶魔法则',
          'AuthorId': 4362305,
          'AuthorName': '',
          'Author': '跳舞',
          'CategoryId': 21,
          'CategoryName': '玄幻',
          'ImageStatus': 1,
          'LastUpdateChapterID': 22272211,
          'LastUpdateChapterName': '第八十一章 【青春不老泉的副作用】',
          'LastChapterUpdateTime': 1231329030000,
          'LastVipUpdateChapterId': 22272211,
          'LastVipUpdateChapterName': '【恶魔法则后传已经开始了！】',
          'LastVipChapterUpdateTime': 1363924877000,
          'IsVip': 1,
          'BookStatus': '完本',
          'WordsCount': 0,
          'Label': null,
          'IsQin': 0,
          'BssReadTotal': 39180234,
          'BssRecomTotal': 561684,
          'Price': null,
          'NewPrice': null,
          'Recommendation': null,
          'RecommenId': 0,
          'GroupName': '书友还看过',
          'ReadingType': 5,
          'AlgInfo': '180.7.2',
          'PartCount': 0,
          'SourceBookId': 0,
          'BookPartInfo': null,
          'ChargeType': 0,
          'TotalPrice': 0,
          'Description': '一个一无是处的，被认为是废物和白痴家伙，把灵魂卖给了恶魔，能换取到什么？美色？力量？财富？权力？颠覆这世界的所有规则吧，让我们遵寻着恶魔的轨迹……“我知道，终有一天，这个世界将被我踩在脚下！！”——杜维<a target=\'_11ank\'href=\'http://bookstore.qidian.com/ploy/vip7years/index.html#five\'>抢购实体书，尽享五重惊喜好礼</a>'
        }, {
          'BookId': 2048120,
          'BookName': '武动乾坤',
          'AuthorId': 1019021,
          'AuthorName': '',
          'Author': '天蚕土豆',
          'CategoryId': 21,
          'CategoryName': '玄幻',
          'ImageStatus': 1,
          'LastUpdateChapterID': 34384468,
          'LastUpdateChapterName': '第九十三章 古大师',
          'LastChapterUpdateTime': 1314781451000,
          'LastVipUpdateChapterId': 34384468,
          'LastVipUpdateChapterName': '新书大主宰已发。',
          'LastVipChapterUpdateTime': 1372821529000,
          'IsVip': 1,
          'BookStatus': '完本',
          'WordsCount': 0,
          'Label': null,
          'IsQin': 0,
          'BssReadTotal': 73026504,
          'BssRecomTotal': 739104,
          'Price': null,
          'NewPrice': null,
          'Recommendation': null,
          'RecommenId': 0,
          'GroupName': '书友还看过',
          'ReadingType': 5,
          'AlgInfo': '180.7.2',
          'PartCount': 0,
          'SourceBookId': 0,
          'BookPartInfo': null,
          'ChargeType': 0,
          'TotalPrice': 0,
          'Description': '修炼一途，乃窃阴阳，夺造化，转涅盘，握生死，掌轮回。武之极，破苍穹，动乾坤！'
        }, {
          'BookId': 1777445,
          'BookName': '天珠变',
          'AuthorId': 4921,
          'AuthorName': '',
          'Author': '唐家三少',
          'CategoryId': 21,
          'CategoryName': '玄幻',
          'ImageStatus': 1,
          'LastUpdateChapterID': 30642374,
          'LastUpdateChapterName': '第二十四章 白色小老虎（三）',
          'LastChapterUpdateTime': 1293795548000,
          'LastVipUpdateChapterId': 30642374,
          'LastVipUpdateChapterName': '麻烦大家把推荐票投给新书《神印王座》',
          'LastVipChapterUpdateTime': 1321883172000,
          'IsVip': 1,
          'BookStatus': '完本',
          'WordsCount': 0,
          'Label': null,
          'IsQin': 0,
          'BssReadTotal': 34620345,
          'BssRecomTotal': 366151,
          'Price': null,
          'NewPrice': null,
          'Recommendation': null,
          'RecommenId': 0,
          'GroupName': '书友还看过',
          'ReadingType': 5,
          'AlgInfo': '180.7.2',
          'PartCount': 0,
          'SourceBookId': 0,
          'BookPartInfo': null,
          'ChargeType': 0,
          'TotalPrice': 0,
          'Description': '人有本命珠，觉醒后或为意珠、或为体珠，如手串分别在左右手腕处盘旋。天珠如人类之双胞胎，当意、体双珠同时出现在一个人身上的时候，即为天珠。修炼体珠者是为体珠师，修炼意珠者是为意珠师，而修炼天珠者自然即是天珠师。天珠师最高为十二双珠，因此，它的修炼过程也被称之为：天珠十二变。我们的主角就是一位修炼着天珠变的弓箭手。'
        }, {
          'BookId': 1524659,
          'BookName': '异世邪君',
          'AuthorId': 4362475,
          'AuthorName': '',
          'Author': '风凌天下',
          'CategoryId': 21,
          'CategoryName': '玄幻',
          'ImageStatus': 1,
          'LastUpdateChapterID': 27573427,
          'LastUpdateChapterName': '上架感言',
          'LastChapterUpdateTime': 1272653014000,
          'LastVipUpdateChapterId': 27573427,
          'LastVipUpdateChapterName': '新书《天域苍穹》登陆起点！希望大家支持！',
          'LastVipChapterUpdateTime': 1421738505000,
          'IsVip': 1,
          'BookStatus': '完本',
          'WordsCount': 0,
          'Label': null,
          'IsQin': 0,
          'BssReadTotal': 33596286,
          'BssRecomTotal': 261100,
          'Price': null,
          'NewPrice': null,
          'Recommendation': null,
          'RecommenId': 0,
          'GroupName': '书友还看过',
          'ReadingType': 5,
          'AlgInfo': '180.7.2',
          'PartCount': 0,
          'SourceBookId': 0,
          'BookPartInfo': null,
          'ChargeType': 0,
          'TotalPrice': 0,
          'Description': '世间毁誉，世人冷眼，与我何干？我自淡然一笑；以吾本性，快意恩仇，以吾本心，遨游世间，我命由我不由天！一代牛人穿越异界，看其如何踏上异世巅峰，成为一代邪君！'
        }],
        'SameRecommend': [{
          'BookId': 1010474452,
          'BookName': '大自在天尊',
          'AuthorId': 3021189,
          'AuthorName': '',
          'Author': '零下5度01',
          'CategoryId': 21,
          'CategoryName': '玄幻',
          'ImageStatus': 0,
          'LastUpdateChapterID': 387249174,
          'LastUpdateChapterName': '第六十九章：怨灵！（求推荐，求收藏）',
          'LastChapterUpdateTime': 1506931857000,
          'LastVipUpdateChapterId': 0,
          'LastVipUpdateChapterName': '',
          'LastVipChapterUpdateTime': 0,
          'IsVip': 0,
          'BookStatus': '连载',
          'WordsCount': 0,
          'Label': null,
          'IsQin': 0,
          'BssReadTotal': 193657,
          'BssRecomTotal': 26381,
          'Price': null,
          'NewPrice': null,
          'Recommendation': null,
          'RecommenId': 0,
          'GroupName': '同类作品',
          'ReadingType': 4,
          'AlgInfo': '',
          'PartCount': 0,
          'SourceBookId': 0,
          'BookPartInfo': null,
          'ChargeType': 0,
          'TotalPrice': 0,
          'Description': '林云本为天龙寺俗家弟子，却被同门诬陷，身犯戒律，被打入‘死地...'
        }, {
          'BookId': 1010274800,
          'BookName': '终极村长',
          'AuthorId': 400684092,
          'AuthorName': '',
          'Author': '顷刻兴亡过手',
          'CategoryId': 21,
          'CategoryName': '玄幻',
          'ImageStatus': 0,
          'LastUpdateChapterID': 387200568,
          'LastUpdateChapterName': '九十六 申猴',
          'LastChapterUpdateTime': 1506868992000,
          'LastVipUpdateChapterId': 0,
          'LastVipUpdateChapterName': '',
          'LastVipChapterUpdateTime': 0,
          'IsVip': 0,
          'BookStatus': '连载',
          'WordsCount': 0,
          'Label': null,
          'IsQin': 0,
          'BssReadTotal': 8474,
          'BssRecomTotal': 2970,
          'Price': null,
          'NewPrice': null,
          'Recommendation': null,
          'RecommenId': 0,
          'GroupName': '同类作品',
          'ReadingType': 4,
          'AlgInfo': '',
          'PartCount': 0,
          'SourceBookId': 0,
          'BookPartInfo': null,
          'ChargeType': 0,
          'TotalPrice': 0,
          'Description': '当七十亿人类被一脚踹进牢笼。诸子百家复活于世。小说神话捏成一...'
        }, {
          'BookId': 1010450940,
          'BookName': '人道崛起',
          'AuthorId': 5012945,
          'AuthorName': '',
          'Author': '山人有妙计',
          'CategoryId': 21,
          'CategoryName': '玄幻',
          'ImageStatus': 0,
          'LastUpdateChapterID': 387239960,
          'LastUpdateChapterName': '第八十九章 流言消息 倔强少年！',
          'LastChapterUpdateTime': 1506930900000,
          'LastVipUpdateChapterId': 0,
          'LastVipUpdateChapterName': '',
          'LastVipChapterUpdateTime': 0,
          'IsVip': 0,
          'BookStatus': '连载',
          'WordsCount': 0,
          'Label': null,
          'IsQin': 0,
          'BssReadTotal': 41117,
          'BssRecomTotal': 16055,
          'Price': null,
          'NewPrice': null,
          'Recommendation': null,
          'RecommenId': 0,
          'GroupName': '同类作品',
          'ReadingType': 4,
          'AlgInfo': '',
          'PartCount': 0,
          'SourceBookId': 0,
          'BookPartInfo': null,
          'ChargeType': 0,
          'TotalPrice': 0,
          'Description': '大荒之地，万族奔放，野蛮生长，正值人族圣人未出之时，万族生存...'
        }, {
          'BookId': 1010472915,
          'BookName': '翻天鉴',
          'AuthorId': 4362958,
          'AuthorName': '',
          'Author': '竹上猪猪',
          'CategoryId': 21,
          'CategoryName': '玄幻',
          'ImageStatus': 0,
          'LastUpdateChapterID': 387245182,
          'LastUpdateChapterName': '六十三章 林间贵女',
          'LastChapterUpdateTime': 1506928434000,
          'LastVipUpdateChapterId': 0,
          'LastVipUpdateChapterName': '',
          'LastVipChapterUpdateTime': 0,
          'IsVip': 0,
          'BookStatus': '连载',
          'WordsCount': 0,
          'Label': null,
          'IsQin': 0,
          'BssReadTotal': 28844,
          'BssRecomTotal': 8600,
          'Price': null,
          'NewPrice': null,
          'Recommendation': null,
          'RecommenId': 0,
          'GroupName': '同类作品',
          'ReadingType': 4,
          'AlgInfo': '',
          'PartCount': 0,
          'SourceBookId': 0,
          'BookPartInfo': null,
          'ChargeType': 0,
          'TotalPrice': 0,
          'Description': '机缘巧合之下捡到一口神秘钵盂，自此人生一发不可收拾！种种神功...'
        }, {
          'BookId': 1010470461,
          'BookName': '万界通讯录',
          'AuthorId': 6900487,
          'AuthorName': '',
          'Author': '鱼儿大虾',
          'CategoryId': 21,
          'CategoryName': '玄幻',
          'ImageStatus': 0,
          'LastUpdateChapterID': 387261145,
          'LastUpdateChapterName': '第五十九章 你清哥太小气',
          'LastChapterUpdateTime': 1506941537000,
          'LastVipUpdateChapterId': 0,
          'LastVipUpdateChapterName': '',
          'LastVipChapterUpdateTime': 0,
          'IsVip': 0,
          'BookStatus': '连载',
          'WordsCount': 0,
          'Label': null,
          'IsQin': 0,
          'BssReadTotal': 9118,
          'BssRecomTotal': 1682,
          'Price': null,
          'NewPrice': null,
          'Recommendation': null,
          'RecommenId': 0,
          'GroupName': '同类作品',
          'ReadingType': 4,
          'AlgInfo': '',
          'PartCount': 0,
          'SourceBookId': 0,
          'BookPartInfo': null,
          'ChargeType': 0,
          'TotalPrice': 0,
          'Description': '“我真是萧炎，我要给你说一件不可思议的事，我穿越了。说起来你...'
        }, {
          'BookId': 1009233711,
          'BookName': '西游之黑山妖君',
          'AuthorId': 11806758,
          'AuthorName': '',
          'Author': '猫虔',
          'CategoryId': 21,
          'CategoryName': '玄幻',
          'ImageStatus': 0,
          'LastUpdateChapterID': 387177415,
          'LastUpdateChapterName': '第五十四章 为山九仞',
          'LastChapterUpdateTime': 1506862800000,
          'LastVipUpdateChapterId': 0,
          'LastVipUpdateChapterName': '',
          'LastVipChapterUpdateTime': 0,
          'IsVip': 0,
          'BookStatus': '连载',
          'WordsCount': 0,
          'Label': null,
          'IsQin': 0,
          'BssReadTotal': 6902,
          'BssRecomTotal': 1867,
          'Price': null,
          'NewPrice': null,
          'Recommendation': null,
          'RecommenId': 0,
          'GroupName': '同类作品',
          'ReadingType': 4,
          'AlgInfo': '',
          'PartCount': 0,
          'SourceBookId': 0,
          'BookPartInfo': null,
          'ChargeType': 0,
          'TotalPrice': 0,
          'Description': '西游世界，漫天神佛，遍地妖魔！附身为一头斑斓大虫，如何在危机...'
        }, {
          'BookId': 1010537768,
          'BookName': '神话搬运工',
          'AuthorId': 400965222,
          'AuthorName': '',
          'Author': '三只毛',
          'CategoryId': 21,
          'CategoryName': '玄幻',
          'ImageStatus': 0,
          'LastUpdateChapterID': 387236701,
          'LastUpdateChapterName': '第四十九章，神龙带你飞',
          'LastChapterUpdateTime': 1506935100000,
          'LastVipUpdateChapterId': 0,
          'LastVipUpdateChapterName': '',
          'LastVipChapterUpdateTime': 0,
          'IsVip': 0,
          'BookStatus': '连载',
          'WordsCount': 0,
          'Label': null,
          'IsQin': 0,
          'BssReadTotal': 7609,
          'BssRecomTotal': 1907,
          'Price': null,
          'NewPrice': null,
          'Recommendation': null,
          'RecommenId': 0,
          'GroupName': '同类作品',
          'ReadingType': 4,
          'AlgInfo': '',
          'PartCount': 0,
          'SourceBookId': 0,
          'BookPartInfo': null,
          'ChargeType': 0,
          'TotalPrice': 0,
          'Description': '身具造化神术的元霄在仙界身死后转世为异世界洛家独子——洛霄。...'
        }],
        'EnableBookUnitLease': 0,
        'EnableBookUnitBuy': 0,
        'UnitCount': 0,
        'UnitBuyCount': 0,
        'BssReadTotal': 157859464,
        'BssRecomTotal': 1532644,
        'TotalChapterCount': 1655,
        'BookFansList': [{
          'UserId': 108459327,
          'NickName': 'parkourman',
          'RealImageUrl': 'https://qidian.qpic.cn/qd_face/349573/538763/100',
          'Amount': 8653401,
          'RankName': '盟主',
          'Rank': 0,
          'OrderId': 0
        }, {
          'UserId': 120427008,
          'NickName': '右掱邊~\u000E',
          'RealImageUrl': 'https://qidian.qpic.cn/qd_face/349573/544389/100',
          'Amount': 3040250,
          'RankName': '盟主',
          'Rank': 0,
          'OrderId': 0
        }],
        'BookReviewList': [{
          'RankName': '',
          'Id': 1110019189,
          'ViewCount': 1,
          'PostCount': 1,
          'Subject': '',
          'UserName': '爱他与其不爱他',
          'UserId': 301498704,
          'PostDate': 1499517867000,
          'Body': '推部签约小说《重生之千金有点拽》，堪称小说版的《回家的诱惑》，写作手法另类，是小说界的一股清流！大家可搜《重生之千金有点拽》，或搜作者：安子科[fn=31]『已签约，阅文编辑都肯定了，你还犹豫什么？』\n\n\n\n\n\n\n\n\n\n谢谢作者的平台[fn=43]，愿作者在这个月身价过亿[fn=2][fn=2]',
          'Type': 0,
          'VoteYes': 0,
          'VoteAgainst': 0,
          'UserHeadIcon': 'https://me.qidian.com/Images/UserImages/100x100/120.jpg',
          'From': 'Android 客户端'
        }, {
          'RankName': '',
          'Id': 1109991234,
          'ViewCount': 0,
          'PostCount': 0,
          'Subject': '',
          'UserName': '岁月的孽缘',
          'UserId': 227037855,
          'PostDate': 1499508002000,
          'Body': '水个广告\uD83D\uDE01\uD83D\uDE01\uD83D\uDE01\uD83D\uDE01\uD83D\uDE01\n《斗破苍穹之大陆起源》\n求收藏！求推荐票！',
          'Type': 0,
          'VoteYes': 0,
          'VoteAgainst': 0,
          'UserHeadIcon': 'https://qidian.qpic.cn/qd_face/349573/3784908/100',
          'From': 'Android 客户端'
        }, {
          'RankName': '',
          'Id': 1109986143,
          'ViewCount': 0,
          'PostCount': 0,
          'Subject': '',
          'UserName': '浊酒任逍遥',
          'UserId': 230952612,
          'PostDate': 1499506225000,
          'Body': '《求仙策》萌新仙侠好书，在上仙侠分类强推中，本想写些比较牛逼的广告语，结果想半天没想出来，算了，这一次少点套路，多点真诚，各位老铁看了觉得可以的话，不妨加入书架支持下呗～',
          'Type': 0,
          'VoteYes': 0,
          'VoteAgainst': 0,
          'UserHeadIcon': 'https://me.qidian.com/Images/UserImages/100x100/181.jpg',
          'From': 'iOS 客户端'
        }, {
          'RankName': '',
          'Id': 1109977911,
          'ViewCount': 0,
          'PostCount': 0,
          'Subject': '',
          'UserName': '悠哉游哉呵呵',
          'UserId': 196888599,
          'PostDate': 1499502687000,
          'Body': '还是当初高中晚上拿着诺基亚躲被窝偷偷看的(ಡωಡ)hiahiahia ',
          'Type': 0,
          'VoteYes': 0,
          'VoteAgainst': 0,
          'UserHeadIcon': 'https://qidian.qpic.cn/qd_face/349573/2668615/100',
          'From': 'Android 客户端'
        }, {
          'RankName': '',
          'Id': 1109974882,
          'ViewCount': 0,
          'PostCount': 0,
          'Subject': '',
          'UserName': '月梓心love',
          'UserId': 229065450,
          'PostDate': 1499501300000,
          'Body': '         带书来土豆这里推一下，《南笙有你》，现代小说，没有浮夸的剧情更没有狗血般的爱恨情仇，有的只是对爱情的纯洁，对幸福的向往，以及对背叛的宽容与谅解。\n        在现代这个社会里，或许没有浮夸的“人吃人”，但依旧存在着人们之间的勾心斗角，明争暗斗。\n        或许，你们不喜欢这样的生活，《南笙有你》或许不是你的菜，但希望走过可你看看，喜欢就来瞧瞧！\n         说真的，不喜欢推书，但起点被发现的几率太小，所以，这也是无可奈何的事情~\n         谢谢~\n',
          'Type': 0,
          'VoteYes': 0,
          'VoteAgainst': 0,
          'UserHeadIcon': 'https://me.qidian.com/Images/UserImages/100x100/120.jpg',
          'From': 'Android 客户端'
        }],
        'MTMBookInfo': null,
        'MonthTicketCount': 122,
        'DonateCount': 51816,
        'BookForumCount': 528708,
        'CategoryPicture': 'http://h5.if.qidian.com/Content/images/categorybg/玄幻_奇幻_玄幻言情.jpg',
        'CategoryActionUrl': '',
        'CopyRight': '2009-04-14上架\n本作品由作家天蚕土豆授权起点中文网独家首发\n版权所有·侵权必究',
        'BookStar': 4,
        'QQBookID': 0,
        'IsOutBook': 0,
        'IsOffline': 0,
        'LastWeekWordsUpadteCnt': 0,
        'RecommendWord': '最热小说，不容错过的巅峰之作',
        'AroundInfos': [],
        'EnableVoteMonth': 1,
        'EnableDonate': 1,
        'HongBao': null,
        'AudioInfo': {
          'IsFreeLimit': 0,
          'IsFreeLimitMsg': '',
          'RemainingTime': 0,
          'EndTime': 0,
          'Adid': 8159970304288701,
          'AudioName': '斗破苍穹',
          'AnchorId': 8159970303489001,
          'AnchorName': '领先声创',
          'AuthorId': 1019021,
          'AuthorName': '天蚕土豆',
          'BookId': 1209977,
          'Site': 10,
          'RecordText': '',
          'FreeType': 3,
          'CategoryId': 80001,
          'SubcategoryId': 80055,
          'AudioType': 0,
          'AllAudioChapters': 75,
          'AllChapterSize': 285.36,
          'BitRate': 64,
          'CoverUrl': 'http://img1.write.qq.com/upload/cover/2016-12-13/584fbe6d577ea.jpg',
          'Intro': '这里是属于斗气的世界，没有花俏艳丽的魔法，有的，仅仅是繁衍到巅峰的斗气！\r\n新书等级制度：斗者，斗师，大斗师，斗灵，斗王，斗皇，斗宗，斗尊，斗圣，斗帝。\r\n\n',
          'ChargeType': 3,
          'Price': 20,
          'StartChargeChapterSort': 6000,
          'LastChapterId': 23185087431779401,
          'LastChapterName': '第75集 大手笔',
          'Csuuid': 105,
          'ScheduleStatus': 1,
          'Creator': '陆洁红',
          'Status': 1,
          'CreateTime': 1501641303000,
          'UpdateTime': 1506412835000,
          'LastUpdateTime': 1506848428000,
          'ChapterIndex': 75,
          'CbId': 0
        },
        'SourceBookId': 0,
        'BookPartInfo': {
          'Position': 0,
          'BookPartList': []
        },
        'Description': '这里是属于斗气的世界，没有花俏艳丽的魔法，有的，仅仅是繁衍到巅峰的斗气！新书等级制度：斗者，斗师，大斗师，斗灵，斗王，斗皇，斗宗，斗尊，斗圣，斗帝。',
        'Game': null
      }
    }).obj;
    return {
      status: 200,
      data: obj,
    };
  },
}
