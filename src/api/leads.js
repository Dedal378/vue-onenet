import request from '@/services/request';

export const getLeadsData = async (params = {}) => {
  try {
    const { data } = await request({
      method: 'get',
      url: 'lead/index',
      params,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const searchLeads = async (params = {}) => {
  try {
    const { data } = await request({
      method: 'post',
      url: 'lead/search',
      data: params,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const getDetailLead = async (id) => {
  try {
    const {
      data: { data },
    } = await request({
      method: 'get',
      url: `lead/${id}`,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const importExcel = async (params = {}) => {
  try {
    const { data } = await request({
      method: 'get',
      url: 'lead/export/excel',
      params,
      responseType: 'blob',
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const sendSell = async (dataReq) => {
  try {
    const { data } = await request({
      method: 'post',
      url: 'lead',
      data: dataReq,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};
