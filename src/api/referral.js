import request from '@/services/request';

export const getReferralInfo = async (params = {}) => {
  try {
    const { data } = await request({
      method: 'get',
      url: 'referral/info',
      params,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const getReferralLink = async () => {
  try {
    const { data } = await request({
      method: 'get',
      url: 'referral/plug',
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const getStatInfo = async (params = {}) => {
  try {
    const {
      data: { data },
    } = await request({
      method: 'get',
      url: 'referral/stat',
      params,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};
