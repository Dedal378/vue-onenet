<script setup>
const props = defineProps({
  status: Object,
});
</script>

<template lang="pug">
ul.statusInfoList
  li.statusInfoList-item()
    span.statusInfoList-itemName Имя
    strong.statusInfoList-itemValue Александр
  li.statusInfoList-item()
    span.statusInfoList-itemName ID
    strong.statusInfoList-itemValue 189376824
  li.statusInfoList-item()
    span.statusInfoList-itemName Баланс
    strong.statusInfoList-itemValue 189376824
  li.statusInfoList-item()
    span.statusInfoList-itemName email
    strong.statusInfoList-itemValue 189376824
  li.statusInfoList-item()
    span.statusInfoList-itemName Активность
    strong.statusInfoList-itemValue 189376824
  li.statusInfoList-item()
    span.statusInfoList-itemName Тип
    strong.statusInfoList-itemValue 189376824
  li.statusInfoList-item()
    span.statusInfoList-itemName Cтатус
    strong.statusInfoList-itemValue 189376824
    //p.
    //  Информация по веб-мастеру:
    //  -имя (name)
    //  -ID
    //  -Баланс
    //  -email
    //  -активность вебмастера
    //  -Тип вебмастера (внутренний и внешний) (is_outdoor)
    //  -статус вебмастера(серебро, золото, платина) , когда приходит серебро то показываем Поповер с информацией статус и что будет на других статусах, при золоте показываем поповер с информацией на статусе платина(+20%) , на платине показываем Поповер с информацией по этому статусу
    //p.
    //  Информация по персональному менеджеру:
    //  -аватар
    //  -имя
    //  -ссылка на почту
    //  -ссылка на телеграмм
    //  -активность

</template>

<style lang="stylus">
.statusInfoList
  list-reset()

  &-item
    font-size 14px
    line-height 20px
    color $color-shuttle-gray
    padding $size-x2 0
    display flex
    justify-content space-between
    align-items center

    &:not(:last-child)
      border-bottom 1px solid var(--el-border-color-light)

  &-itemName
    +media-width-down($mobile)
      margin-right $size-x2
</style>
