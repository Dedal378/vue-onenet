import request from '@/services/request';

export const getReportData = async (params = {}) => {
  try {
    const {
      data: { data },
    } = await request({
      method: 'get',
      url: 'report/common',
      params,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const getReportDataABTests = async (params = {}) => {
  try {
    const {
      data: { data },
    } = await request({
      method: 'get',
      url: 'report/tests',
      params,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};
