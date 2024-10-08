import { createI18n } from "vue-i18n"; //引入vue-i18n组件
//假设你还有其他目录下的语言文件 它的路径是 src/views/home/locales/en-US.ts
//那么你就可以 使用 :lower:（小写） :upper:（大写） 来引入文件
// const viewModules = import.meta.globEager('../views/**/locales/[[:lower:]][[:lower:]]-[[:upper:]][[:upper:]].js')
const modules = import.meta.globEager("../language/*.json");
function getLangAll() {
  let message = {};
  getLangFiles(modules, message);
  return message;
}
function getLangFiles(mList, msg) {
  for (let path in mList) {
    if (mList[path].default) {
      let pathName = path.substr(path.lastIndexOf("/") + 1, 5).match(/^[^.]+/)[0];
      if (msg[pathName]) {
        msg[pathName] = {
          ...mList[pathName],
          ...mList[path].default
        };
      } else {
        msg[pathName] = mList[path].default;
      }
    }
  }
}
//注册i8n实例并引入语言文件
const i18n = createI18n({
  legacy: false,
  locale: "zh",
  messages: getLangAll()
});

export default i18n; //将i18n暴露出去在main.js中引入挂载
