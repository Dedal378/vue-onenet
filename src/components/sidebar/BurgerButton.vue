<template lang="pug">
button.burger
  span
  span
</template>
<style lang="stylus">
.burger
  button-reset()

  cursor pointer
  display flex
  justify-content center
  align-items center
  flex-direction column

  &:focus
    outline 0

  span
    width 100%
    height 2px
    transition all .3s ease-in
    transform-origin center
    margin 2px 0
    border-radius 4px
    background-color $color-violet

  &._opened

    span:nth-child(1)
      transform rotate(-45deg) translateX(-4px)

    span:nth-child(2)
      transform rotate(45deg) translateX(-4px)
</style>
