<script setup>
import { formattedDate } from '@/services/utils';
import defaultTransactions from '@/data/defaultTransactions';

const props = defineProps({
  transactions: Array,
});

const getFilteredTransaction = (type_id) => {
  const [defaultTransaction] = defaultTransactions.filter(
    (item) => item.id === type_id,
  );
  return defaultTransaction;
};

const getLink = (transaction) => {
  const { type_id, who_id } = transaction;
  const filteredTransaction = getFilteredTransaction(type_id);

  if (filteredTransaction?.linkType !== 'lead') {
    return `\/cabinet\/${filteredTransaction.linkType}/`;
  }

  return `\/cabinet\/leads/${who_id}`;
};

const formattedSum = (transaction) => {
  const { id, type_id, sum } = transaction;
  const filteredTransaction = getFilteredTransaction(type_id);
  const fSum =
    filteredTransaction?.mode === 'positive'
      ? `+ ${sum} &#8381;`
      : `- ${sum} &#8381;`;

  return fSum;
};

const getClassMod = (transaction) => {
  const { id, type_id, sum } = transaction;
  const filteredTransaction = getFilteredTransaction(type_id);
  const classMod =
    filteredTransaction?.mode === 'positive' ? '_positive' : '_negative';

  return classMod;
};

const formattedName = (transaction) => {
  const { type_id } = transaction;
  const filteredTransaction = getFilteredTransaction(type_id);

  return filteredTransaction?.name;
};
</script>

<template lang="pug">
ul.leadsTransactionsList
  li.leadsTransactionsList-item(v-for="(transaction, index) in transactions")
    router-link.leadsTransactionsList-itemLink(:to="getLink(transaction)")
      span.leadsTransactionsList-itemDesc {{ formattedName(transaction) }}
      .leadsTransactionsList-itemInfo
        span.leadsTransactionsList-itemSum(
          v-html="formattedSum(transaction)"
          :class="getClassMod(transaction)"
        )
        span.leadsTransactionsList-itemDate {{ formattedDate(transaction.created_at) }}
</template>

<style lang="stylus">
.leadsTransactionsList
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

  &-itemDesc
    margin-right $size-x2
    max-width 140px

    +media-width-down($max-width-m)
      margin-right 0
      margin-bottom $size-x2

  &-itemInfo
    text-align right

    +media-width-down($tablet)
      display flex
      flex-direction column

  &-itemLink
    a-reset()
    link-style()

    display flex
    justify-content space-between
    width 100%
    opacity .75
    transition opacity .75s ease

    &:hover
      opacity 1

    +media-width-down($tablet)
      margin-right 0
      align-items center


  &-itemSum
    margin-right $size-x4
    display inline-block
    position relative

    &::after
      content ''
      position absolute
      width 1px
      height 100%
      background-color var(--el-border-color-light)
      right - $size-x2

      +media-width-down($tablet)
        display none

    &._negative
      color $color-coral-red

    &._positive
      color $color-caribbean-green

    +media-width-down($tablet)
      margin-right 0

  &-itemDate
    color $color-shuttle-gray
    display inline-block
    width 140px
</style>
