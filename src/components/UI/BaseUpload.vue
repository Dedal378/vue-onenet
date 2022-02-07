<script setup>
import { ElUpload, ElMessage } from 'element-plus';

import 'element-plus/theme-chalk/el-upload.css';
import 'element-plus/theme-chalk/el-message.css';

const emit = defineEmits('file-upload');

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = (error) => reject(error);
  });

const isImage = (type) => {
  return (
    type === 'image/jpeg' ||
    type === 'image/png' ||
    type === 'image/gif' ||
    type === 'image/webp' ||
    type === 'image/bmp'
  );
};

const getFileExtension = (type) => {
  const extension = type.split('/').pop();
  return extension;
};

const handleUpload = async ({ raw }, fileList) => {
  const { type } = raw;
  const isFileImage = isImage(type);
  const extension = getFileExtension(type);

  if (!isFileImage) {
    ElMessage.error('Файл не является картинкой!');
    return;
  }

  const fileBase64 = await toBase64(raw);
  emit('file-upload', { file_base64: fileBase64, extension });
};
</script>

<template lang="pug">
ElUpload(
  action="#"
  list-type="picture-card"
  :auto-upload="false"
  :on-change="handleUpload"
  :show-file-list="false"
  ).baseUpload
    mdicon(name="plus" size="24").baseUpload-icon
</template>

<style lang="stylus">
.baseUpload {
  .el-upload,
  .el-upload-list__item {
    width: 88px;
    height: 88px;
    line-height: 98px;
    border-radius: 100%;
    display flex
    justify-content center
    align-items center
  }
  .el-icon-plus {
    vertical-align: middle;
    font-size: 20px;
  }
  .el-upload-list__item-thumbnail {
    object-fit: cover;
  }
}

.baseUpload-icon svg
  fill var(--el-color-primary)
</style>
