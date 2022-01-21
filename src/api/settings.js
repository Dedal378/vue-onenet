import request from '@/services/request';
import { setSellExpireStorage } from '@/services/utils';

export const getPermission = async () => {
  try {
    const {
      data: { data },
    } = await request({
      method: 'get',
      url: 'settings/permission',
    });
    const isShow = !!data.filter((item) => item === 'show_sell').length;

    setSellExpireStorage(isShow);
    return isShow;
  } catch (e) {
    return new Error(e);
  }
};

export const resetPassword = async (dataReq) => {
  try {
    const { data } = await request({
      method: 'post',
      url: 'settings/reset-password',
      data: dataReq,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const logoutAll = async (dataReq) => {
  try {
    const { data } = await request({
      method: 'post',
      url: 'settings/logout-all',
      data: dataReq,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const editUserData = async (dataReq) => {
  try {
    const { data } = await request({
      method: 'patch',
      url: 'settings/user',
      data: dataReq,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const getUserData = async () => {
  try {
    const {
      data: { data },
    } = await request({
      method: 'get',
      url: 'settings/user',
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};
