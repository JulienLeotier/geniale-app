<script setup lang="ts">
import router, { LoginRoute } from "@/router";

const onNext = () => {
  router.push({ name: LoginRoute.name });
};
</script>
<template>
  <a-row justify="center" align="center" wrap="wrap" style="height: 100vh">
    <a-col
      :span="24"
      style="
        justify-content: center;
        display: flex;
        flex-wrap: wrap;
        align-content: center;
      "
    >
      <a-row justify="center">
        <a-col :span="24">
          <a-card
            title="GEN-IA-L"
            style="width: 80vw; background-color: #247687; color: white"
          >
            <a-row justify="center">
              <a-col :span="24">
                <a-typography class="paragraphe-onbording">
                  Votre application de voyage temporel en toute sécurité et
                  simplicité lancer vous dans une aventure inoubliable avec
                  GEN-IA-L.
                  <br />
                  Pour commencer, veuillez vous connecter ou créer un compte.
                </a-typography>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
    </a-col>

    <a-col justify="flex-end" align="flex-end">
      <a-button
        type="primary"
        style="height: 56px; width: 302px; margin: 16px"
        @click="onNext()"
      >
        Commencer
      </a-button>
    </a-col>
  </a-row>
</template>
<style scoped>
:deep(.ant-card-head-title) {
  color: white !important;
  font-size: 24px !important;
  font-weight: 700 !important;
  display: flex !important;
  justify-content: center !important;
}
.title-onbording {
  font-size: 24px;
  font-weight: 700;
  color: white;
  display: flex;
  justify-content: center;
  div {
    margin-left: 6px;
    color: #e5a3a3;
  }
}
.paragraphe-onbording {
  font-size: 16px;
  padding: 8px;
  margin: 8px;
  color: white;
  text-align: center;
}
</style>
