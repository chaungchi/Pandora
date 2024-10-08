<script setup>
import { computed } from "vue";
import { useAppStore } from "@/store/modules/app";
const props = defineProps({
  fs: {
    type: Number
  },
  type: {
    type: Number,
    default: 1
  }
});
const appStore = useAppStore();
const isDark = computed(() => appStore.getIsDark);
const setIsDark = () => {
  appStore.setIsDark(!isDark.value);
};
</script>
<template>
  <div class="w100% h100% center">
    <template v-if="type == 1">
      <div
        :style="{ fontSize: props.fs + 'px' }"
        class="cp header-icon-fs i-tabler:sun-filled dark:i-tabler:moon-stars transition-duration-500"
        @click="setIsDark" />
    </template>
    <template v-else>
      <div
        :style="{ fontSize: props.fs + 'px' }"
        class="cp header-icon-fs i-tabler:color-filter transition-duration-500"
        @click="setIsDark" />
    </template>
  </div>
</template>
<style lang="scss"></style>
