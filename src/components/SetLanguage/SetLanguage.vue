<script setup>
import { nextTick, ref, computed, watch } from "vue";
import { useAppStore } from "@/store/modules/app";
import { useI18n } from "vue-i18n";
import Icons from "#/Icons";
const { t, locale } = useI18n();
const appStore = useAppStore();
const langOption = computed(() => appStore.getLangOption);
const value = ref(appStore.getLang);
watch(
  () => value.value,
  (value) => {
    locale.value = value;
    appStore.setLang(value);
  }
);
</script>
<template>
  <div class="w100% h100% center">
    <n-popselect v-model:value="value" :options="langOption">
      <div class="w100% h100% center">
        <div class="cp header-icon-fs hover:color-theme i-tabler:message-language" />
      </div>
    </n-popselect>
  </div>
</template>
<style lang="scss">
.n-switch__rail {
  width: 100%;
}
</style>
