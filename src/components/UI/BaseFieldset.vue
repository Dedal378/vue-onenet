<script setup>
const props = defineProps({ title: String });
</script>

<template lang="pug">
fieldset.baseFieldset
  legend.baseFieldset-legend {{props.title}}
  slot
</template>

<style lang="stylus">
.baseFieldset
  padding 0
  border none
  margin 0

.baseFieldset-legend
  margin-bottom 5px
</style>
