<script setup>
import { ref } from 'vue';

import { ElScrollbar } from 'element-plus';

import 'element-plus/theme-chalk/el-scrollbar.css';

import AppLogo from '@/components/sidebar/AppLogo.vue';
import Menu from '@/components/sidebar/Menu.vue';

const emit = defineEmits(['open-faq-click']);

function clickFaqHandler(from) {
  emit('open-faq-click', from);
}
</script>

<template lang="pug">
aside.sidebar
  AppLogo.sidebar-logo
  ElScrollbar(height="77vh")
    Menu.sidebar-menu
</template>

<style lang="stylus">
.sidebar
  position fixed
  width 280px
  background white
  top 0
  transform translateX(-295px)
  z-index 10
  min-height 100vh
  box-shadow 0 10px 15px rgba(0, 0, 0, .1), 0 5px 35px rgba(0, 0, 0, .1)
  background-image url('@/assets/bg-menu.svg')
  background-size auto
  background-repeat no-repeat
  transition all .3s ease-in

  &._opened
    transform translateX(0)

  +media-width-down($max-width-m)
    width 250px

.sidebar-logo
  margin $size-x6 0

.sidebar-userInfo
  margin 0 0 $size-x6

.sidebar-menu
  margin-bottom $size-x6
</style>
