import { defineStore } from "pinia";

// --ref: pinia doc.
// 東西清空，留下格式，state, getters and actions
//一個store的結構會很明確(state, getters and actions)
export const useAppStore = defineStore("counter", {
    state: () => ({
        client: null, //初始值為null，之後宣告後會更新
        commandsActionMap: null, // init store -- 之後loader那邊再把東西load進來
    }),
    getters: {},
    actions: {},
});

// Event loader creating -- use store to create.
