import { defineStore } from "pinia";
import { setCookie, clearCookie, goName } from "@/common";
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      token: null,
      user: null
    };
  },
  getters: {
    getUser() {
      return this.user;
    }
  },
  actions: {
    setState(key, value) {
      this[key] = value;
    },
    setToken(token) {
      this.token = token;
      setCookie("token", token);
    },
    setUser(user) {
      this.user = user;
    },
    logout() {
      this.token = null;
      localStorage.clear();
      clearCookie("token");
      goName("login");
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: `${import.meta.env.VITE_KEY}-user`,
        storage: localStorage
      }
    ]
  }
});
