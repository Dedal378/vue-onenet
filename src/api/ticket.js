import request from '@/services/request';

export const getTickets = async (params = {}) => {
  try {
    const { data } = await request({
      method: 'get',
      url: '/ticket',
      params,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const getTicketDetail = async (ticketId) => {
  try {
    const {
      data: { data },
    } = await request({
      method: 'get',
      url: `/ticket/${ticketId}`,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const createTicket = async (reqData) => {
  try {
    const { data } = await request({
      method: 'post',
      url: `/ticket`,
      data: reqData,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const updateTicket = async (reqData, id) => {
  try {
    const { data } = await request({
      method: 'patch',
      url: `/ticket/${id}`,
      data: reqData,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};

export const postMessage = async (reqData, id) => {
  try {
    const { data } = await request({
      method: 'post',
      url: `/ticket/${id}/message`,
      data: reqData,
    });

    return data;
  } catch (e) {
    return new Error(e);
  }
};
