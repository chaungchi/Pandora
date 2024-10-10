<script setup>
import { computed } from "vue";
import { useAppStore } from "@/store/modules/app";
import { goName } from "@/common";
const appStore = useAppStore();
const isDark = computed(() => appStore.getIsDark);

const title = import.meta.env.VITE_APP_TITLE;
</script>
<template>
  <div class="flex">
    <div class="wa h100% overflow-hidden p16" @click="goName('web')">
      <template v-if="isDark">
        <img src="@/assets/image/logo/cxc_light.png" class="wa h100%!" />
      </template>
      <template v-else>
        <img src="@/assets/image/logo/cxc_dark.png" class="wa h100%!" />
      </template>
    </div>
    <!--  <div class="fw-bold color-theme center py0">
      {{ title }}
    </div> -->
  </div>
</template>
<style lang="scss"></style>
