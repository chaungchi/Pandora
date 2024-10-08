<script setup>
import { ref } from "vue";
import { goName } from "@/common";
import { useRoute } from "vue-router";
const activeName = ref(useRoute().name);
const list = [
  {
    label: "设备简要",
    name: "home"
  },
  {
    label: "设备详情",
    name: "details"
  },
  {
    label: "趋势显示",
    name: "tendency"
  }
];
const setRouter = (name) => {
  activeName.value = name;
  goName(name);
};
</script>
<template>
  <div class="w100% h100% bet text-30">
    <div
      v-for="item in list"
      :key="item.name"
      @click="setRouter(item.name)"
      class="flex-1 h100% center"
      :class="item.name === activeName ? 'bg-themes color-theme' : ''">
      {{ item.label }}
    </div>
  </div>
</template>
<style lang="scss"></style>
