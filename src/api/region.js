import request from '@/services/request';

export const getRegionList = async (params) => {
  try {
    const {
      data: { data },
    } = await request({
      method: 'get',
      url: '/region',
      params,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const getRegionListWithPrice = async (params) => {
  try {
    const {
      data: { data },
    } = await request({
      method: 'get',
      url: '/region/price',
      params,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};
