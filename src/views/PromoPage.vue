<script setup>
import PromoForm from '@/components/PromoForm.vue';
import { computed, ref } from 'vue';
import { getformData as formData } from '@/store.js';

// TODO export widgets to npm pack
import TurboWidget from '@/components/widgets/TurboWidget/TurboWiget.vue';
import JuriForm from '@/components/widgets/JuriForm/JuriForm.vue';
import MiniForm from '@/components/widgets/MiniForm/MiniForm.vue';
import BackCall from '@/components/widgets/BackCall/BackCall.vue';
import PopupForm from '@/components/widgets/PopupForm/PopupForm.vue';

const widgetsObj = {
  JuriForm,
  TurboWidget,
  OnlineConsultant: TurboWidget,
  MiniForm,
  PopupForm,
  BackCall,
};

const currentWidget = computed(() => {
  return widgetsObj[formData.value.type];
});

const getCurrentDateInMS = () => new Date().getTime();

const currentComponentKey = ref(getCurrentDateInMS());

function remountComponent() {
  currentComponentKey.value = getCurrentDateInMS();
}
</script>

<template lang="pug">
.promoPage
  PromoForm(@remountComponent="remountComponent")
  teleport(to="#onenet-modals"): Component(:is="currentWidget" :key="`${formData.type}${currentComponentKey}`")
</template>

<style lang="stylus">
.promoPage
  overflow-x hidden

// TODO собрать общие стили для виджетов убрать отдельно
.gn-textPrimary
  color var(--first-color)

.gnPolicy-message
  position absolute
  min-width auto
  width 310px
  cursor pointer

// widget-helpers
.gn-cursorPointer
  cursor pointer
</style>
