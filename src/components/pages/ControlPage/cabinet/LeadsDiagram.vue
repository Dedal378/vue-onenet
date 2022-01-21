<script setup>
import { ref } from 'vue';
import { PieChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const props = defineProps({
  data: Object,
});

const options = ref({
  responsive: true,
  showAllTooltips: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    tooltip: {
      callbacks: {
        label: function ({ dataIndex, dataset, label, raw }) {
          const reducer = (previousValue, currentValue) =>
            previousValue + currentValue;
          const total = dataset.data.reduce(reducer);
          const percentageView = Math.round((raw / total) * 100);
          const labelText = `${label}: ${raw} (${percentageView}%)`;

          return labelText;
        },
      },
    },
  },
});
</script>

<template lang="pug">
.leadsDiagram
  PieChart(:chartData="data" :options="options")
</template>
