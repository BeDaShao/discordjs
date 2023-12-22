import { REST } from "discord.js";
import { Routes } from "discord.js";
import { Collection } from "discord.js"; // dicord.js提供的資料結構，由一堆map組成
import dotenv from "dotenv";
import fg from "fast-glob"; // 快速讀取檔案 --doc. -  https://www.npmjs.com/package/fast-glob -- 已包含在discord.js套件中
import { useAppStore } from "@/store/app";

dotenv.config();

// rest for rest api
// discord.js 提供的發送api方法

// 更新伺服器上的指令參照名稱 -- 聊天室上的指令名稱表
const updateSlashCommands = async (commands) => {
    // init rest object -- api處理的方法 -- 使用rest api 方法等同於傳送axios請求出去
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN); // api version: 可以在discord doc 上面查看當前可用的api版本
    /* # http請求
    1. full route: 完整的api路徑 -- 利用discord.js提供的routes方法 
    // -- 其中包含大部分api的路徑，但是仍要帶上參數，例如guild id等等
    2. options: 額外的選項，這邊帶上指令的資料
     */
    const result = await rest.put(
        Routes.applicationGuildCommands(
            // 1. application id, ,2. guild id --建議將guild id以參數帶入
            process.env.APPLICATION_ID, // application id -- 機器人id
            "1167406550990717020" //guild id --把"開發者模式"選項打開，在進入你的伺服器(必須是自己的或你有管理員身分)並對伺服器右鍵並點擊"複製伺服器 ID"
        ),
        {
            body: commands, // 3. command data (optional parameter -- depends on what api to use)
            // -- 利用檔案讀取方式，讀取commands資料夾底下的所有指令
        }
    );
    // console.log(commands);
    console.log(result);
    console.log("Updated slash commands!");
};

//自動更新指令的參照名稱，並把名稱和行動建成一組collection
export const loadCommands = async () => {
    const commands = [];
    const files = await fg("./src/commands/**/index.js"); // 得到所有指令檔案路徑
    const appStore = useAppStore();
    const actions = new Collection(); // --collection: dc.js提供的結構，剛好符合actions map 的使用需求

    // 第一個 ** 表示該資料夾底下所有東西
    // *.js表其底下所有js檔案 --目前只會用  到 index.js
    for (const file of files) {
        const cmd = await import(file); // cmd for command -- file 代表指令index.js所在路徑 ;動態import -- 寫法 import()
        commands.push(cmd.command); // 把指令描述上傳到dc上
        actions.set(cmd.command.name, cmd.action); // collection 的新增內容方法 set()-- set(key, value)
    }

    await updateSlashCommands(commands); // 更新伺服器上的指令參照名稱
    appStore.commandsActionMap = actions; // 更新commands action map

    console.log(appStore.commandsActionMap);
};

export const loadEvents = async () => {
    /*
    和上面loadCommands很像，我們要做:
    1.  我們要遍歷events資料夾底下的檔案
    2. 導入事件參數
     */
    const files = await fg("./src/events/**/index.js");

    // 取得client -- 之前已經把client從main.js更新到store中了 -- 執行事件時需用到client
    const appStore = useAppStore();
    const client = appStore.client;
    // 遍歷
    /* 
    按照原本監聽指令的方式下去替換參數 
    事件有分為 on , once兩種模式，所以用if else去判斷
    同時在event資料夾結構中，加入一個isOnce的變數區分
    */
    for (const file of files) {
        const eventFile = await import(file); //動態引入

        // 導入event的結構 -- 使用isOnce判斷事件類型
        if (eventFile.event.isOnce) {
            client.once(eventFile.event.name, eventFile.action);
        } else {
            client.on(eventFile.event.name, eventFile.action);
        }
        // !問題log: event吃不到contexts參數 (client名稱)--解決: eventFile.action 其物件本身就是一個function不用在加上()
        // ?問題: client 定義在main.js中，在loader當中並沒有定義 -- 解決: 使用store
        // 當client被宣告的時候，同時把client放到store中存放 -- 共用
    }
};
