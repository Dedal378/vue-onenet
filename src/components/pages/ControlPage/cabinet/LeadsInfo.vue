<script setup>
import { ref } from 'vue';

import { getLeadData, getChartData } from '@/api/cabinet';

import {
  formattedLeadsInfo,
  formattedChartData,
  formattedDiagramData,
} from '@/services/formatters';

import { ElCard, ElRow, ElCol } from 'element-plus';

import 'element-plus/theme-chalk/el-card.css';
import 'element-plus/theme-chalk/el-row.css';
import 'element-plus/theme-chalk/el-col.css';

import LeadsInfoList from '@/components/pages/ControlPage/cabinet/LeadsInfoList.vue';
import LeadsTransactionsList from '@/components/pages/ControlPage/cabinet/LeadsTransactionsList.vue';
import LeadsDiagram from '@/components/pages/ControlPage/cabinet/LeadsDiagram.vue';
import LeadsChart from '@/components/pages/ControlPage/cabinet/LeadsChart.vue';

const leadsInfo = ref([]);
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
  const { data } = await getLeadData();
  leadsInfo.value = formattedLeadsInfo(data.stats);
  transactionsInfo.value = data.transactions;

  const chartData = await getChartData();
  lineData.value = formattedChartData(chartData.data.line);
  pieData.value = formattedDiagramData(chartData.data.pie);
  setShowChartStatus(chartData);
};

init();
</script>

<template lang="pug">
section.leadsInfo
  ElCard.leadsInfo-card._charts(v-if="isShowCharts")
    ElRow(:gutter="20").leadsInfo-row
      ElCol(:xs="24" :sm="12").leadsInfo-Col
        h3.leadsInfo-colTitle.titleControl Панель управления
        .leadsInfo-chart
          LeadsChart(:data="lineData")
      ElCol(:xs="24" :sm="12").leadsInfo-col
        h3.leadsInfo-colTitle.titleControl Статусы лидов
        .leadsInfo-diagram
          LeadsDiagram(:data="pieData")
  ElRow(:gutter="20").leadsInfo-row._info
    ElCol.leadsInfo-col(:xs="24" :sm="12")
      ElCard.leadsInfo-card
        h3.leadsInfo-colTitle.titleControl Сводная информация
        .leadsInfo-list
          LeadsInfoList(:stats="leadsInfo")
    ElCol.leadsInfo-col(:xs="24" :sm="12")
      ElCard.leadsInfo-card
        h3.leadsInfo-colTitle.titleControl Последние операции
        .leadsInfo-list
          LeadsTransactionsList(:transactions="transactionsInfo")

</template>

<style lang="stylus">
.leadsInfo

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
