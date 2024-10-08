<script setup>
const version = import.meta.env.VITE_VERSION;
const title = import.meta.env.VITE_APP_TITLE;
</script>
<template>
    <div class="w100% h100% bg-themess fs-12">{{ title }} {{ version }}</div>
</template>
<style lang="scss"></style>
