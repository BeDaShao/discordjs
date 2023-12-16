import {} from "pinia";

// --ref: pinia doc.
// 東西清空，留下格式，state, getters and actions
//一個store的結構會很明確(state, getters and actions)
export const useCounterStore = defineStore("counter", {
    state: () => ({}),
    getters: {},
    actions: {},
});
