<script setup>
import SetIsDark from "#/SetIsDark";
import { useUserStore } from "@/store/modules/user";
const userStore = useUserStore();
const logout = () => {
  userStore.logout();
};
</script>
<template>
  <n-popover trigger="click">
    <template #trigger>
      <n-button class="w100% h100%" block>
        <div class="i-tabler:menu-2 fs-60"></div>
      </n-button>
    </template>
    <div class="w120px ha p-main py0">
      <div class="wa bet m-main mx0 mt0">
        更改配色
        <div>
          <SetIsDark :fs="20" />
        </div>
      </div>
      <div class="wa bet">
        退出账号
        <div class="fs-20 i-tabler:logout" @click="logout"></div>
      </div>
    </div>
  </n-popover>
</template>
<style lang="scss"></style>
