<script setup>
import { ElDialog } from 'element-plus';
import 'element-plus/theme-chalk/el-dialog.css';
import 'element-plus/theme-chalk/el-overlay.css';
</script>

<template lang="pug">
ElDialog
  template(#default): slot(name="default")
  template(#title): slot(name="title")
</template>
