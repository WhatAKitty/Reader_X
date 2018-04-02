
class Chapter {
}

Chapter.schema = {
  name: 'Chapter',
  primaryKey: 'link',
  properties: {
    bookId:             {type: 'string'},                           // 章节所属Book
    title:              {type: 'string'},                           // 章节名称
    link:               'string',                                   // 章节链接
    index:              'int',                                      // 索引
    content:            {type: 'string', optional:true},            // 章节内容
  },
}

export default Chapter;
