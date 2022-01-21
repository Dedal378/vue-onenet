import request from '@/services/request';
import { setToken } from '@/services/utils';

export const getCode = async (dataReq) => {
  try {
    const { data } = await request({
      method: 'post',
      url: 'code',
      data: dataReq,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const signUp = async (dataReq) => {
  try {
    const { data } = await request({
      method: 'post',
      url: 'auth',
      data: dataReq,
    });

    const { token } = data.data;
    setToken(token);

    return data;
  } catch (e) {
    return new Error(e);
  }
};
