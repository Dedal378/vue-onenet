<script setup>
import TurboWiget from '@/components/widgets/TurboWidget/TurboWiget.vue';
</script>

<template lang="pug">
.test
  h1 lorem ipsum dolor
  p(v-for="irem in 20") Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
  TurboWiget
</template>
