import request from '@/services/request';

export const getWebhook = async () => {
  try {
    const { data } = await request({
      method: 'get',
      url: 'webhook',
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const checkLink = async (dataReq) => {
  try {
    const { data } = await request({
      method: 'post',
      url: 'webhook/check',
      data: dataReq,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const updateWebhook = async (dataReq, id) => {
  try {
    const { data } = await request({
      method: 'put',
      url: `webhook/${id}`,
      data: dataReq,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};
