<script setup>
import { ref, watchEffect, watch, computed } from 'vue';

import { useRoute, useRouter } from 'vue-router';

import { pickBy } from 'lodash';

import debounce from 'lodash.debounce';

import {
  ElLoading,
  ElInputNumber,
  ElMessage,
  ElColorPicker,
  ElSwitch,
  ElTabs,
  ElTabPane,
  ElSelect,
  ElOption,
  ElAvatar,
  ElCard,
} from 'element-plus';

import 'element-plus/theme-chalk/el-input-number.css';
import 'element-plus/theme-chalk/el-color-picker.css';
import 'element-plus/theme-chalk/el-switch.css';
import 'element-plus/theme-chalk/el-tabs.css';
import 'element-plus/theme-chalk/el-tab-pane.css';
import 'element-plus/theme-chalk/el-select.css';
import 'element-plus/theme-chalk/el-option.css';
import 'element-plus/theme-chalk/el-avatar.css';
import 'element-plus/theme-chalk/el-loading.css';
import 'element-plus/theme-chalk/el-card.css';

import {
  fieldConfig,
  positions,
  animations,
  messageIcons,
  openTypes,
  popMessagePositions,
} from '@/data';

import config from '@/data';

import {
  getAvatars,
  getAudio,
  uploadAvatar,
  removeAvatar,
} from '@/api/promo.js';

import { getPromoById, putPromoById, createPromo } from '@/api/webmaster.js';

import {
  getformData as formData,
  setformData,
  defaultSettings,
} from '@/store.js';

import { playAudio } from '@/services/utils.js';
import { promoAdapter, formatPromoForCreate } from '@/services/promoAdapter.js';

import BaseFieldset from '@/components/UI/BaseFieldset.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import BaseInput from '@/components/UI/BaseInput.vue';
import BaseSlider from '@/components/UI/BaseSlider.vue';
import BaseSelect from '@/components/UI/BaseSelect.vue';
import BaseUpload from '@/components/UI/BaseUpload.vue';
import FilledScheme from '@/components/FilledScheme.vue';

const emit = defineEmits(['remountComponent']);

const loading = ref(null);
const selectedColor = ref('');
const mode = ref('create'); // create | edit
const settingsTab = ref('main'); // main | message | metrics | roundings
const messageTab = ref('main'); // main | history
const superType = ref('widget'); // widget | form
const avatars = ref([]);
const sounds = ref([]);
const index = ref(0);

const route = useRoute();
const router = useRouter();

const routeId = route.params.id;
const promoAction = route.meta.action;
const widgetType = route.meta.type;

watchEffect(() => {
  document.documentElement.style.setProperty(
    '--first-color',
    formData.value.color[0],
  );
  document.documentElement.style.setProperty(
    '--second-color',
    formData.value.color[0],
  );
});

const debouncedRemountComponent = debounce(async () => {
  emit('remountComponent');
}, 500);

const currentFieldConfig = computed(() => {
  return pickBy(fieldConfig, (item) => item.supertype === superType.value);
});

const isTurboWidget = computed(() => {
  return formData.value.type === 'TurboWidget';
});

const isOnlineConsultant = computed(() => {
  return formData.value.type === 'OnlineConsultant';
});

const isBackCall = computed(() => {
  return formData.value.type === 'BackCall';
});

const isShowButtonRadius = computed(() => {
  return !isTurboWidget.value && !isOnlineConsultant.value;
});

const disablePositionMessage = computed(() => {
  return formData.value.openType === 'short';
});

const colors = computed(() => {
  return isBackCall.value
    ? ['#5AD38E', '#FF0A2C', '#2E2248']
    : ['#4DCAE6', '#617ACE', '#5AD38E'];
});

const title = computed(() => {
  return route.meta.title;
});

const showLoader = () => {
  loading.value = ElLoading.service({
    lock: true,
    text: 'Загрузка',
    background: 'rgba(0, 0, 0, 0.7)',
    customClass: 'gnLoader',
  });
};

let promoData = {};
async function init() {
  showLoader();

  // superType.value = widgetType;
  // formData.value.type = 'JuriForm';

  const resPromoData =
    promoAction === 'edit' ? await getPromoById({ id: routeId }) : {};
  const resSounds = await getAudio();
  const resAvatars = await getAvatars();
  const isHasConfig = !!Object.keys(resPromoData).length;

  loading.value.close();

  avatars.value = resAvatars;
  formData.value.sounds = resSounds;
  selectedColor.value = formData.value.color[0];

  if (resPromoData.config === null) {
    resPromoData.config = formData.value;
    promoData = promoAdapter({ promoData: resPromoData, mode: 'fromOld' });
  } else {
    if (isHasConfig) {
      promoData = resPromoData;
    } else {
      const settings = defaultSettings();
      promoData.config = settings();
    }
  }

  setformData(promoData.config);
}

const postFormData = async () => {
  const newPromoData = promoData;
  newPromoData.config = formData.value;
  showLoader();

  if (promoAction === 'edit') {
    const adaptedPromo = promoAdapter({
      promoData: newPromoData,
      mode: 'toOld',
    });
    const res = await putPromoById({ id: routeId, data: adaptedPromo });
  } else {
    const reqData = await formatPromoForCreate(formData.value);
    await createPromo(reqData);
  }

  loading.value.close();
};

function setAvatar(id) {
  formData.value.avatar = id;
}

async function uploadAvatarHandler(avatarObj) {
  const res = await uploadAvatar(avatarObj);

  if (res.success) {
    await init();
  } else {
    ElMessage.error('Что-то пошло не так, попробуйте еще раз.');
  }
}

async function deleteAvatar(id) {
  await removeAvatar(id);
  await init();
}

function selectActiveColor(color) {
  selectedColor.value = color;
}

watch(
  formData,
  (val, prevVal) => {
    if (val.openType === 'short') {
      formData.value.popMessagePosition = 'top';
    }

    if (val.type === 'OnlineConsultant') {
      formData.value.openType = 'short';
      // formData.value.animation = 0;
      formData.value.popMessageSource = 'chat';
    }

    debouncedRemountComponent();
  },
  { deep: true },
);

init();
</script>

<template lang="pug">
section.promoForm
  ElCard.promoForm-card
    template(#header)
      .promoForm-cardHeader
        h3.promoForm-cardTitle.titleControl {{ title }}
    .promoForm-header
      ElTabs(v-model="superType"): ElTabPane(v-for="config in config.superTypes" :label="config.label" :name="config.value")
      ElTabs(v-model="formData.type"): ElTabPane(v-for="(config, name) in currentFieldConfig" :label="config.label" :name="name")
      ElTabs(v-model="settingsTab")
        ElTabPane(label="Основные" name="main").promoForm-body
          BaseFieldset(v-if="fieldConfig[formData.type].avatars" title="Аватар")
            .promoForm-avatars
              .promoForm-avatarWrapper(v-for="avatar in avatars")
                ElAvatar(:size="88" :src="avatar.full_link" @click="setAvatar(avatar.id)").promoForm-avatar
                button.promoForm-avatarButton(v-if="avatar.w_user_id !== 0" @click.prevent="deleteAvatar(avatar.id)")
                  mdicon(name="close" size="18").promoForm-avatarIcon
              BaseUpload(@file-upload="uploadAvatarHandler")
          BaseFieldset(v-if="fieldConfig[formData.type].colors" title="Готовые схемы")
            .promoForm-avatars
              FilledScheme(v-for="color in colors" :color1="color" :color2="color")
              FilledScheme(v-if="selectedColor" :color1="selectedColor" :color2="selectedColor")
              ElColorPicker(v-model="formData.color[0]" @change="selectActiveColor").promoForm-colorPicker
                mdicon(name="plus" size="20")
          BaseFieldset(v-if="isTurboWidget" title="Формат виджета"): BaseSelect(v-model="formData.openType" :options="openTypes")
          BaseFieldset(v-if="!isOnlineConsultant && !isBackCall" title="Иконка сообщения"): BaseSelect(v-model="formData.messageIcon" :options="messageIcons")
          BaseFieldset(v-if="!isOnlineConsultant && !isBackCall" title="Анимация"): BaseSelect(v-model="formData.animation" :options="animations")
          BaseFieldset(v-if="fieldConfig[formData.type].positions" title="Позиция виджета"): BaseSelect(v-model="formData.widgetPosition" :options="config.widgetPositions")
          BaseFieldset(v-if="isTurboWidget || isOnlineConsultant" title="Время открытия формы (с)"): ElInputNumber(v-model="formData.time" :min="0")
          BaseFieldset(v-if="formData.sounds?.length && !isBackCall" title="Звук")
            ElSelect(v-model="formData.sound" @input="playAudio")
              ElOption(v-for="(sound,index) in formData.sounds" :key="sound.id" :value="sound.id" :label="`Вариант ${index + 1}`")
          BaseFieldset(v-if="formData.type == 'OnlineConsultant'" title="Автоматическое открытие через (сек.)"): ElInputNumber(v-model="formData.beforeActiveDelay" :min="0")
          BaseFieldset(title="Название формы"): BaseInput(v-model="formData.name" placeholder="Мой сайт")
          BaseFieldset(title="URL сайта"): BaseInput(v-model="formData.url" placeholder="example.com")
          BaseFieldset(v-if="isBackCall" title="Текст кнопки"): BaseInput(v-model="formData.backCallBtnText" placeholder="Жду звонка")
          BaseFieldset(v-if="!isBackCall" title="Позиция"): BaseSelect(v-model="formData.position" :options="positions")
          BaseFieldset(title="Отступ сбоку"): BaseSlider(v-model="formData.marginX")
          BaseFieldset(title="Отступ снизу"): BaseSlider(v-model="formData.marginY")
          BaseFieldset(v-if="isShowButtonRadius" title="Радиус закругления кнопок"): BaseSlider(v-model="formData.buttonBorderRadius" :max="20")
          BaseFieldset(v-if="isOnlineConsultant" title="Радиус скругления углов"): BaseSlider(v-model="formData.borderRadius" :max="20")
          BaseFieldset(v-if="formData.type == 'MiniForm'" title="Радиус закругления textarea"): BaseSlider(v-model="formData.inputBorderRadius")
          
          BaseFieldset(v-if="formData.type == 'TurboWidget'" title="Позиция всплывающего сообщения"): BaseSelect(v-model="formData.popMessagePosition" :options="popMessagePositions" :disabled="disablePositionMessage")
          BaseFieldset(v-if="formData.type == 'TurboWidget'" title="Источник всплывающего сообщения"): BaseSelect(v-model="formData.popMessageSource" :options="config.popMessageSource")
        ElTabPane(label="Текст" name="message")
          ElTabs(v-model="messageTab")
            ElTabPane(label="Общие" name="main").promoForm-body
              BaseFieldset(title="Имя менеджера"): BaseInput(v-model="formData.messages.name")
              BaseFieldset(title="Фамилия менеджера"): BaseInput(v-model="formData.messages.surname")
              BaseFieldset(title="Должность"): BaseInput(v-model="formData.messages.role")
              BaseFieldset(v-if="fieldConfig[formData.type].title" title="Заголовок"): BaseInput(v-model="formData.formFields.title")
              BaseFieldset(v-if="formData.type == 'JuriForm'" title="Подзаголовок"): BaseInput(v-model="formData.formFields.subtitle")
              BaseFieldset(v-if="formData.type == 'JuriForm'" title="Текст примера"): BaseInput(v-model="formData.formFields.example")
              BaseFieldset(v-if="fieldConfig[formData.type].buttonText" title="Текст кнопки"): BaseInput(v-model="formData.formFields.buttonText")
              BaseFieldset(v-if="formData.type == 'JuriForm'" title="Телефон"): BaseInput(v-model="formData.formFields.phone")
            ElTabPane(v-if="!isBackCall" label="Чат" name="chat").promoForm-body
              //- BaseFieldset(title="Скорость набора консультанта (симв./сек.)"): ElInputNumber(v-model="formData.messages.speed" :min="1")
              //- BaseFieldset( title="Задержка перед первым сообщением (сек.)"): ElInputNumber(v-model="formData.messages.firstDelay" :min="0")
              //- BaseFieldset(title="Задержка между сообщениями (сек.)"): ElInputNumber(v-model="formData.messages.betweenDelay" :min="0")
              //- BaseFieldset(title="Уточняющий вопрос"): BaseInput(v-model="formData.messages.clarify")
              .promoForm-message(v-for="(item,index) in formData.messages.messagesArray")
                BaseFieldset.promoForm-messageInput(:title="`${index + 1} вопрос`")
                  BaseInput(v-model="formData.messages.messagesArray[index]")
              BaseButton.promoForm-messageDelete(@click="formData.messages.messagesArray.splice(index,1)" v-if="index > 1" type="danger" icon="el-icon-delete")
              //- BaseButton(@click="formData.messages.messagesArray.push('')") Добавить новое сообщение
              BaseFieldset(title="Уточняющий вопрос"): BaseInput(v-model="formData.messages.clarify")
              template(v-if="isTurboWidget")
                BaseFieldset(title="Запрос имени"): BaseInput(v-model="formData.messages.nameMessage")
                BaseFieldset(title="Последнее сообщение"): BaseInput(v-model="formData.messages.finalMessage")
            ElTabPane(v-if="isTurboWidget" label="История" name="history").promoForm-body
              BaseFieldset(v-for="(dialog, index) in formData.history" :title="`${index + 1} Вопрос:`")
                BaseFieldset(title=""): BaseInput(v-model="formData.history[index].question").promoForm-question
                BaseFieldset(title="Ответ:"): BaseInput(v-model="formData.history[index].answer")
        ElTabPane(label="Интеграции" name="metrics")
          ElTabs
            ElTabPane(label="Яндекс" name="yandex").promoForm-body
              BaseFieldset(title="Номер счётчика Яндекс метрики"): BaseInput(v-model="formData.metrics.yandex.id")
              BaseFieldset(title="Название цели"): BaseInput(v-model="formData.metrics.yandex.name")
            ElTabPane(label="Google" name="google").promoForm-body
              BaseFieldset(title="Категория Google Аналитики"): BaseInput(v-model="formData.metrics.google.category")
              BaseFieldset(title="Действие Google Аналитики"): BaseInput(v-model="formData.metrics.google.action")
              BaseFieldset(title="Ярлык Google Аналитики"): BaseInput(v-model="formData.metrics.google.label")
              BaseFieldset(title="Ценность Google Аналитики"): BaseInput(v-model="formData.metrics.google.value")
        //- ElTabPane(label="Закругления" name="roundings").promoForm-body
          //- ElSwitch(v-model="allBorderSwitcher")
          //- BaseFieldset(title="Все углы"): BaseSlider(:value="formData.borderRadius[0]")
          //- template
      BaseButton(@click="postFormData" style="margin-top: 100px") Сохранить форму
      BaseButton(@click="emit('remountComponent')" style="margin-top: 100px") Демонстрация
      pre {{ formData }}
</template>

<style lang="stylus">
.promoForm *
  --el-color-primary: purple !important

.promoForm-cardTitle
  h-reset()

.gnLoader
  --el-color-primary white !important

.promoForm-body
  padding-top 10px
  display grid
  grid-template-columns repeat(1, 500px)
  gap 20px

.promoForm-avatars
  display flex
  flex-wrap wrap
  gap 10px
  align-items center

.promoForm-message
  display flex
  gap 10px
  align-items flex-end

.promoForm-messageInput
  flex-grow 1

.promoForm-messageDelete
  flex-grow 0

.promoForm-avatar
  cursor pointer

.promoForm-avatarWrapper
  position relative

  &:hover .promoForm-avatarButton
    display block

.promoForm-avatarButton
  button-reset()

  display none
  position absolute
  right 0
  top 0
  z-index 1
  background-color rgba(0,0,0, .5)
  border-radius 100%

  @media screen and (max-width: 900px)
    display block

.promoForm-avatarIcon svg
  fill white

.promoForm-colorPicker
  min-width 32px
  height 32px
  display flex
  justify-content center
  align-items center
  position relative
  cursor pointer

  &:before,
  &:after
    content ''
    position absolute
    background-color var(--el-color-primary)
    pointer-events none

  &:before
    height 12px
    width 2px
    z-index 2

  &:after
    width 12px
    height 2px

  .el-color-picker__color,
  .el-color-picker__trigger
    outline 0
    border 0

  .el-color-picker__color-inner
    border-radius 100%
    background-color white!important
    border 1px dashed var(--el-color-primary)

  .el-color-picker__icon
    display none

.promoForm-question
  margin-bottom $size-x2
</style>
