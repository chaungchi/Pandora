<script setup>
import { ref, computed, watch } from "vue";
import { useAppStore } from "@/store/modules/app";
import { throttle } from "lodash";
const appStore = useAppStore();
const isDark = computed(() => appStore.getIsDark);
const themeOption = computed(() => appStore.getThemeOption);
const datkThemeValue = computed(() => appStore.getDarkTheme);
const lightThemeValue = computed(() => appStore.getLightTheme);
const light = computed(() => appStore.getLight);
const lightOption = computed(() => appStore.getLightOption);
const dark = computed(() => appStore.getDark);
const darkOption = computed(() => appStore.getDarkOption);
const themeValue = ref(isDark.value ? appStore.getDarkTheme : appStore.getLightTheme);
const themeTS = ref(Date.now());
const bgValue = ref(isDark.value ? appStore.getDark : appStore.getLight);
watch(
  () => [themeValue.value, themeTS.value],
  ([value]) => {
    if (isDark.value) {
      appStore.setDarkTheme(value);
    } else {
      appStore.setLightTheme(value);
    }
  }
);
watch(
  () => bgValue.value,
  (value) => {
    if (isDark.value) {
      appStore.setDark(value);
      appStore.init();
    } else {
      appStore.setLight(value);
      appStore.init();
    }
  }
);
const handleTheme = throttle((value) => {
  themeValue.value = value;
}, 500);
const handleBg = throttle((value) => {
  bgValue.value = value;
}, 500);
</script>
<template>
  <div class="w100% h100% center">
    <n-popover placement="bottom" raw :show-arrow="false">
      <template #trigger>
        <div class="cp header-icon-fs hover:color-theme i-tabler:aperture" />
      </template>
      <div class="w100% h100% bg-atcolor p-main fs-14">
        <div class="w100% center">主题色</div>
        <div class="flex">
          <div
            v-for="color in themeOption"
            class="max-md:w26 max-md:h26 w20 h20 cp m10 center hover-set-child"
            @click.stop="(themeValue = color), (themeTS = Date.now())">
            <div
              class="w100% h100% transition-duration-500 i-svg-spinners:blocks-scale"
              :style="{ background: color }"></div>
          </div>
        </div>
        <div>
          <template v-if="isDark">
            <n-color-picker
              :value="datkThemeValue"
              :on-update:value="handleTheme"
              :modes="['hex']"
              :show-alpha="false" />
          </template>
          <template v-else>
            <n-color-picker
              :value="lightThemeValue"
              :on-update:value="handleTheme"
              :modes="['hex']"
              :show-alpha="false" />
          </template>
        </div>
        <div class="w100% center">背景色</div>
        <div class="flex">
          <template v-if="isDark">
            <div
              v-for="color in darkOption"
              class="max-md:w26 max-md:h26 w20 h20 cp m10 center"
              :style="{ background: color }"
              :class="{ border: dark == color }"
              @click.stop="bgValue = color"></div>
          </template>
          <template v-else>
            <div
              v-for="color in lightOption"
              class="max-md:w26 max-md:h26 w20 h20 cp m10 center"
              :class="{ border: light == color }"
              :style="{ background: color }"
              @click.stop="bgValue = color"></div>
          </template>
        </div>
        <div>
          <template v-if="isDark">
            <n-color-picker :value="dark" :on-update:value="handleBg" :modes="['hex']" :show-alpha="false" />
          </template>
          <template v-else>
            <n-color-picker :value="light" :on-update:value="handleBg" :modes="['hex']" :show-alpha="false" />
          </template>
        </div>
      </div>
    </n-popover>
  </div>
</template>
<style lang="scss">
.hover-set-child > div {
  transition: 0.4s;
}
.hover-set-child:hover > div {
  transform: scale(0.86);
  box-shadow: 0 0 8px 4px $theme;
}
.hover-set-child:not(:hover) > div {
  transform: scale(1);
}
</style>
