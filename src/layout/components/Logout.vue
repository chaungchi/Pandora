<script setup>
import { goName } from "@/common";
import { useUserStore } from "@/store/modules/user";
const userStore = useUserStore();
const logout = () => {
  userStore.logout();
  goName("login");
};
</script>
<template>
  <div class="w100% h100% center">
    <n-popover placement="bottom" raw :show-arrow="false">
      <template #trigger>
        <div class="cp header-icon-fs hover:color-theme i-tabler:user" />
      </template>
      <n-card content-class="px20! py10!">
        <div class="w100% h100% fs-14">
          <div class="w100% center cp hover:color-theme" @click="logout">
            <div class="cp i-tabler:logout text-20 transition-duration-500" />
            <p class="ml10 transition-duration-500">离开</p>
          </div>
        </div>
      </n-card>
    </n-popover>
  </div>
</template>
<style lang="scss">
.hover-set-child:hover > div {
  transform: scale(0.86);
  box-shadow: 0 0 8px 4px $theme;
}
.hover-set-child:not(:hover) > div {
  transform: scale(1);
}
</style>
