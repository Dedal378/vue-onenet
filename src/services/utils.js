export const formatter = new Intl.DateTimeFormat('ru', {
  hour: 'numeric',
  minute: 'numeric',
});

export const wait = (sec = 0) =>
  new Promise((resolve) => {
    setTimeout(resolve, sec * 1000);
  });

export const scrollToBottom = (querySelector = 'body') => {
  setTimeout(() => {
    const targetElement = document.querySelector(querySelector);
    targetElement.scrollTop = 100000;
  }, 100);
};

import { getformData as formData } from '@/store.js';
export const playAudio = () => {
  const audio = new Audio(formData.value.sounds[formData.value.sound].url);
  audio.play();
};

/**
 * Устанавливаем токен в localStorage
 * @param {String} token
 */
export const setToken = (token) => {
  localStorage.setItem('jwt', token);
};

/**
 * Получаем токен из localStorage
 */
export const getToken = () => {
  const token = localStorage.getItem('jwt') || '';
  return token;
};

/**
 * Получаем Bearer
 */
export const getBearer = () => {
  const TOKEN = getToken();
  return TOKEN ? `Bearer ${TOKEN}` : '';
};

/**
 * Удаляем токе из localStorage
 */
export const removeToken = () => {
  localStorage.removeItem('jwt');
};

/**
 * Валидации
 */
export const validations = {
  isNumber: (value) => {
    const pattern = /^\d+$/;
    return pattern.test(value);
  },
};

/**
 * Генерим id устройства
 */
export const generateDeviceId = (length) => {
  let deviceId = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i += 1) {
    deviceId += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return deviceId;
};
/**
 * Форматируем дату
 * @param {Date} date - дата
 * @param {Boolean} withTime - форматировать вместе со временем
 */
export const formattedDate = (date, withTime = true) => {
  const options = withTime
    ? {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }
    : {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      };

  return new Intl.DateTimeFormat('ru', options).format(new Date(date));
};

/**
 * Устанавливаем разрешение
 * @param {boolean} isShow - данные
 */

export const setSellExpireStorage = (isShow) => {
  const timestamp = new Date();
  const data = JSON.stringify({ isShow, timestamp });

  localStorage.setItem('show_sell_expire', data);
};

export const isNeedFetchPermission = () => {
  const calcExpireTimestamp = (timestamp) => {
    if (!timestamp) return true;

    let diff = (new Date().getTime() - new Date(timestamp).getTime()) / 1000;
    diff /= 60 * 60;

    return Math.abs(Math.round(diff)) >= 24;
  };

  const sellPermData = JSON.parse(localStorage.getItem('show_sell_expire'));
  let status = !sellPermData;

  if (sellPermData) {
    status = calcExpireTimestamp(sellPermData.timestamp);
  }

  return status;
};

export const getPermissionSellExpire = () => {
  const { isShow } = JSON.parse(localStorage.getItem('show_sell_expire'));

  return isShow;
};
