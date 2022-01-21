import request from '@/services/request';

export const getTelephonies = async (params = {}) => {
  try {
    const { data } = await request({
      method: 'get',
      url: '/telephony',
      params,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const getTelephoniesOrders = async (params = {}) => {
  try {
    const { data } = await request({
      method: 'get',
      url: '/telephony/orders',
      params,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const getTelephoniesCodes = async () => {
  try {
    const { data } = await request({
      method: 'get',
      url: '/telephony/codes',
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const getTelephonyDetail = async (telephonyId) => {
  try {
    const {
      data: { data },
    } = await request({
      method: 'get',
      url: `/telephony/${telephonyId}`,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const createTelephony = async (reqData) => {
  try {
    const { data } = await request({
      method: 'post',
      url: '/telephony/orders',
      data: reqData,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const updateTelephony = async (reqData, id) => {
  try {
    const { data } = await request({
      method: 'put',
      url: `/telephony/${id}`,
      data: reqData,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};
