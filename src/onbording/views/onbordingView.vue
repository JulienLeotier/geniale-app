<script setup lang="ts">
import router, { LoginRoute } from "@/router";

const onNext = () => {
  router.push({ name: LoginRoute.name });
};
</script>
<template>
  <a-row justify="center" align="center" wrap="wrap" style="height: 100vh">
    <a-col
      :xs="24"
      :sm="12"
      :md="12"
      :lg="12"
      :xl="12"
      style="
        justify-content: center;
        display: flex;
        flex-wrap: wrap;
        align-content: center;
      "
    >
      <a-image src="./image.png" :preview="false" />
    </a-col>
    <a-col
      :xs="24"
      :sm="12"
      :md="12"
      :lg="12"
      :xl="12"
      style="
        justify-content: center;
        display: flex;
        flex-wrap: wrap;
        align-content: center;
      "
    >
      <a-row justify="center">
        <a-col :span="24">
          <a-typography class="title-onbording">
            Bienvenue dans
            <div>Pro-psy</div>
          </a-typography>
        </a-col>
        <a-col :span="24">
          <a-typography class="paragraphe-onbording">
            Pro-psy est une application innovante qui prévient les burn-out et
            améliore le bien-être au travail. Grâce à des évaluations
            personnalisées, des programmes gamifiés, et un coaching spécialisé,
            nous aidons les entreprises à créer des environnements de travail
            sains et productifs, où chaque employé peut s'épanouir pleinement.
          </a-typography>
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
.title-onbording {
  font-size: 24px;
  font-weight: 700;
  color: #000;
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
  color: #797979;
  text-align: center;
}
</style>
