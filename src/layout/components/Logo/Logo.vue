<script setup>
import { goName } from "@/common";
const title = import.meta.env.VITE_APP_TITLE;
</script>
<template>
  <div class="wa h100% center p8px cp" @click="goName('web')">
    <div class="wa h100% rounded-2 overflow-hidden">
      <img src="@/assets/image/logo/chixiao.png" class="wa h100%!" />
    </div>
    <p class="font-bold color-theme">
      {{ title }}
    </p>
  </div>
</template>
<style lang="scss"></style>
