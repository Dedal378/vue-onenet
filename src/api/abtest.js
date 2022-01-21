import request from '@/services/request';

export const getABTests = async (params = {}) => {
  try {
    const {
      data: { data },
    } = await request({
      method: 'get',
      url: 'abtest',
      params: {
        no_limit: 1,
      },
    });

    return data;
  } catch {
    return new Error(e);
  }
};

export const createABTest = async (dataReq = {}) => {
  try {
    const {
      data: { data },
    } = await request({
      method: 'post',
      url: 'abtest',
      data: dataReq,
    });

    return data;
  } catch {
    return new Error(e);
  }
};

export const updateABTest = async (dataReq, id) => {
  try {
    const {
      data: { data },
    } = await request({
      method: 'put',
      url: `abtest/${id}`,
      data: dataReq,
    });

    return data;
  } catch {
    return new Error(e);
  }
};

export const getDetailABTest = async (id) => {
  try {
    const {
      data: { data },
    } = await request({
      method: 'get',
      url: `abtest/${id}`,
    });

    return data;
  } catch {
    return new Error(e);
  }
};

export const deleteABTest = async (id) => {
  try {
    const { data } = await request({
      method: 'delete',
      url: `abtest/${id}`,
    });

    return data;
  } catch {
    return new Error(e);
  }
};
