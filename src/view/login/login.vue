<script setup>
import { onMounted, onUnmounted, computed } from "vue";
import useDraw from "@/utils/useDraw";
import SetIsDark from "#/SetIsDark";
import Login from "./components/Login.vue";
import { useAppStore } from "@/store/modules/app";
/* 适配处理 start *********************************************************** */
const { windowDraw, unWindowDraw, resize } = useDraw();
onMounted(() => {
  resize();
  windowDraw();
});
onUnmounted(() => {
  unWindowDraw();
});
/* 适配处理 end *********************************************************** */
const appStore = useAppStore();
appStore.init();
const themess = computed(() => appStore.getThemess);
const title = import.meta.env.VITE_APP_TITLE;
const eq = computed(() => appStore.getEquipment);
const dir = computed(() => appStore.getDirection);
</script>
<template>
  <template v-if="eq == 'h5'">
    <div class="w100% h100% center relative pb100px">
      <div class="w100% absolute top-0 fw-black bet rounded-20 p-main">
        <p class="fs-28 w50%">{{ title }}</p>
        <div>
          <SetIsDark :fs="28" />
        </div>
      </div>
      <n-card class="w98% animate__animated animate__backInUp" content-style="padding:0">
        <div class="w100% h100% bet p-main">
          <Login />
        </div>
      </n-card>
    </div>
  </template>
  <template v-else>
    <n-card
      class="w600 h400 fixed top-[calc(50%-50rem)] left-[calc(50%-75rem)] animate__animated animate__bounceInRight"
      content-style="padding:0">
      <div class="w100% h100% bet p-main">
        <Login />
      </div>
    </n-card>
  </template>
</template>
