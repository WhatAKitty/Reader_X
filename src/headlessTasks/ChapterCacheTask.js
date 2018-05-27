
// import { self } from 'react-native-threads';
import getRealm from '../models';

import { content, chapterList } from '../services/book';

const obj = {
  taskKey: 'chapterCacheTask',
  task: async ({ bookId }) => {
    const { data: chapters, err: chapterErr } = await chapterList(bookId);
    if (chapterErr || chapters.length === 0) {
      // self.postMessage(JSON.stringify({
      //   error: true,
      // }));
      return false;
    }

    const { realm, err } = await getRealm();
    const cachedChapterIndexes = realm.objects('Chapter')
      .filtered(`bookId = '${bookId}'`)
      .map(chapter => chapter.index);

    chapters
      .map((chapter, index) => ({
        ...chapter,
        index,
      }))
      .filter((chapter) => cachedChapterIndexes.indexOf(chapter.index) === -1)
      .forEach(async (chapter) => {
        const realmChapter = realm.objectForPrimaryKey('Chapter', chapter.link);
        if (realmChapter) {
          // exists, do nothing
          return;
        }

        // obain from network
        const { data: chapterContent, err: netErr } = await content(chapter.link);
        if (netErr) {
          // exists, do nothing
          return;
        }
        const { body, title } = chapterContent;

        realm.write(() => {
          // replace record
          realm.create('Chapter', {
            bookId,
            title: chapter.title,
            link: chapter.link,
            index: chapter.index,
            content: body,
          }, true);
        });

        // self.postMessage(JSON.stringify({
        //   progress: title,
        // }));
      });
  }
}

// self.onmessage = (message) => {
//   const data = JSON.parse(message);
//   const { bookId } = data;

//   obj.task({ bookId });
// }

export default obj;
