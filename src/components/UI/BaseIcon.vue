<script setup>
import { ElIcon } from 'element-plus';
import 'element-plus/theme-chalk/el-icon.css';

const props = defineProps({
  size: {
    type: Number,
    default: 18,
  },
  color: {
    type: String,
    default: '#c0c4cc',
  },
});
</script>

<template lang="pug">
.icon: ElIcon(:size="props.size" :color="props.color")
  slot
</template>
