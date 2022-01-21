<script setup>
const props = defineProps({
  status: Object,
});
</script>

<template lang="pug">
ul.statusInfoList
  li.statusInfoList-item(v-for="item in status")
    span.statusInfoList-itemName {{ item.title }}
    strong.statusInfoList-itemValue(v-html="item.value")
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
