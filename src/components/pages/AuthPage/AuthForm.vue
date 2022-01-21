<script>
import { defineComponent } from 'vue';

import BaseInput from '@/components/UI/BaseInput.vue';
import BaseIcon from '@/components/UI/BaseIcon.vue';

import { ElSwitch } from 'element-plus';

import { User, Lock } from '@element-plus/icons';

import 'element-plus/theme-chalk/el-switch.css';
import 'element-plus/theme-chalk/el-icon.css';
import 'element-plus/theme-chalk/el-notification.css';

import useLogin from '@/compositions/pages/signin/useLogin';

export default defineComponent({
  components: {
    BaseInput,
    BaseIcon,
    ElSwitch,
    User,
    Lock,
  },
  setup() {
    const loginComposition = useLogin();

    return {
      ...loginComposition,
    };
  },
});
</script>

<template lang="pug">
form.authForm(@submit.prevent="submitHandler")
  router-link.authForm-link(:to="{name: 'HomePage'}")
    img.authForm-logo(src="@/assets/icons/logo.svg")
  .authForm-body
    .authForm-inputsWrapper(v-if="formState === 'pendingCode'")
      .authForm-inputItem
        BaseIcon.authForm-icon
          Lock
        BaseInput.authForm-input(v-model.trim="code" type="text" placeholder="Код")
    .authForm-inputsWrapper(v-else)
      .authForm-inputItem
        BaseIcon.authForm-icon
          User
        BaseInput.authForm-input(v-model.trim="login" type="text" placeholder="Телефон или E-mail")
      .authForm-inputItem(v-if="isShowPasswordField")
        BaseIcon.authForm-icon
          Lock
        BaseInput.authForm-input(v-model.trim="password" type="password", placeholder="Введите пароль")
    button.authForm-button(type="submit" :class="{'_disable': isDisableSubmitBtn}") {{ submitBtnText }}
    .authForm-switchWrapper(v-if="formState !== 'pendingCode'")
      label.authForm-switchLabel(for="switch") Использовать пароль
      ElSwitch#switch.authForm-switch(v-model="isWithPass" @change="switchAuthMethod")
  .authForm-footer
    .authForm-footerTimer(v-if="formState === 'pendingCode'")
      p.authForm-footerTimerText(v-if="timer")
        | Выслать код повторно через ({{ timer }} секунд)
    p.authForm-footerText Вы соглашаетесь с&nbsp;
      a.authForm-footerLink(href="https://onenet.ru/web-terms") партнёрским соглашением
</template>

<style lang="stylus">
.authForm
  display flex
  flex-direction column
  align-items center
  border-radius 20px
  box-shadow 0 5px 40px rgba(32, 32, 32, .25), 0 5px 70px rgba(32, 32, 32, .2)
  overflow hidden
  padding 60px 20px 10px
  padding-top 60px
  position relative
  width 300px

  &:before
    content ''
    background-image linear-gradient(45deg,#fff,#faf2fb 40%,#e2f8ff 60%,#fff)
    background-size 200% auto
    height 100%
    left 0
    position absolute
    top 0
    width 100%
    z-index -2

  &-logo
    display block

  &-body
    display flex
    flex-direction column
    align-items center
    justify-content center
    margin-top 60px
    width 100%

  &-inputsWrapper
    width 100%

  &-input
    margin-bottom 20px

    .el-input__inner
      background none
      padding-left 36px

  &-inputItem
    position relative

  &-icon
    position absolute
    left 12px
    top calc(50% - 9px)
    transform translateY(-50%)

  &-button
    background-image linear-gradient(90deg, #8e2e9e, #3809a3)
    border none
    border-radius 4px
    padding 12px
    color white
    font-weight 700
    cursor pointer
    width 100%
    font-size 16px
    line-height 20px

    &._disable
      opacity 0.5
      pointer-events none

  &-switchWrapper
    margin-top 20px
    display flex
    justify-content space-between
    align-items center
    width 100%

  &-switchLabel
   font-size 13px
   line-height 17px
   color var(--el-text-color-placeholder)
   cursor pointer
   -webkit-tap-highlight-color transparent

  &-footer
    margin-top 20px
    font-size 12px
    line-height 18px
    color var(--el-text-color-placeholder)

  &-footerLink
    color inherit
</style>
