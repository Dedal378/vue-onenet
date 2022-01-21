import request from '@/services/request';

export const getBalance = async (params = {}) => {
  try {
    const { data } = await request({
      method: 'get',
      url: 'balance',
      params,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const getBalanceInfo = async (params = {}) => {
  try {
    const {
      data: { data },
    } = await request({
      method: 'get',
      url: 'balance/info',
      params,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const postAutoPayouts = async (reqData) => {
  try {
    const { data } = await request({
      method: 'post',
      url: 'balance/withdrawal/auto',
      data: reqData,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const postPayouts = async (reqData) => {
  try {
    const { data } = await request({
      method: 'post',
      url: 'balance/withdrawal/',
      data: reqData,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const deleteAutoPayouts = async (data) => {
  try {
    await request({
      method: 'delete',
      url: 'balance/withdrawal/auto',
      data,
    });
  } catch (e) {
    return new Error(e);
  }
};
