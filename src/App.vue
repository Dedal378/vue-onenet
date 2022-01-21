<template lang="pug">
router-view
</template>

<script setup>
import 'element-plus/theme-chalk/base.css';
</script>

<style lang="stylus">
@import "./assets/styles/fonts/fonts.css";
@import "./assets/styles/utils/_common";
/* TODO replace all scoped styles by BEM with prefix
TODO css native vars */
html
  font-family 'Stem'

body
  padding 0
  margin 0
  background $color-gallery
  font-weight 500

*
  box-sizing border-box

input,
textarea
  font-family 'Stem'
  font-weight 500

:root
  --el-color-primary purple

.nav
  display flex
  gap 10px

.opacity-enter-active,
.opacity-leave-active
  transition opacity 0.2s

.opacity-enter-from,
.opacity-leave-to
  opacity 0

.opacitylong-enter-active,
.opacitylong-leave-active
  transition-delay 1s
  transition-property opacity
  transition-duration 0.2s

.opacitylong-enter-from,
.opacitylong-leave-to
  transition-delay 0s
  opacity 0
</style>

<!-- temp -->
<style lang="scss">
._phoneInvalid input {
  outline: none !important;
  box-shadow: 0 0 0 1px red;
}
input._phoneInvalid {
  outline: none !important;
  box-shadow: 0 0 0 1px red;
}
</style>
