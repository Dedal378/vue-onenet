<script setup>
import { onMounted } from 'vue';

import { ElTable, ElTableColumn } from 'element-plus';

import 'element-plus/theme-chalk/el-table.css';
import 'element-plus/theme-chalk/el-table-column.css';

import { getWebmasterPromos, deleteWebmasterPromo } from '@/api/api.js';

let tableData = [];

onMounted(async () => {
  tableData = await getWebmasterPromos();
});

const goToPage = ({ id }) => {
  window.location.href = `http://onenet.local/cabinet/promos/13/${id}/edit`;
};

const deletePromo = async ({ id }) => {
  const res = await deleteWebmasterPromo({ id });
};
</script>

<template lang="pug">
ElTable.promoList(:data="tableData")
  ElTableColumn(prop="name" label="Название" )
  ElTableColumn(prop="link" label="Ссылка")
  ElTableColumn(prop="type" label="Тип")
  ElTableColumn(prop="actions" label="Действие")
    template(#default="scope"): .promoList-actions
      .promoList-edit(@click="goToPage(scope.row.id)") Редактировать
      .promoList-double Дублировать
      .promoList-delete(@click="deletePromo(scope.row.id)") Удалить
</template>

<style lang="scss">
.promoList {
  // width: 600px;
}

.promoList-actions {
  display: flex;
  gap: 10px;
}

.promoList-double,
.promoList-delete {
  cursor: pointer;
}
</style>
