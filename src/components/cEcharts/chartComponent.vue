<script setup>
import { onMounted, ref, watch, computed } from "vue";
import * as echarts from "echarts";
import { useAppStore } from "@/store/modules/app";
import { debounce } from "lodash";
const appStore = useAppStore();
const isDark = computed(() => appStore.getIsDark);
const ids = computed(() => appStore.getEchartsIDS);
let props = defineProps(["option", "id"]);
var options = ref(null);
let myChart = null;
let echflag = ref(true);
const init = () => {
  try {
    options.value.backgroundColor = "#00000000";
    myChart.setOption(options.value);
  } catch (error) {
    setTimeout(() => {
      options.value.backgroundColor = "#00000000";
      if (myChart) {
        myChart.setOption(options.value);
      }
    }, 3000);
  }
};
onMounted(() => {
  appStore.setEchartsIDS(props.id);
  try {
    var chartDom = document.getElementById(props.id);
    myChart = echarts.init(chartDom, isDark.value ? "dark" : null);
    options.value = props.option;
    init();
  } catch (error) {
    setTimeout(() => {
      var chartDom = document.getElementById(props.id);
      myChart = echarts.init(chartDom, isDark.value ? "dark" : null);
      options.value = props.option;
      init();
    }, 3000);
  }

  watch(
    () => props.option,
    (option) => {
      console.log("1111111111111");
      options.value = option;
      myChart.setOption({
        series: [
          {
            data: option.series[0].data
          }
        ]
      });
      // init();
    },
    { deep: true }
  );
  window.addEventListener(
    "resize",
    debounce(() => {
      let arr = ids.value;
      console.log("=========: ", arr);
      arr.map((v) => {
        let _ref = document.getElementById(v);
        let myEchars = _ref ? echarts.getInstanceByDom(_ref) : undefined;
        if (myEchars !== undefined) {
          myEchars.resize();
        }
      });
    }, 300)
  );
  watch(
    () => isDark.value,
    (t) => {
      try {
        echflag.value = false;
        setTimeout(() => {
          echflag.value = true;
          setTimeout(() => {
            var chartDom = document.getElementById(props.id);
            myChart = echarts.init(chartDom, t ? "dark" : null);
            init();
          }, 100);
        }, 100);
      } catch (error) {
        setTimeout(() => {
          echflag.value = false;
          setTimeout(() => {
            echflag.value = true;
            setTimeout(() => {
              var chartDom = document.getElementById(props.id);
              myChart = echarts.init(chartDom, t ? "dark" : null);
              init();
            }, 100);
          }, 100);
        }, 3000);
      }
    }
  );
});
</script>
<template>
  <div v-if="echflag" class="echarts" :id="props.id"></div>
</template>
<style lang="scss">
.echarts {
  width: 100%;
  height: 100%;
  overflow: visible !important;
  * {
    overflow: visible !important;
  }
}
</style>
