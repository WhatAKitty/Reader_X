import rest, { GET, POST, PUT } from '../utils/rest';
import buffer from 'buffer';

const serverIp = 'https://book.whatakitty.com';
const version = 'v2';
const prefix = `${serverIp}/api/${version}/books`;

const Buffer = buffer.Buffer;

export async function list(key) {
  return await GET(`${prefix}`, {
    key,
  });
}

export async function history() {
  return await GET(`${serverIp}/api/${version}/history`);
}

export async function item(id) {
  return await GET(`${prefix}/${id}`);
}

export async function content(link) {
  const base64ed = new Buffer(link).toString('base64');
  return await GET(`${prefix}/chapter/${base64ed.replace('/', 'xiegang')}`);
}

export async function chapterList(bookId) {
  return await GET(`${prefix}/${bookId}/chapters`);
}

export async function recommends() {
  return await GET(`${prefix}/recommends`);
}

