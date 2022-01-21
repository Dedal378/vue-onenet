<script setup>
import { computed } from 'vue';
import { LineChart, useLineChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const props = defineProps({
  data: {
    type: Object,
  },
});

const options = computed(() => {
  return {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function ({ dataset, raw }) {
            const labelText = `${dataset.status} - ${raw}`;
            return labelText;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          stepSize: 1,
        },
      },
    },
  };
});

const { lineChartProps } = useLineChart({
  chartData: props.data,
  options,
});
</script>

<template lang="pug">
.leadsChart
  LineChart(v-bind="lineChartProps")
</template>
