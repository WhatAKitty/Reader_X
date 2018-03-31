
class Book {
}

Book.schema = {
  name: 'Book',
  primaryKey: '_id',
  properties: {
    _id:                      'string',                                                   // 图书编号
    title:                    'string',                                                   // 图书名称
    author:                   'string',                                                   // 图书作者
    cover:                    'string',                                                   // 图书封面
    longIntro:                'string',                                                   // 图书长描述
    shortIntro:               {type: 'string', optional: true},                           // 图书短描述
    majorCate:                'string',                                                   // 主要类型'
    minorCate:                {type: 'string', optional: true},                           // 次要类型
    lastChapter:              'string',                                                   // 最新更新章节名称
    updated:                  'string',                                                   // 图书最新更新时间
    wordCount:                'int',                                                      // 总字数
    lastReadedTime:           {type: 'int', optional: true, indexed: true},               // 上次阅读时间，时间戳
    lastReadedChapter:        {type: 'int', optional: true},                              // 最近阅读章节
    lastChapterReadPage:      {type: 'int', default: 0},                                  // 上次阅读章节内的页索引
    progress:                 {type: 'double', optional: true},                           // 阅读进度
  },
}

export default Book;
