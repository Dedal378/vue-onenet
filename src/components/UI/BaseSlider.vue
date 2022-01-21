<script setup>
import { ElSlider } from 'element-plus';
import 'element-plus/theme-chalk/el-slider.css';
import 'element-plus/theme-chalk/el-popper.css';
</script>

<template lang="pug">
ElSlider(v-bind="$attrs" show-input).baseSlider
</template>

<style lang="scss">
.baseSlider {
  padding-left: 10px;
}
</style>
