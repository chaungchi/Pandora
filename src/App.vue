<script setup>
import { computed } from "vue";
import { dateZhCN, zhCN, enUS, dateEnUS, darkTheme } from "naive-ui";
import usemessageComponents from "#/usemessageComponents";
import loadingBar from "#/loadingBar";
import { useI18n } from "vue-i18n";
import { useAppStore } from "@/store/modules/app";
const appStore = useAppStore();
const { t, locale } = useI18n();
window.$t = t;
const isDark = computed(() => appStore.getIsDark);
const lang = computed(() => appStore.getLang);
const themeOverrides = computed(() => appStore.getThemeOverrides);
appStore.init();
locale.value = appStore.getLang;
</script>
<template>
  <n-config-provider
    class="fixed top-0 bottom-0 left-0 right-0"
    :class="{ dark: isDark }"
    :locale="lang == 'zh' ? zhCN : enUS"
    :date-locale="lang == 'zh' ? dateZhCN : dateEnUS"
    :theme="isDark ? darkTheme : null"
    :theme-overrides="themeOverrides">
    <n-global-style />
    <n-message-provider>
      <usemessageComponents></usemessageComponents>
      <router-view></router-view>
      <loadingBar />
    </n-message-provider>
  </n-config-provider>
</template>
