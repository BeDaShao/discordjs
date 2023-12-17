/*  #一般的做法
const updateSlashCommands = () => {

// 註冊斜線指令  使用http請求 --根據discord api
// 使用axios 框架發送http request -- axios 是ajax方法中的一個框架

axios({
    method: "PUT",
    url: "",
    header: "",
    date: {},
});
};
-- END 
*/

import { REST } from "discord.js";
import { Routes } from "discord.js";
import dotenv from "dotenv";
import fg from "fast-glob"; // 快速讀取檔案 --doc. -  https://www.npmjs.com/package/fast-glob -- 已包含在discord.js套件中

dotenv.config();

// rest for rest api
// discord.js 提供的發送api方法

const updateSlashCommands = async (commands) => {
    // init rest object -- api處理的方法 -- 使用rest api 方法等同於傳送axios請求出去
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN); // api version: 可以在discord doc 上面查看當前可用的api版本
    /* # http請求
    1. full route: 完整的api路徑 -- 利用discord.js提供的routes方法 
    // -- 其中包含大部分api的路徑，但是仍要帶上參數，例如guild id等等
    2. options: 額外的選項，這邊帶上指令的資料
     */
    await rest.put(
        Routes.applicationGuildCommands(
            // 1. application id, ,2. guild id --建議將guild id以參數帶入
            process.env.APPLICATION_ID, // application id -- 機器人id
            "1167406550990717020", //guild id --把"開發者模式"選項打開，在進入你的伺服器(必須是自己的或你有管理員身分)並對伺服器右鍵並點擊"複製伺服器 ID"
            {
                body: commands, // 3. command data (which is option parameter -- depends on what api to use)
                // -- 利用檔案讀取方式，讀取commands資料夾底下的所有指令
            }
        )
    );
    console.log("Updated slash commands!");
};

export const loadCommands = async () => {
    const commands = [];

    const files = await fg("./src/commands/**/index.js");
    console.log(files); //檢查路徑

    // 第一個 ** 表示該資料夾底下所有東西
    // *.js表其底下所有js檔案 --目前只會用到 index.js
    for (const file of files) {
        //動態import -- 寫法 import()
        const cmd = await import(file); // cmd for command -- file 代表指令index.js所在路徑
        commands.push(cmd.command);
    }

    await updateSlashCommands(commands);
};
