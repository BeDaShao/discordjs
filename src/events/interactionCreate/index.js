import { Events } from "discord.js";
import { useAppStore } from "@/store/app";

export const event = {
    name: Events.InteractionCreate,
    isOnce: false,
};

// ? 問題: 如何看event會傳過來甚麼參數 -- 解決: 看discord.js的 Clinet物件/Events物件/...各種事件 底下會有標示
export const action = async (interaction) => {
    console.log(interaction.commandName);
    // 過濾其他指令 -- 斜線指令 和其他兩種指令 -- 此處我們只要斜線指令
    if (!interaction.isChatInputCommand()) return;
    // ...已確保是斜線指令
    const appStore = useAppStore(); // 為了取出指令名表

    console.log(appStore.commandsActionMap);

    const action = appStore.commandsActionMap.get(interaction.commandName); //從指令名對照查出行動(is a function)
    await action(interaction);
};
