import request from '@/services/request';

export const getPromos = async () => {
  try {
    const {
      data: { data },
    } = await request({
      method: 'get',
      url: 'promo',
      params: {
        no_limit: 1,
      },
    });

    return data;
  } catch {
    return new Error(e);
  }
};

export const getAvatars = async () => {
  const res = await request({
    method: 'get',
    url: 'promo/avatar',
  });
  return res.data.data;
};

export const getAudio = async () => {
  const res = await request({
    method: 'get',
    url: 'promo/audio',
  });
  return res.data.data;
};

export const getAvatar = async ({ id }) => {
  try {
    const res = await request({
      method: 'get',
      url: `promo/avatar/${id}`,
    });
    return res.data?.data || null;
  } catch (e) {
    throw new Error(e);
  }
};

export const uploadAvatar = async (avatar) => {
  try {
    const res = await request({
      method: 'post',
      url: 'promo/avatar/',
      data: {
        avatar,
      },
    });
    return res.data || null;
  } catch (e) {
    throw new Error(e);
  }
};

export const removeAvatar = async (id) => {
  try {
    const res = await request({
      method: 'delete',
      url: `promo/avatar/${id}`,
    });
    return res.data || null;
  } catch (e) {
    throw new Error(e);
  }
};
