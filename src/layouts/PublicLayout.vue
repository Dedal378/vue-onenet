<template lang="pug">
.layout
  Sidebar.layout-sidebar(
    @open-faq-click="openFaq"
    :class="{'_rendering': isSidebarRendering, '_opened': isMenuOpened || !isBurger}"
  )
  .layout-view(:class="{'_not-full-width': !isBurger}").container
    BurgerButton(
      @click.prevent="toggleMenu" 
      v-show="isBurger"
      :class="{'_opened': isMenuOpened}"
    ).layout-burgerButton
    router-view(v-slot="{Component}")
      transition(name="opacity" mode="out-in")
        component(:is="Component")
  AppFooter.layout-footer(:class="{'_not-full-width': !isBurger}").container
</template>

<script setup>
import { ref, onMounted, provide, onUnmounted } from 'vue';

import throttle from 'lodash.throttle';

import Sidebar from '@/components/sidebar/index.vue';
import BurgerButton from '@/components/sidebar/BurgerButton.vue';
import AppFooter from '@/components/common/AppFooter.vue';

const isMenuOpened = ref(false);
const isBurger = ref(false);
const isShowFaq = ref(false);
const isSidebarRendering = ref(true);
const faqIndex = ref('');

provide('show', isShowFaq);
provide('faqIndex', faqIndex);

const resizeWindowHandler = () => {
  const { innerWidth } = window;
  isBurger.value = innerWidth < 1140;

  if (isBurger.value) {
    isMenuOpened.value = false;
  }
};

const toggleMenu = () => {
  isMenuOpened.value = !isMenuOpened.value;
};

const isShowBurger = () => {
  const { innerWidth } = window;
  isBurger.value = innerWidth < 1140;
  isMenuOpened.value = false;
};

function openFaq(from) {
  isShowFaq.value = !isShowFaq.value;
  faqIndex.value = from;
}

onMounted(() => {
  isShowBurger();
  window.addEventListener('resize', throttle(resizeWindowHandler, 500));
  isSidebarRendering.value = false;
});

onUnmounted(() => {
  window.removeEventListener('resize', resizeWindowHandler);
});
</script>

<style lang="stylus">
.layout
  display flex
  flex-direction column
  min-height 100vh

.layout-view
  position relative
  margin 72px 0 32px

  &._not-full-width
    width calc(100% - 280px)
    margin 32px 0 32px auto

.layout-sidebar._rendering
  display none

.layout-burgerButton
  position absolute
  width 40px
  height 40px
  right 30px
  top -55px

  +media-width-down($max-width-m)
    right 16px

.layout-footer
  display flex
  flex-direction column
  align-items center
  margin-top auto
  margin-bottom 0
  padding 0 0 $size-x8

  &._not-full-width
    width calc(100% - 280px)
    margin-right 0
</style>
