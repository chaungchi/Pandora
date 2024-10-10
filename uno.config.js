import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetTypography,
  transformerDirectives,
  transformerVariantGroup,
  presetIcons
} from "unocss";
export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      collections: {
        svgSpinners: () => import("@iconify-json/svg-spinners/icons.json").then((i) => i.default),
        tabler: () => import("@iconify-json/tabler").then((i) => i.default),
        eos: () => import("@iconify-json/eos-icons").then((i) => i.default)
      },
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle"
      }
    }),
    presetAttributify(),
    presetTypography()
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  variants: [
    (matcher) => {
      if (!matcher.startsWith("hover:")) {
        return matcher;
      }
      return {
        matcher: matcher.slice(6),
        selector: (s) => `${s}:hover`
      };
    }
  ],
  shortcuts: {
    "header-icon-fs": "text-22 sm:text-24 md:text-26 lg:text-28 xl:text-30",
    "header-fs": "text-14  sm:text-16 xl:text-18",
    center: "flex items-center justify-center",
    bet: "flex items-center justify-between",
    "p-main": "p6px xs:p-8px sm:p-12px md:p16px lg:p18px xl:p20px",
    "m-main": "p6px xs:p-8px sm:p-12px md:m16px lg:m18px xl:m20px",
    border: "border-1 border-solid border-theme",
    borders: "border-1 border-solid border-themes",
    borderss: "border-1 border-solid border-themess",
    cp: "cursor-pointer",
  },
  rules: [
    [/^fs-(\d+)$/, ([, num]) => ({ "font-size": `${num}px` })],
    [/^lh-(\d+)$/, ([, num]) => ({ "line-height": `${num}px` })],
    [/^gd-(\d+)$/, ([, num]) => ({ "transition-duration": `${num}ms` })],
    // 自定义规则用于表示最大宽度
    [/^max-xs:(.*)$/, ([, s]) => ({ ["@media (max-width: 375px)"]: { display: s } })],
    [/^max-sm:(.*)$/, ([, s]) => ({ ["@media (max-width: 768px)"]: { display: s } })],
    [/^max-md:(.*)$/, ([, s]) => ({ ["@media (max-width: 1024px)"]: { display: s } })],
    [/^max-lg:(.*)$/, ([, s]) => ({ ["@media (max-width: 1400px)"]: { display: s } })],
    [/^max-xl:(.*)$/, ([, s]) => ({ ["@media (max-width: 1600px)"]: { display: s } })]
  ],
  theme: {
    breakpoints: {
      xs: "375px",
      sm: "768px",
      md: "1024px",
      lg: "1400px",
      xl: "1600px"
    },
    colors: {
      theme: "var(--theme)",
      themes: "var(--themes)",
      themess: "var(--themess)",
      dark: "var(--dark)",
      light: "var(--light)",
      atcolor: "var(--atcolor)",
      hgcolor: "var(--hgcolor)",
      tm: "transparent"
    }
  }
});
