<script setup>
import { ElPopover } from 'element-plus';
import 'element-plus/theme-chalk/el-popover.css';

const props = defineProps({
  status: Object,
});
</script>

<template lang="pug">
h3.statusInfoList Name Surname

ul.statusInfoList
  li.statusInfoList-item(v-for="item in status" :key="item.id")
    span.statusInfoList-itemName {{ item.id }}
    strong.statusInfoList-itemValue
      ElPopover(
        placement="top-start"
        title="Title"
        :width="200"
        trigger="hover"
        content="this is content, this is content, this is content")
        template(#reference)
          el-button {{ item.status }}

hr
br
br
ul.statusInfoList()
  li.statusInfoList-item()
    span.statusInfoList-itemName ID
    strong.statusInfoList-itemValue 189376824
  li.statusInfoList-item()
    span.statusInfoList-itemName Баланс
    strong.statusInfoList-itemValue 4467
  li.statusInfoList-item()
    span.statusInfoList-itemName email
    strong.statusInfoList-itemValue 234@gmail.com
  li.statusInfoList-item()
    span.statusInfoList-itemName Активность
    strong.statusInfoList-itemValue активен
  li.statusInfoList-item()
    span.statusInfoList-itemName Тип
    strong.statusInfoList-itemValue внутренний
  li.statusInfoList-item()
    span.statusInfoList-itemName Cтатус
    strong.statusInfoList-itemValue
      ElPopover(
        placement="top-start"
        title="Title"
        :width="200"
        trigger="hover"
        content="this is content, this is content, this is content")
        template(#reference)
          el-button серебро
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
