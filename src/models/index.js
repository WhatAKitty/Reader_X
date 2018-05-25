import Realm, { SortDescriptor } from 'realm';

import Config from './Config.model';
import Book from './Book.model';
import Shelf from './Shelf.model';
import Chapter from './Chapter.model';

const v1 = 0;
const v2 = 2;
const v3 = 3;
const v4 = 4;
const v5 = 5; // 增加了Config表

let singletonRealm = undefined;
const getRealm = async () => {
  // 存在realm实例则直接返回，否则创建
  if (singletonRealm) {
    return { realm: singletonRealm };
  }

  return await Realm.open({
    schema: [Config, Book, Shelf, Chapter],
    schemaVersion: v5,
    migration: (oldRealm, newRealm) => {
      if (oldRealm.schemaVersion < v2) {
        const oldBooks = oldRealm.objects('Book');
        const newBooks = newRealm.objects('Book');
        for (let i = 0; i < oldBooks.length; i++) {
          const oldBook = oldBooks[i];
          const newBook = newBooks[i];
          newBook.lastReadedChapterName = `${oldBook.lastReadedChapter}`;
        }
      } else if (oldRealm.schemaVersion < v4) {
        // delete chapter _id
        // add chapter index
        const newChapters = newRealm.objects('Chapter');
        for (let i = 0; i < newChapters.length; i++) {
          const newChapter = newChapters[i];
          newChapter.index = i;
        }
      }
    },
  })
    .then(realm => {
      return { realm };
    })
    .catch(err => {
      return { err };
    });
}

export default getRealm;
export {
  SortDescriptor
};
