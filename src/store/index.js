import { defineStore, createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";
const store = createPinia();
store.use(piniaPluginPersist);
export function setupStore(app) {
  const store = createPinia();
  store.use(piniaPluginPersist);
  app.use(store);
}
export const mainStore = defineStore("mainStore", {
  state: () => {
    return {};
  },
  actions: {
    setState(key, value) {
      this[key] = value;
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: import.meta.env.VITE_KEY,
        storage: localStorage
      }
    ]
  }
});

export { store };
