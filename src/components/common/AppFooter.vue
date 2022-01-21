<template lang="pug">
footer.footer
  ul.footer-socialList
    li.footer-socialListItem
      a(href="https://vk.com/onenetofficial" target="_blank")
        img(src="@/assets/icons/vk-icon.svg" alt="логотип вконтакте")
    li.footer-socialListItem
      a(href="https://t.me/onenetofficial" target="_blank")
        img(src="@/assets/icons/telegram-icon.svg" alt="логотип телеграм")
  .footer-info
    span Copyright &copy;&nbsp;2019-2022 OneNet
    .footer-separator
    span Все права защищены
  ul.footer-linksList
    li.footer-linksListItem
      a(href="https://onenet.gainnet.site/web-privacy" target="_blank").footer-linksListLink Политика конфиденциальности
    li.footer-linksListItem
      a(href="https://onenet.gainnet.site/web-terms" target="_blank").footer-linksListLink Партнёрское соглашение
</template>

<style lang="stylus">
.footer-socialList,
.footer-linksList
  list-reset()

  margin 0 (- $size-x2)
  display flex

.footer-linksListItem,
.footer-socialListItem
  margin 0 $size-x2

.footer-linksListItem
  position relative

  &:not(:last-child):after
    content ''
    position absolute
    top 50%
    transform translateY(-50%)
    right -10px
    width 5px
    height 5px
    background-color $color-malibu
    border-radius 100%

.footer-info
  display flex
  align-items center
  margin $size-x3 0
  font-weight 300
  font-size 14px
  color var(--el-color-info)

.footer-linksListLink
  link-reset()
  link-style()

  text-decoration none

.footer-separator
  height 16px
  width 1px
  background var(--el-color-info)
  margin 0 $size-x3
</style>
