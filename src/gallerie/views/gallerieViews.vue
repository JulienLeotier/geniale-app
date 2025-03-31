<script setup lang="ts">
import DialogImageUpdate from "../components/DialogImageUpdate.vue";
import { useDragDropFileUpload } from "../composition/use-drag-drop-file-upload";
import { useImageApi } from "../composition/use-image-api";
import { IImage } from "../models/image";

import { UploadProps } from "ant-design-vue";
import { ref, computed, onBeforeMount, watch } from "vue";
import AudioPlayer from "vue3-audio-player";
import "vue3-audio-player/dist/style.css";

const { getImages, deleteImage, postImage } = useImageApi();
const { files, resetFiles } = useDragDropFileUpload();

watch(files, async () => {
  const fileUpload = files.value;

  const hasFiles = fileUpload !== undefined && fileUpload.length > 0;
  if (hasFiles) {
    onUpdateImage(fileUpload);
    resetFiles();
  }
});
const {
  data,
  isFetching: isFetchingImages,
  fetch: FetchingImages,
} = getImages();
const {
  data: dataDelete,
  isFetching: isFetchingDelete,
  fetch: FetchingDelete,
} = deleteImage();
const { isFetching: isFetchingUpdate, fetch: FetchingUpdate } = postImage();
const urlBack = "http://localhost:8080/";
const showUpdateModal = ref(false);

onBeforeMount(async () => {
  await FetchingImages({});
});

const onDeleteImage = async (image: IImage) => {
  await FetchingDelete({
    pathParameters: {
      id: image.id,
    },
  });
};

const onUpdateImage = async (files: UploadProps["fileList"] | File[]) => {
  const formData = new FormData();
  let success = true;

  const hasFiles = files !== undefined && files.length > 0;
  if (hasFiles) {
    files.forEach((file: any) => {
      formData.append("file", file as any);
    });
    await FetchingUpdate({
      body: formData,
    });
    await FetchingImages({});
  }
  showUpdateModal.value = false;
  return success;
};

const isFetching = computed(
  () =>
    isFetchingImages.value || isFetchingDelete.value || isFetchingUpdate.value,
);

watch(
  () => dataDelete.value,
  async () => {
    await FetchingImages({});
  },
);

const isVideo = (filePath: string) => {
  const videoExtensions = ["mp4", "webm", "ogg"];
  const fileExtension = filePath.split(".").pop()?.toLowerCase();
  return videoExtensions.includes(fileExtension || "");
};

const isAudio = (filePath: string) => {
  const audioExtensions = ["mp3"];
  const fileExtension = filePath.split(".").pop()?.toLowerCase();
  return audioExtensions.includes(fileExtension || "");
};

const isPdf = (filePath: string) => {
  const pdfExtensions = ["pdf"];
  const fileExtension = filePath.split(".").pop()?.toLowerCase();
  return pdfExtensions.includes(fileExtension || "");
};
</script>

<template>
  <a-spin :spinning="isFetching">
    <a-row justify="center" align="center" style="margin: 8px">
      <a-flex justify="center" align="center">
        <a-button
          @click="showUpdateModal = true"
          type="primary"
          style="height: 56px; width: 302px"
        >
          Transferer des images, videos, audios
        </a-button>
      </a-flex>
    </a-row>
    <a-row style="width: 100%" align="center" justify="center">
      <div style="margin-bottom: 100px; width: 100%">
        <a-col :span="24" v-for="image in data?.images" :key="image.id">
          <a-card style="margin: 8px; background-color: #247687; color: white">
            <template v-if="isVideo(image.file_path)">
              <video
                :src="urlBack + image.file_path"
                controls
                style="width: 100%"
              ></video>
            </template>
            <template v-else-if="isAudio(image.file_path)">
              <AudioPlayer
                style="width: 100%"
                :option="{
                  src: urlBack + image.file_path,
                  title: 'your-audio-title',
                  coverImage: './test.png',
                }"
              />
            </template>
            <template v-else-if="isPdf(image.file_path)">
              <embed
                :src="urlBack + image.file_path"
                type="application/pdf"
                width="100%"
                height="500px"
              />
            </template>
            <template v-else>
              <a-image
                :src="urlBack + image.file_path"
                alt="image"
                style="width: 100%"
              />
            </template>
            <template #actions>
              <a-button type="primary" danger @click="onDeleteImage(image)"
                >Supprimer</a-button
              >
            </template>
          </a-card>
        </a-col>
      </div>
    </a-row>
  </a-spin>
  <DialogImageUpdate
    v-if="showUpdateModal"
    v-model:isVisible="showUpdateModal"
    :is-loading="isFetchingUpdate"
    @on-close-image-upload-dialog="showUpdateModal = false"
    @on-begin-upload="onUpdateImage"
  />
</template>
