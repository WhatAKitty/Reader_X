
class Chapter {
}

Chapter.schema = {
  name: 'Chapter',
  properties: {
    _id:                {type: 'int',indexed: true},                // 章节编号
    bookId:             {type: 'string'},                           // 章节所属Book
    title:              {type: 'string'},                           // 章节名称
    link:               'string',                                   // 章节链接
    content:            {type: 'string', optional:true},            // 章节内容
  },
}

export default Chapter;
