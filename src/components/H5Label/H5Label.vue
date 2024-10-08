<script setup>
import { computed } from "vue";
import { useAppStore } from "@/store/modules/app";
const appStore = useAppStore();
const label = computed(() => appStore.getBreakLabel);
</script>
<template>
    <div class="w100% h100% center">
        <div>{{ label }}</div>
        <!-- <div class="xs:hidden bg-red">width < 375</div>
		<div class="hidden xs:block bg-red">【xs】最小宽度375</div>
		<div class="hidden sm:block bg-orange">【sm】最小宽度768</div>
		<div class="hidden md:block bg-yellow">【md】最小宽度1024</div>
		<div class="hidden lg:block bg-green">【lg】最小宽度1400</div>
		<div class="hidden xl:block bg-cyan">【xl】最小宽度1600</div> -->
    </div>
</template>
<style lang="scss"></style>
