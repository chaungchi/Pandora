<script setup>
import { login } from "@/API/login";
import { goName } from "@/common";
import { ref } from "vue";
import { useUserStore } from "@/store/modules/user";
const userStore = useUserStore();
let loginForm = ref({
  admin: "admin",
  word: ""
});
const loginFormRef = ref(null);
const rules = {
  admin: [
    {
      required: true,
      message: "请输入账号"
    }
  ],
  word: [
    {
      required: true,
      message: "请输入密码"
    }
  ]
};
const fn_login = (e) => {
  e.preventDefault();
  loginFormRef.value?.validate(async (errors) => {
    if (!errors) {
      let prop = { name: loginForm.value.admin, pass: loginForm.value.word };
      login(prop).then((res) => {
        if (!res) return;
        let token = res.jwtoken;
        userStore.setUser(res);
        userStore.setToken(token);
        window.$message.success("登录成功！（登录状态持续7天）");
        goName("home");
      });
    } else {
      window.$message.error("请填写登录信息");
    }
  });
};
</script>
<template>
  <n-form class="w100% h100%" size="large" ref="loginFormRef" :model="loginForm" :rules="rules">
    <n-form-item path="admin" label="账号">
      <n-input v-model:value="loginForm.admin" @keydown.enter.prevent placeholder="请填写账号" clearable />
    </n-form-item>
    <n-form-item path="word" label="密码">
      <n-input
        v-model:value="loginForm.word"
        type="password"
        show-password-on="click"
        @keydown.enter.prevent
        placeholder="请填写密码"
        clearable></n-input>
    </n-form-item>
    <n-form-item>
      <div class="w100% ha flex flex-wrap justify-end">
        <n-button class="m-main mx0 mt0" type="primary" size="large" @click="fn_login" block>登录</n-button>
        <div
          class="color-themess i-eos-icons:rotating-gear fs-20"
          @click="(loginForm.admin = 'admin'), (loginForm.word = 'zhuyoukun')" />
      </div>
    </n-form-item>
  </n-form>
</template>
<style lang="scss"></style>
