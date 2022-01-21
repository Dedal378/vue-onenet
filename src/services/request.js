import axios from 'axios';
import { getBearer, removeToken } from '@/services/utils';
import router from '@/router/';

axios.defaults.baseURL = 'https://onenet.gainnet.site/api/v1/';
axios.defaults.withCredentials = true;
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

axios.interceptors.request.use((request) => {
  if (!request.headers.common['Authorization']) {
    const BEARER = getBearer();
    request.headers.common['Authorization'] = BEARER;
  }
  return request;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      router.replace('/signin');
      removeToken();
    }
    return error;
  },
);

const request = (config) =>
  axios(config)
    .catch((error) => {
      // eslint-disable-console
      console.log(error);
    })
    .then((res) => {
      // eslint-disable-console
      // console.log(res);
      return res;
    });
export default request;
