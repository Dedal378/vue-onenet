<script setup>
const props = defineProps({
  stats: Object,
});
</script>

<template lang="pug">
ul.leadsInfoList
  li.leadsInfoList-item(v-for="item in stats")
    span.leadsInfoList-itemName {{ item.title }}
    strong.leadsInfoList-itemValue(v-html="item.value")
</template>

<style lang="stylus">
.leadsInfoList
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
