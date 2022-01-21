export const fieldConfig = {
  TurboWidget: {
    supertype: 'widget',
    label: 'Турбо-виджет',
    colors: true,
    avatars: true,
    animation: true,
    shortExist: true,
    positions: true,
    messageIcon: true,
  },

  JuriForm: {
    supertype: 'form',
    label: 'Форма юр.консультации',
    delay: false,
    sound: false,
    colors: true,
    position: false,
    padding: false,
    avatars: true,
    animation: true,
  },

  OnlineConsultant: {
    supertype: 'widget',
    label: 'Онлайн-консультант',
    colors: true,
    avatars: true,
    animation: true,
    shortExist: true,
    positions: true,
    messageIcon: true,
  },

  BackCall: {
    supertype: 'widget',
    label: 'Обратный звонок',
    delay: false,
    sound: false,
    colors: true,
    position: true,
    padding: true,
    avatars: false,
    animation: false,
    positions: true,
  },

  MiniForm: {
    supertype: 'form',
    label: 'Мини-форма',
    delay: false,
    sound: false,
    colors: true,
    position: false,
    padding: false,
    avatars: false,
    animation: false,
  },

  PopupForm: {
    supertype: 'form',
    label: 'Попап-форма',
    delay: false,
    sound: false,
    colors: true,
    position: false,
    padding: false,
    avatars: false,
    animation: false,
  },

  // ChatForm: {
  //   label: "Форма чата",
  //   delay: false,
  //   sound: false,
  //   colors: true,
  //   position: false,
  //   padding: false,
  //   avatars: false,
  //   animation: false,
  // },
};

export const positions = [
  { value: 1, label: 'Внизу справа' },
  { value: 2, label: 'Внизу слева' },
];

export const sounds = [
  { value: 1, label: 'Без звука' },
  { value: 2, label: 'Вариант 1' },
  { value: 3, label: 'Вариант 2' },
  { value: 4, label: 'Вариант 3' },
];

export const messageIcons = [
  { value: 1, label: 'Иконка 1' },
  { value: 2, label: 'Иконка 2' },
  { value: 3, label: 'Иконка 3' },
  { value: 4, label: 'Иконка 4' },
  { value: 5, label: 'Иконка 5' },
];

export const animations = [
  { value: 0, label: 'Без анимации' },
  { value: 1, label: 'Анимация 1' },
  { value: 2, label: 'Анимация 2' },
  { value: 3, label: 'Анимация 3' },
];

export const openTypes = [
  { value: 'full', label: 'Мини' },
  { value: 'short', label: 'Большой' },
];

export const popMessagePositions = [
  { value: 'left', label: 'Сбоку' },
  { value: 'top', label: 'Сверху' },
];

export const popMessageSource = [
  { value: 'chat', label: 'Чат' },
  { value: 'history', label: 'История' },
];

export const widgetPositions = [
  { value: 'left', label: 'Слева' },
  { value: 'right', label: 'Справа' },
];

const superTypes = [
  { value: 'widget', label: 'Виджет' },
  { value: 'form', label: 'Форма' },
];

export default {
  popMessageSource,
  widgetPositions,
  superTypes,
};
