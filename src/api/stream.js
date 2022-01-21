import request from '@/services/request';

export const getStreamData = async (params = {}) => {
  try {
    const {
      data: { data },
    } = await request({
      method: 'get',
      url: '/stream',
      params,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const getStreamPromoData = async (params = {}) => {
  try {
    const {
      data: { data },
    } = await request({
      method: 'get',
      url: '/stream/promo',
      params,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const postStream = async (dataReq = {}) => {
  try {
    const {
      data: { data },
    } = await request({
      method: 'post',
      url: '/stream',
      data: dataReq,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const getDetailStream = async (id) => {
  try {
    const {
      data: { data },
    } = await request({
      method: 'get',
      url: `/stream/${id}`,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const updateStream = async (dataReq, id) => {
  try {
    const {
      data: { data },
    } = await request({
      method: 'put',
      url: `/stream/${id}`,
      data: dataReq,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const deleteStream = async (id) => {
  try {
    const { data } = await request({
      method: 'delete',
      url: `/stream/${id}`,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};
