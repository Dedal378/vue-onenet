<script setup>
import 'element-plus/theme-chalk/el-button.css';
import { ElButton } from 'element-plus';

import { ref } from 'vue';
const props = defineProps({ testprop: String });
const testarr = ref([0, 1, 2, 3]);
</script>

<template lang="pug">
input(:value="testarr[0]" @input="testarr[0] = $event")
input(v-model="testarr[0]")
input(v-model="testarr[1]")
input(v-model="testarr[2]")
input(v-model="testarr[3]")
pre {{testarr}}
//- ElButton(type="primary" v-bind="$attrs"): slot
//- span {{props.testprop}}

</template>
