import { createApp } from "vue";
import { createPinia } from "pinia";
// 初始化
// createApp: 建立一個vue實例
// pinia 運行在vue底下的插件，所以要先建立vue再建立pinia

export default () => {
    console.log("vue init"); // ! - test msg
    const vue = createApp({});
    const pinia = createPinia();

    vue.use(pinia);
};
