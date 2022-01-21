import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import mdiVue from 'mdi-vue/v3';
import * as mdijs from '@mdi/js';

import dayjs from 'dayjs';
import 'dayjs/locale/ru';

import { maska } from 'maska';
import moment from 'moment';

const app = createApp(App);

dayjs.locale('ru');

app.directive('maska', maska);

app.config.globalProperties.$moment = moment;

app.use(router);
app.use(mdiVue, {
  icons: mdijs,
});

app.mount('#app');
