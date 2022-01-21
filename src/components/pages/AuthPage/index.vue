<script setup>
import AuthForm from '@/components/pages/AuthPage/AuthForm.vue';
</script>

<template lang="pug">
.authPage
  .authPage-form
    AuthForm
</template>

<style lang="stylus">
.authPage
  min-height 100vh
  width 100%
  background-image url('@/assets/auth-bg-min.jpg')
  background-repeat no-repeat
  background-size cover
  position relative
  z-index 1
  display flex
  align-items center
  justify-content center

  &:after
    content ''
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    z-index 2
    background-color rgba(255, 255, 255, .6)


  &-form
    width 300px
    z-index 3
</style>
