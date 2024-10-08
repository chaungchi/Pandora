<script setup>
import { inject } from "vue";
const eq = inject("eq");
const dir = inject("dir");
</script>
<template>
  <div class="w100% ha p-main">
    【即将开始。。。】
    <p v-for="i in 100" :key="i">{{ i }}</p>
    【永无止境。。。】
  </div>
</template>
<style lang="scss"></style>
