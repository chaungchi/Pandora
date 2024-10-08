<script setup>
import { computed, ref, watch, onMounted } from "vue";
import { Icon } from "@iconify/vue";
const props = defineProps(["icon", "color", "size", "hoverColor", "auto"]);
const iconRef = ref();
const flag = ref(true);
const getIconifyStyle = ref({});
onMounted(() => {
  watch(
    () => [props.size, props.color, props.hoverColor, props.auto],
    ([size, color, hoverColor, auto]) => {
      let sizes = null;
      if (auto) {
        let h = iconRef.value.offsetHeight;
        sizes = `${h}px`;
      } else {
        sizes = typeof size == "Number" ? `${size}px` : size;
      }
      getIconifyStyle.value = {
        fontSize: sizes,
        color: color ? color : "inherit"
      };

      flag.value = false;
      setTimeout(() => {
        flag.value = true;
      }, 100);
    },
    { immediate: true }
  );
});
</script>
<template>
  <div class="wa h100% center duration-300" :class="hoverColor ? `hover:color-${hoverColor}` : ''" ref="iconRef">
    <template v-if="flag">
      <Icon :icon="icon" :style="getIconifyStyle" />
    </template>
  </div>
</template>
<style lang="scss"></style>
