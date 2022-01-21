<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { getPermission } from '@/api/settings';
import {
  isNeedFetchPermission,
  getPermissionSellExpire,
} from '@/services/utils';

import { ElMenu, ElSubMenu, ElMenuItemGroup, ElMenuItem } from 'element-plus';

import 'element-plus/theme-chalk/el-menu.css';
import 'element-plus/theme-chalk/el-submenu.css';
import 'element-plus/theme-chalk/el-menu-item.css';

const activeIndex = ref('');
const route = useRoute();
const isShowMenuSell = ref(true);

const setActiveIndexMenu = (currentRoute) => {
  const activeIndexMenu =
    currentRoute.meta.activeMenuLink || currentRoute.fullPath;
  activeIndex.value = activeIndexMenu;
};

onMounted(async () => {
  if (isNeedFetchPermission()) {
    isShowMenuSell.value = await getPermission();
  } else {
    isShowMenuSell.value = await getPermissionSellExpire();
  }

  setActiveIndexMenu(route);
});

watch(route, (oldVal, newVal) => {
  setActiveIndexMenu(newVal);
});
</script>

<template lang="pug">
ElMenu.menu(:default-active="activeIndex" :unique-opened="true" router text-color="#250a37")
  ElMenuItem(index="/cabinet")
    mdicon(name="monitor-dashboard" size="20")
    span.menu-linkText Панель управления
  ElMenuItem(index="/cabinet/user-info")
    mdicon(name="monitor-dashboard" size="20")
    span.menu-linkText Информация о статусе
</template>

<style lang="stylus">
.menu
  border-right none

.menu-linkText,
.menu-submenuTitle
  margin-left $size-x2

.menu-submenuTitle
  color $color-violet

.el-menu
  background none

.el-menu-item
  padding 0

  &.is-active
    background linear-gradient(45deg, #8e2e9e, #3809a3)
    color white

    .mdi
      opacity 1

  .mdi
    opacity .65

.el-sub-menu .mdi
  opacity .65
</style>
