import request from '@/services/request';

export const getWebmasterPromos = async () => {
  const res = await request({
    method: 'get',
    url: 'webmasterPromos/',
  });
  return res;
};

export const deleteWebmasterPromo = async ({ id }) => {
  const res = await request({
    method: 'delete',
    url: `webmasterPromos/${id}`,
  });
  return res;
};

export const postWebmasterPromo = async ({ id, data }) => {
  const res = await request({
    method: 'post',
    url: `webmasterPromos/${id}`,
    data,
  });
  return res;
};

export const mockGetRequest = async () => {
  const res = await request({
    method: 'get',
    url: `http://jsonplaceholder.typicode.com/posts`,
  });
  return res;
};

export const doubleWebmasterPromo = null;
