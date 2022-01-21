import { toRefs, reactive, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { ElMessage } from 'element-plus';

import { getCode, signUp } from '@/api/auth';
import { validations, generateDeviceId } from '@/services/utils';

import 'element-plus/theme-chalk/el-message.css';

const useLogin = () => {
  const router = useRouter();

  const localState = reactive({
    login: '',
    password: '',
    formState: 'code',
    isWithPass: false,
    hashCode: '',
    code: '',
    timer: 0,
    timerId: null,
    responseMsgError: 'Что-то пошло не так, попробуйте еще раз!',
    deviceId: '',
    type: 'onenet',
  });

  const isShowPasswordField = computed({
    get: () => localState.formState === 'login',
    set: () => {},
  });

  const submitBtnText = computed({
    get: () => {
      const text =
        localState.isWithPass || localState.formState === 'pendingCode'
          ? 'Войти'
          : 'Выслать код';

      return text;
    },
    set: () => {},
  });

  const isDisableSubmitBtn = computed({
    get: () => {
      let isDisable = true;

      if (
        (localState.formState === 'code' && !localState.login) ||
        (localState.formState === 'pendingCode' && !localState.code)
      ) {
        isDisable = true;
      } else if (
        localState.formState === 'login' &&
        (!localState.login || !localState.password)
      ) {
        isDisable = true;
      } else {
        isDisable = false;
      }

      return isDisable;
    },
    set: () => {},
  });

  const switchAuthMethod = () => {
    localState.formState = localState.isWithPass ? 'login' : 'code';
  };

  const showError = () => {
    ElMessage({
      message: localState.responseMsgError,
      type: 'error',
    });
  };

  const decrementTimer = () => {
    if (localState.timer) {
      localState.timer -= 1;
    } else {
      clearInterval(localState.timerId);
    }
  };

  const startTimer = () => {
    setInterval(decrementTimer, 1000);
  };

  const submitHandler = async () => {
    if (isDisableSubmitBtn.value) return false;

    if (localState.formState === 'code') {
      const { deviceId, type, login } = localState;

      const dataReq = {
        device_id: deviceId,
        type,
        login,
      };
      const { success, data } = await getCode(dataReq);

      if (success) {
        localState.formState = 'pendingCode';
        localState.hashCode = data.hash;
        localState.timer = 59;
        localState.code = '';
        await startTimer();
      } else {
        showError();
      }
    } else if (
      localState.formState === 'pendingCode' ||
      localState.formState === 'login'
    ) {
      const dataReqAuth =
        localState.formState === 'login'
          ? {
              login: localState.login,
              password: localState.password,
              device_id: localState.deviceId,
              type: localState.type,
            }
          : {
              login: localState.login,
              code: localState.code,
              device_id: localState.deviceId,
              type: localState.type,
              hash: localState.hashCode,
            };
      const { success } = await signUp(dataReqAuth);

      if (success) {
        router.push('/');
      } else {
        showError();
      }
    }
  };

  watch(
    () => localState.timer,
    (value) => {
      if (!value) {
        localState.formState = 'code';
      }
    },
  );

  watch(
    () => localState.code,
    (value) => {
      if (validations.isNumber(value)) {
        localState.code = value;
      } else {
        localState.code = '';
      }
    },
  );

  onMounted(async () => {
    localState.deviceId = await generateDeviceId(18);
  });

  return {
    ...toRefs(localState),
    isShowPasswordField,
    submitBtnText,
    switchAuthMethod,
    submitHandler,
    isDisableSubmitBtn,
  };
};

export default useLogin;
