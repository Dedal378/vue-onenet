import request from '@/services/request';

export const getPromoData = async () => {
  try {
    const {
      data: { data },
    } = await request({
      method: 'get',
      url: 'webmaster/promo',
      params: {
        no_limit: 1,
      },
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const getPromoById = async ({ id }) => {
  const res = await request({
    method: 'get',
    url: `webmaster/promo/${id}`,
  });

  return res.data.data;
};

export const putPromoById = async ({ id, data }) => {
  const res = await request({
    method: 'put',
    url: `webmaster/promo/${id}`,
    data,
  });

  return res;
};

export const deletePromo = async (id) => {
  try {
    const { data } = await request({
      method: 'delete',
      url: `webmaster/promo/${id}`,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const clonePromo = async (id) => {
  try {
    const { data } = await request({
      method: 'post',
      url: `webmaster/promo/${id}/clone`,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const createPromo = async (dataReq) => {
  try {
    const { data } = await request({
      method: 'post',
      url: `webmaster/promo/`,
      data: dataReq,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};
