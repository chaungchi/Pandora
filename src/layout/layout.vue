<script setup>
import { ref, onMounted, onUnmounted, provide, computed } from "vue";
import Header from "./components/Header.vue";
import Container from "./components/Container.vue";
import Footer from "./components/Footer.vue";
import { useAppStore } from "@/store/modules/app";
import useDraw from "@/utils/useDraw";

const appStore = useAppStore();
const eq = computed(() => appStore.getEquipment);
const dir = computed(() => appStore.getDirection);
const navTH = computed(() => appStore.getNavTopHeight);
const navBH = computed(() => appStore.getNavBottomHeight);
provide("eq", eq);
provide("dir", dir);
const sectionRef = ref(null);
const isToolbarVisible = ref(true); // 控制工具栏是否显示
let lastScrollY = ref(0); // 上一次的滚动位置

// 判断系统是否为暗色模式
if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  appStore.setIsDark(true);
} else {
  appStore.setIsDark(false);
}

// 监听暗色模式变化
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
  if (event.matches) {
    appStore.setIsDark(true);
  } else {
    appStore.setIsDark(false);
  }
});

/* 适配处理 start *********************************************************** */
const { windowDraw, unWindowDraw, resize } = useDraw();
onMounted(() => {
  resize();
  windowDraw();
});
onUnmounted(() => {
  unWindowDraw();
});
/* 适配处理 end *********************************************************** */
// 监听页面滚动
const handleScroll = (scroll) => {
  const currentScrollY = scroll.target.scrollTop;
  if (currentScrollY > lastScrollY.value) {
    // 向下滚动，隐藏工具栏
    isToolbarVisible.value = false;
  } else {
    // 向上滚动，显示工具栏
    isToolbarVisible.value = true;
  }
  lastScrollY.value = currentScrollY; // 更新上次的滚动位置
};
</script>

<template>
  <div class="w100vw h100vh fs-16 sm:text-18">
    <!-- 工具栏 -->
    <transition
      :duration="{ enter: 5000, leave: 10000 }"
      name="fade"
      appear
      appear-active-class="animate__animated animate__fadeInDown"
      enter-active-class="animate__animated animate__fadeInDown"
      leave-active-class="animate__animated animate__slideOutUp"
      leave-to-class="animate__slideOutUp">
      <header class="fixed top-0 left-0 z-999 right-0 bg-themess header-fs" v-if="isToolbarVisible">
        <Header />
      </header>
    </transition>
    <!-- 内容区 -->
    <section class="w100% h100%">
      <n-scrollbar style="max-height: 100%" trigger="none" @scroll="handleScroll">
        <div class="w100% h$hh"></div>
        <Container />
        <n-back-top :right="'40'" :bottom="'60'" :visibility-height="600">
          <div class="i-tabler:arrow-bar-to-up fs-28" />
        </n-back-top>
      </n-scrollbar>
    </section>
  </div>
</template>
