import rest, { GET, POST, PUT } from '../utils/rest';

const serverIp = 'https://book.whatakitty.com';
const version = 'v2';
const prefix = `${serverIp}/api/${version}/ranks`;

export async function list() {
  return await GET(`${prefix}`);
}

export async function books(rankId) {
  const { data, err } = await GET(`${prefix}/${rankId}`);
  if (err) {
    return { err };
  }

  return { data: data.ranking.books };
}
