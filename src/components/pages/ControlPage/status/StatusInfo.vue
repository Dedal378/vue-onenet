<script setup>
import { ref } from 'vue';

import { getPromoData } from '@/api/webmaster';

import {
  formattedMenuInfo,
  formattedChartData,
} from '@/services/formatters';

import { ElCard, ElRow, ElCol } from 'element-plus';

import 'element-plus/theme-chalk/el-card.css';
import 'element-plus/theme-chalk/el-row.css';
import 'element-plus/theme-chalk/el-col.css';

import StatusInfoList from '@/components/pages/ControlPage/status/StatusInfoList.vue';
// import { formattedMenuInfo } from "src/services/formatters.js";

const statusInfo = ref([]);
const transactionsInfo = ref([]);
const lineData = ref({});
const pieData = ref({});
const isShowCharts = ref(false);

const setShowChartStatus = (chartData) => {
  isShowCharts.value =
    !!Object.keys(chartData.data.line)
      .map((item) => {
        return Object.values(chartData.data.line[item]).filter(Boolean);
      })
      .filter((value) => !!value.length).length &&
    !!chartData.data.pie.value.filter(Boolean).length;
};

const init = async () => {
  const { data } = await getPromoData();
  statusInfo.value = formattedMenuInfo(data.stats);
  transactionsInfo.value = data.transactions;

  const chartData = await getChartData();
  lineData.value = formattedChartData(chartData.data.line);
  pieData.value = formattedDiagramData(chartData.data.pie);
  setShowChartStatus(chartData);
};

init();
</script>

<template lang="pug">
section.statusInfo
  ElRow(:gutter="20").statusInfo-row._info
    ElCol.statusInfo-col(:xs="24" :sm="12")
      ElCard.statusInfo-card
        h3.statusInfo-colTitle.titleControl Веб-мастер
        .statusInfo-list
          StatusInfoList(:stats="statusInfo")
          p.
            Информация по веб-мастеру:
            -имя (name)
            -ID
            -Баланс
            -email
            -активность вебмастера
            -Тип вебмастера (внутренний и внешний) (is_outdoor)
            -статус вебмастера(серебро, золото, платина) , когда приходит серебро то показываем Поповер с информацией статус и что будет на других статусах, при золоте показываем поповер с информацией на статусе платина(+20%) , на платине показываем Поповер с информацией по этому статусу

          p.
            Информация по персональному менеджеру:
            -аватар
            -имя
            -ссылка на почту
            -ссылка на телеграмм
            -активность
    ElCol.statusInfo-col(:xs="24" :sm="12")
      ElCard.statusInfo-card
        h3.statusInfo-colTitle.titleControl Персональный менеджер
        .statusInfo-list
          //StatusTransactionsList(:transactions="transactionsInfo")
</template>

<style lang="stylus">
.statusInfo

  &-row._info
    margin-top $size-x8

  &-card
    height 100%
    border 0

    &._charts
      margin-top $size-x8

  &-cardTitle
    h-reset()

  &-colTitle
    h-reset()

    margin-bottom $size-x6

  &-col:nth-child(2)
    +media-width-down($mobile)
      margin-top $size-x4
</style>
