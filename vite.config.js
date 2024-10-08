import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";
import topLevelAwait from "vite-plugin-top-level-await";
import Icons from "unplugin-icons/vite";
import legacy from "@vitejs/plugin-legacy";
import UnoCSS from "unocss/vite";
import { presetUno, presetAttributify } from "unocss";
import eslint from "vite-plugin-eslint";

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
        "#": resolve(__dirname, "./src/components")
      }
    },
    esbuild: {
      jsxFactory: "h",
      jsxFragment: "Fragment",
      jsxInject: "import { h } from 'vue';"
    },
    plugins: [
      vue(),
      UnoCSS({
        presets: [presetAttributify(), presetUno()]
      }),
      Icons({
        compiler: "vue3", // 指定编译器为 Vue 3
        autoInstall: true // 自动安装缺失的图标集
      }),
      legacy({
        targets: ["chrome 52"]
      }),
      AutoImport({
        resolvers: [NaiveUiResolver()]
      }),
      Components({
        resolvers: [NaiveUiResolver()]
      }),
      topLevelAwait({
        promiseExportName: "__tla",
        promiseImportName: (i) => `__tla_${i}`
      }),
      eslint({
        exclude: ["node_modules", "dist"], // 排除不需要 lint 的目录
        fix: true // 保存时自动修复
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/style/variable.modules.scss" as *;'
        }
      }
    },
    server: {
      host: "localhost",
      port: 9696,
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      }
    },
    base: "./",
    build: {
      assetsDir: "./assets",
      chunkSizeWarningLimit: 1500,
      reportCompressedSize: false, // 禁用压缩大小报告
      minify: "terser",
      cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
      terserOptions: {
        compress: {
          warnings: false,
          drop_debugger: true, //打包时删除 debugger
          pure_funcs: ["console.log"] //打包时删除 console.log
        },
        output: {
          comments: true
        }
      },
      rollupOptions: {
        output: {
          /*  manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("vue") || id.includes("pinia") || id.includes("vue-router")) {
                return "vue"; // 将 Vue 相关的库打包到一个块中
              }
              if (id.includes("echarts")) {
                return "echarts"; // 将 echarts 相关的库打包到一个块中
              }
              return "vendor"; // 其他所有 node_modules 的库打包到一个 vendor 块中
            }
          } */
          manualChunks: {
            vue: ["vue", "vue-router", "pinia"],
            echarts: ["echarts"]
          }
        }
      },
      brotliSize: false
    }
  });
};
