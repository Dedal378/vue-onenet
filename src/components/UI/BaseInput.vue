<script setup>
import 'element-plus/theme-chalk/el-input.css';
import { ElInput } from 'element-plus';
</script>

<template lang="pug">
ElInput.baseInput
</template>

<style>
.baseInput {
  --el-color-primary: var(--first-color);
}
</style>
