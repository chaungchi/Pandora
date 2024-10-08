<template>
    <n-loading-bar-provider :to="loadingBarTargetRef" container-style="position: absolute;">
        <loading-bar-trigger />
    </n-loading-bar-provider>
</template>
<script setup>
import { defineComponent, h, ref } from "vue";
import { useLoadingBar } from "naive-ui";
const LoadingBarTrigger = defineComponent({
  setup() {
    const loadingBar = useLoadingBar();
    window.$loadingBar = loadingBar;
    return () => {
      return h(NSpace, null, {
        default: () => null
      });
    };
  }
});
const loadingBarTargetRef = ref(void 0);
</script>
<style lang="scss">
.n-loading-bar-container {
    width: 100%;
    height: a;
}
</style>
