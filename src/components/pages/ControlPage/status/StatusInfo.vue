<script setup>
import { ref } from 'vue';

import { getPromoData } from '@/api/webmaster';

import {
  formattedMenuInfo,
} from '@/services/formatters';

import { ElCard, ElRow, ElCol } from 'element-plus';

import 'element-plus/theme-chalk/el-card.css';
import 'element-plus/theme-chalk/el-row.css';
import 'element-plus/theme-chalk/el-col.css';

import StatusInfoList from '@/components/pages/ControlPage/status/StatusWebmasterList.vue';
// import { formattedMenuInfo } from "src/services/formatters.js";

const statusInfo = ref([]);
const transactionsInfo = ref([]);
const isShowCharts = ref(false);

const data = [
  {
    name: '',
    id: '',
    balance: '',
    is_active: '',
    rating_id: '',
    email: '234@gmail.com',
    activity: 'активен',
    type: 'внутренний',
    status: 'серебро',
  }
]

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
  statusInfo.value = formattedMenuInfo(data);
  // managerInfo.value = data.transactions;

  // const chartData = await getChartData();
  // setShowChartStatus(chartData);
};

init();
</script>

<template lang="pug">
section.statusInfo
  ElRow(:gutter="20").statusInfo-row._info
    ElCol.statusInfo-col(:xs="24" :sm="12")
      ElCard.statusInfo-card
        h3.statusInfo-colTitle.titleControl Веб-мастер
        .statusInfoList
          StatusInfoList(:status="data")
    ElCol.statusInfo-col(:xs="24" :sm="12")
      ElCard.statusInfo-card
        h3.statusInfo-colTitle.titleControl Персональный менеджер
        .statusInfo-list
          //StatusManagerList(:managerInfo="managerInfo")
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
