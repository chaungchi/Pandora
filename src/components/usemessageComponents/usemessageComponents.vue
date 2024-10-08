<script>
import { useMessage } from "naive-ui";
import { defineComponent } from "vue";

// content
export default defineComponent({
  setup() {
    window.$message = useMessage();
  }
});
</script>

<template>
    <div id=""></div>
</template>
<style lang="scss"></style>
