<script setup>
import { inject } from "vue";
const eq = inject("eq");
const dir = inject("dir");
</script>
<template>
  <div class="w100% ha p-main">
    <p v-for="i in 100" :key="i">{{ i }}</p>
  </div>
</template>
<style lang="scss"></style>
