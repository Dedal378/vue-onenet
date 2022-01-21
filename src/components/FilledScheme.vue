<script setup>
const props = defineProps({ color1: String, color2: String });
import { getformData as formData } from '@/store.js';
</script>

<template lang="pug">
.filledScheme(@click="formData.color = [props.color1, props.color2]")
  .filledScheme-item(:style="{background: props.color1}")
  .filledScheme-item(:style="{background: props.color2}")
</template>

<style lang="stylus">
.filledScheme
  display flex
  width 30px
  height 30px
  border-radius 100%
  overflow: hidden
  cursor pointer
  transform rotate(45deg)
  transition 0.2s

  &:hover
    box-shadow 0px 2px 20px rgba(0, 0, 0, 0.2)
    border 1px solid purple

.filledScheme-item

  &:first-child
    margin-right -1px

  height 100%
  width 100%
</style>
