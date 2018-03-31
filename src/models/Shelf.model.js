
class Shelf {
}

Shelf.schema = {
  name: 'Shelf',
  primaryKey: 'bookId',
  properties: {
    bookId:                   'string',                                                   // 图书编号
    book:                     'Book',                                                     // 图书
    lastAppendTime:           {type: 'int', default: 0},                                  // 图书加入书架的时间
  },
}

export default Shelf;
