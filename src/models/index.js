
import Realm, { SortDescriptor } from 'realm';

import Book from './Book.model';
import Shelf from './Shelf.model';
import Chapter from './Chapter.model';

const v_0_0_1 = 0.01;

const realm = new Realm({
  schema: [Book, Shelf, Chapter],
  schemaVersion: v_0_0_1,
  // migration: (oldRealm, newRealm) => {
  // },
});
console.log(Realm.defaultPath)
export default realm;
export {
  SortDescriptor
};
