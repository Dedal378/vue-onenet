import { fieldConfig } from '@/data';
import { get, set } from 'lodash';

const adaptObj = {
  'name': 'name',
  'url': 'link',
  'avatar': 'arraySettings.avatar_id',
  'metrics.google.category': 'arraySettings.goo_category',
  'metrics.google.action': 'arraySettings.goo_action',
  'metrics.google.label': 'arraySettings.goo_label',
  'metrics.google.value': 'arraySettings.goo_value',
  'metrics.yandex.id': 'arraySettings.ym',
  'metrics.yandex.name': 'arraySettings.ym_goal',
  'messages.messagesArray[0]': 'arraySettings.first_message',
  'messages.messagesArray[1]': 'arraySettings.second_message',
  'messages.clarify': 'arraySettings.third_message',
  'messages.nameMessage': 'arraySettings.fourth_message',
  'messages.finalMessage': 'arraySettings.fifth_message',
  'messages.name': 'arraySettings.manager',
  'messages.role': 'arraySettings.position',
  'widgetPosition': 'arraySettings.is_left',
  'sound': 'arraySettings.sound_file',
};

const oldAndNewValuesLiteral = {
  sound: [
    { oldVal: 's1.mp3', newVal: 0 },
    { oldVal: 's2.mp3', newVal: 1 },
    { oldVal: 's3.mp3', newVal: 2 },
  ],
  widgetPosition: [
    { oldVal: '1', newVal: 'left' },
    { oldVal: '0', newVal: 'right' },
  ],
};

const specialFormat = ({ val, key, fromOld }) => {
  const specialFormatting = oldAndNewValuesLiteral[key];
  if (specialFormatting) {
    return specialFormatting.find(
      (value) => value[fromOld ? 'oldVal' : 'newVal'] === val,
    )[fromOld ? 'newVal' : 'oldVal'];
  } else return val;
};

export const promoAdapter = ({ promoData, mode }) => {
  const fromOld = mode === 'fromOld';
  const toOld = mode === 'toOld';

  const { config, promo } = promoData;

  // Устаревшие ID
  if (promo.id === 4 || promo.id === 9) promo.id = 12;
  if (promo.id === 11) promo.id = 13;

  for (const key in fieldConfig) {
    const element = fieldConfig[key];
    if (promo.id === element.id) config.type = key;
  }
  for (const newPath in adaptObj) {
    const oldPath = adaptObj[newPath];
    let newVal = get(config, newPath);
    let oldVal = get(promoData, oldPath);

    if (fromOld && oldVal) {
      oldVal = specialFormat({ val: oldVal, key: newPath, fromOld });
      set(config, newPath, oldVal);
    }
    if (toOld) {
      newVal = specialFormat({ val: newVal, key: newPath, fromOld });
      set(promoData, oldPath, newVal);
    }
  }
  return promoData;
};

export const formatPromoForCreate = (config) => {
  let promo_id;

  const arraySettings = {
    avatar_id: config.avatar,
  };

  const sort = 0;
  const status = 0;

  const { url, name } = config;

  if (config.type === 'JuriForm') promo_id = 12;
  if (config.type === 'MiniForm') promo_id = 3;
  if (config.type === 'PopupForm') promo_id = 1;
  if (config.type === 'OnlineConsultant') promo_id = 6;
  if (config.type === 'TurboWidget') promo_id = 13;
  if (config.type === 'BackCall') promo_id = 2;

  const reqData = {
    promo_id,
    config,
    name,
    link: url,
    sort,
    status,
    arraySettings,
  };

  return reqData;
};
