<script setup lang="ts">
import { CloudUploadOutlined } from "@ant-design/icons-vue";
import type { UploadProps } from "ant-design-vue";
import { ref, toRefs } from "vue";

const props = defineProps<{
  isVisible: boolean;
  isLoading: boolean;
}>();

const { isLoading, isVisible } = toRefs(props);

const $emit = defineEmits<{
  (e: "on-close-image-upload-dialog"): void;
  (e: "on-begin-upload", fileList: UploadProps["fileList"]): void;
}>();

const onCancel = () => {
  $emit("on-close-image-upload-dialog");
};

const onUpload = () => {
  const hasFiles = fileList.value !== undefined && fileList.value.length > 0;
  if (!hasFiles) {
    $emit("on-close-image-upload-dialog");
  }

  $emit("on-begin-upload", fileList.value);
  isLoading.value = true;
};

const handleAfterClose = () => {
  fileList.value = [];
  isLoading.value = false;
};

const fileList = ref<UploadProps["fileList"]>([]);

const handleRemove: UploadProps["onRemove"] = (file) => {
  if (!fileList.value) {
    return;
  }

  const index = fileList.value.indexOf(file);
  const newFileList = fileList.value.slice();
  newFileList.splice(index, 1);
  fileList.value = newFileList;
};

const beforeUpload: UploadProps["beforeUpload"] = (file) => {
  fileList.value = [...fileList.value!, file];
  return false;
};
</script>

<template>
  <a-modal
    title="Transférer des images"
    ok-text="Sauvegarder"
    cancel-text="annuler"
    :open="isVisible"
    :mask-closable="false"
    :confirm-loading="isLoading"
    :ok-button-props="{ disabled: isLoading }"
    :after-close="handleAfterClose"
    @ok="onUpload"
    @cancel="onCancel"
  >
    <a-form name="validate_other" @finish-failed="() => {}" @finish="() => {}">
      <a-form-item name="dragger" no-style>
        <a-upload-dragger
          :file-list="fileList"
          :before-upload="beforeUpload"
          :multiple="true"
          @remove="handleRemove"
        >
          <p class="ant-upload-drag-icon">
            <CloudUploadOutlined />
          </p>
          <p class="ant-upload-text">Cliquer ou glisser pour uploader</p>
          <p class="ant-upload-hint">
            Supporter le téléchargement de plusieurs fichiers
          </p>
        </a-upload-dragger>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
