<script setup>
import 'element-plus/theme-chalk/el-button.css';
import { ElButton } from 'element-plus';
import { getformData as formData } from '@/store.js';
</script>

<template lang="pug">
ElButton(type="primary").baseButton: slot
</template>

<style lang="stylus">
.baseButton {
  background-color: var(--first-color) !important;
  color: white;
  border none;
  // width 210px
  border-radius: v-bind("`${formData.buttonBorderRadius}px`");
  &:hover {
    box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.1);
    background-color: var(--first-color) !important;
  }
  &[disabled] {
    background-color: var(--first-color);
  }
}
</style>
