/* 存储常用数据 */
import { defineStore } from "pinia";
export const useDataStore = defineStore("data", {
  state: () => {
    return {
      test: "测试"
    };
  },
  getters: {
    getTest: (state) => state.test
  },
  actions: {
    setState(key, value) {
      this[key] = value;
    },
    setTest(value) {
      this.value = value;
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: `${import.meta.env.VITE_KEY}-data`,
        storage: localStorage
      }
    ]
  }
});
