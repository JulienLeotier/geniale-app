<script setup lang="ts">
import router, { AdminRoute } from "@/router";
import { buttonStyle } from "@/styles/button";

import { useRoomApi } from "../compositions/use-room-api";
import { useUserApi } from "../compositions/use-user-api";
import { RoomCreateDTO } from "../models/room";

import { LeftOutlined, CloudUploadOutlined } from "@ant-design/icons-vue";
import { message, UploadProps } from "ant-design-vue";
import { onBeforeMount, Ref, ref, watch } from "vue";

const validateMessages = {
  required: "${label} ne doit pas être vide!",
};

const formRoom = ref<RoomCreateDTO>({
  name: "",
  description: "",
  ambianceMusicFiles: [],
  enigmaFiles: [],
  introFiles: [],
  outroFiles: [],
  revelationFiles: [],
  detective: 0,
  variant: 0,
});
const { getAllUsers } = useUserApi();
const { createRoom } = useRoomApi();
const { fetch: getUsers, isFetching, data } = getAllUsers();
const {
  fetch: postRoom,
  data: roomCreated,
  isFetching: isFetchingRoomCreated,
} = createRoom();
const users: Ref<{ value: number; label: string }[] | []> = ref([]);
const value1 = ref(0);
const value2 = ref(0);
const fileListAmbiance = ref<UploadProps["fileList"]>([]);
const fileListEnigma = ref<UploadProps["fileList"]>([]);
const fileListIntro = ref<UploadProps["fileList"]>([]);
const fileListOutro = ref<UploadProps["fileList"]>([]);
const fileListRevelation = ref<UploadProps["fileList"]>([]);

const onFinish = async () => {
  const formData = new FormData();

  let hasFiles =
    fileListAmbiance.value !== undefined && fileListAmbiance.value.length > 0;
  if (hasFiles) {
    fileListAmbiance.value?.forEach((file: any) => {
      formData.append("ambiance_music_files", file as any);
    });
  }
  hasFiles =
    fileListEnigma.value !== undefined && fileListEnigma.value.length > 0;
  if (hasFiles) {
    fileListEnigma.value?.forEach((file: any) => {
      formData.append("enigma_files", file as any);
    });
  }
  hasFiles =
    fileListIntro.value !== undefined && fileListIntro.value.length > 0;
  if (hasFiles) {
    fileListIntro.value?.forEach((file: any) => {
      formData.append("intro_files", file as any);
    });
  }
  hasFiles =
    fileListOutro.value !== undefined && fileListOutro.value.length > 0;
  if (hasFiles) {
    fileListOutro.value?.forEach((file: any) => {
      formData.append("outro_files", file as any);
    });
  }
  hasFiles =
    fileListRevelation.value !== undefined &&
    fileListRevelation.value.length > 0;
  if (hasFiles) {
    fileListRevelation.value?.forEach((file: any) => {
      formData.append("revelation_files", file as any);
    });
  }
  formData.append("name", formRoom.value.name);
  if (formRoom.value.description) {
    formData.append("description", formRoom.value.description);
  }
  formData.append("detective", value1.value.toString());
  formData.append("variant", value2.value.toString());
  await postRoom({
    body: formData,
  });
};

const handleRemoveAmbiance: UploadProps["onRemove"] = (file) => {
  if (!fileListAmbiance.value) {
    return;
  }

  const index = fileListAmbiance.value.indexOf(file);
  const newFileList = fileListAmbiance.value.slice();
  newFileList.splice(index, 1);
  fileListAmbiance.value = newFileList;
};
const handleRemoveEnigma: UploadProps["onRemove"] = (file) => {
  if (!fileListEnigma.value) {
    return;
  }

  const index = fileListEnigma.value.indexOf(file);
  const newFileList = fileListEnigma.value.slice();
  newFileList.splice(index, 1);
  fileListEnigma.value = newFileList;
};
const handleRemoveIntro: UploadProps["onRemove"] = (file) => {
  if (!fileListIntro.value) {
    return;
  }

  const index = fileListIntro.value.indexOf(file);
  const newFileList = fileListIntro.value.slice();
  newFileList.splice(index, 1);
  fileListIntro.value = newFileList;
};
const handleRemoveOutro: UploadProps["onRemove"] = (file) => {
  if (!fileListOutro.value) {
    return;
  }

  const index = fileListOutro.value.indexOf(file);
  const newFileList = fileListOutro.value.slice();
  newFileList.splice(index, 1);
  fileListOutro.value = newFileList;
};
const handleRemoveRevelation: UploadProps["onRemove"] = (file) => {
  if (!fileListRevelation.value) {
    return;
  }

  const index = fileListRevelation.value.indexOf(file);
  const newFileList = fileListRevelation.value.slice();
  newFileList.splice(index, 1);
  fileListRevelation.value = newFileList;
};
const beforeUploadAmbiance: UploadProps["beforeUpload"] = (file) => {
  fileListAmbiance.value = [...fileListAmbiance.value!, file];
  return false;
};
const beforeUploadEnigma: UploadProps["beforeUpload"] = (file) => {
  fileListEnigma.value = [...fileListEnigma.value!, file];
  return false;
};
const beforeUploadIntro: UploadProps["beforeUpload"] = (file) => {
  fileListIntro.value = [...fileListIntro.value!, file];
  return false;
};
const beforeUploadOutro: UploadProps["beforeUpload"] = (file) => {
  fileListOutro.value = [...fileListOutro.value!, file];
  return false;
};
const beforeUploadRevelation: UploadProps["beforeUpload"] = (file) => {
  fileListRevelation.value = [...fileListRevelation.value!, file];
  return false;
};

onBeforeMount(async () => {
  await getUsers({});
});

watch(
  () => roomCreated.value,
  async () => {
    if (roomCreated.value) {
      await router.push({ name: AdminRoute.name });
      message.success("Salle du temps créée avec succès");
    }
  },
);

watch(
  () => data.value,
  () => {
    users.value =
      data.value?.users?.map((user) => ({
        value: user.id,
        label: user.username,
      })) || [];
    value1.value = users.value[0].value;
    value2.value = users.value[0].value;
  },
);
const onBack = () => {
  router.go(-1);
};
const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};
</script>
<template>
  <a-spin :spinning="isFetching || isFetchingRoomCreated">
    <a-button @click="onBack()" :style="buttonStyle">
      <template #icon> <LeftOutlined /> </template>
    </a-button>
    <a-row justify="center" align="center">
      <a-col
        :span="24"
        style="
          justify-content: center;
          display: flex;
          align-content: center;
          width: 100vw;
        "
      >
        <a-card style="width: 90vw; background-color: #247687; color: white">
          <a-row justify="center" align="center">
            <a-col
              :span="24"
              style="
                justify-content: center;
                display: flex;
                align-content: center;
                color: white;
              "
            >
              <h1>Créer une salle du temps</h1>
            </a-col>
            <a-col
              :span="24"
              style="
                justify-content: center;
                display: flex;
                align-content: center;
              "
            >
              <a-typography style="color: white"
                >Ajouter une salle du temps pour tout les joueurs</a-typography
              >
            </a-col>
          </a-row>
          <a-form
            :model="formRoom"
            name="normal_login"
            class="login-form"
            layout="vertical"
            :validate-messages="validateMessages"
            @finish="onFinish"
            style="width: 80vw; padding: 8px"
          >
            <a-form-item
              label="Nom de la salle"
              :name="['name']"
              style="margin-left: 8px; margin-right: 8px"
              :rules="[
                {
                  required: true,
                },
              ]"
            >
              <a-input
                v-model:value="formRoom.name"
                autocomplete="current-name"
                placeholder="Nom de la salle"
                style="height: 48px"
              />
            </a-form-item>
            <a-form-item
              label="Description"
              :name="['description']"
              style="margin-left: 8px; margin-right: 8px"
            >
              <a-input
                v-model:value="formRoom.description"
                placeholder="Description"
                style="height: 48px"
              />
            </a-form-item>
            <a-form-item
              label="Detective"
              :name="['detective']"
              style="margin-left: 8px; margin-right: 8px"
              :rules="[
                {
                  required: true,
                },
              ]"
            >
              <a-select
                ref="select"
                v-model:value="value1"
                @change="handleChange"
                :options="users"
              />
            </a-form-item>
            <a-form-item
              label="Variant"
              :name="['variant']"
              style="margin-left: 8px; margin-right: 8px"
              :rules="[
                {
                  required: true,
                },
              ]"
            >
              <a-select
                ref="select"
                v-model:value="value2"
                @change="handleChange"
                :options="users"
              />
            </a-form-item>
            <a-form-item name="dragger" label="Musique d'ambiance">
              <a-upload-dragger
                :file-list="fileListAmbiance"
                :before-upload="beforeUploadAmbiance"
                :multiple="true"
                @remove="handleRemoveAmbiance"
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
            <a-form-item name="dragger" label="Images pour les énigmes">
              <a-upload-dragger
                :file-list="fileListEnigma"
                :before-upload="beforeUploadEnigma"
                :multiple="true"
                @remove="handleRemoveEnigma"
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
            <a-form-item name="dragger" label="Musique d'intro">
              <a-upload-dragger
                :file-list="fileListIntro"
                :before-upload="beforeUploadIntro"
                :multiple="true"
                @remove="handleRemoveIntro"
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
            <a-form-item name="dragger" label="Musique d'outro">
              <a-upload-dragger
                :file-list="fileListOutro"
                :before-upload="beforeUploadOutro"
                :multiple="true"
                @remove="handleRemoveOutro"
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
            <a-form-item name="dragger" label="Vidéo de révélation">
              <a-upload-dragger
                :file-list="fileListRevelation"
                :before-upload="beforeUploadRevelation"
                :multiple="true"
                @remove="handleRemoveRevelation"
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

            <a-form-item>
              <a-flex justify="center" align="center">
                <a-button
                  type="primary"
                  html-type="submit"
                  style="height: 56px; width: 302px"
                >
                  Enregister
                </a-button>
              </a-flex>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </a-spin>
</template>
<style scoped>
:deep(.ant-card .ant-card-body) {
  padding: 0;
  padding-left: 15px;
}
:deep(.ant-form-item .ant-form-item-label > label) {
  color: white;
}
</style>
