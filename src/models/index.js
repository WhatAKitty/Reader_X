console.log(Realm.defaultPath)
console.log(Realm.schemaVersion(Realm.defaultPath))

import Realm, { SortDescriptor } from 'realm';

import Book from './Book.model';
import Shelf from './Shelf.model';
import Chapter from './Chapter.model';

const v1 = 0;
const v2 = 2;

let singletonRealm = undefined;
const getRealm = async () => {
  // 存在realm实例则直接返回，否则创建
  if (singletonRealm) {
    return { realm: singletonRealm };
  }

  return await Realm.open({
    schema: [Book, Shelf, Chapter],
    schemaVersion: v2,
    migration: (oldRealm, newRealm) => {
      console.log(oldRealm.schemaVersion)
      if (oldRealm.schemaVersion < v2) {
        const oldBooks = oldRealm.objects('Book');
        const newBooks = newRealm.objects('Book');
        for (let i = 0; i < oldBooks.length; i++) {
          const oldBook = oldBooks[i];
          const newBook = newBooks[i];
          newBook.lastReadedChapterName = `${oldBook.lastReadedChapter}`;
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
