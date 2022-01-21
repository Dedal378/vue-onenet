<script setup>
import { ElSelect, ElOption } from 'element-plus';
import 'element-plus/theme-chalk/el-select.css';
import 'element-plus/theme-chalk/el-option.css';
import 'element-plus/theme-chalk/el-input.css';

const props = defineProps({ options: Array });
</script>

<template lang="pug">
ElSelect(v-bind="$attrs"): ElOption(v-for="option in props.options" :key="option.value" :value="option.value" :label="option.label")
</template>
