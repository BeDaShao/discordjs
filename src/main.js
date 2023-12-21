// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv"; // 為了從.env檔案中取得環境變數，這個方法需要額外安裝dotenv套件
import vueInit from "@/core/vue"; // 預設導出(export default)就不用寫大括號，而且物件名稱可以自己取 -- vue 是為了使用pinia store
import { loadCommands, loadEvents } from "@/core/loader";
import { useAppStore } from "./store/app";

vueInit(); // vue.js 初始化 --為了執行 pinia
dotenv.config(); // 環境變數載入 --// 加一個檔案 ".env" (環境變數) 裡面宣告token
const client = new Client({ intents: [GatewayIntentBits.Guilds] }); // Create a new client instance -- 初始化機器人遙控器

// 把client更新到store中 -- 交給loader使用
const appStore = useAppStore();
appStore.client = client;

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.

// Log in to Discord with your client's token
client.login(process.env.TOKEN); //啟動機器人

loadCommands(); // 指令loader
loadEvents(); // event interact loader

/* 
加入監聽事件 -- 監聽指令輸入事件，類似啟動提示(once)--代表指監聽一次--監聽多次要用on
once:一次  on:多次
Events模組中有所有可監聽的事件 --discord.js提供
加入一個管理所有event的資料夾: events
內部為類似commands資料夾的結構-- 即每個事件一個資料夾，資料夾內有index.js --index.js表示其主要檔案

----轉移開始
*/
