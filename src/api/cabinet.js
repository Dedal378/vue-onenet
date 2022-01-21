import request from '@/services/request';

export const getLeadData = async () => {
  try {
    const { data } = await request({
      method: 'get',
      url: 'control-panel/lead-data',
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const getChartData = async () => {
  try {
    const { data } = await request({
      method: 'get',
      url: 'control-panel/graphics',
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};
