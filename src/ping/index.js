import { SlashCommandBuilder } from "discord.js";

export const command = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!");

// ctx : context -- 機器人常用
export const action = async (ctx) => {
    await ctx.reply("Pong!");
};

/* export 導出資料提供外部使用
有很多種寫法，主要三種:
    1. export {}
    2. export default {}
    3. export const .... 
現在使用第三種寫法，較為主觀，就是把要提供外部使用的物件前方寫上export
而第一種則是裡面用json 包裝成1個data: {} 再把物件包進去;
第二種則是 物件分開命名，但一樣包在一個大括號裡面。
個人覺得第三種寫法比較直觀也較新，所以目前以學習第三種為主。

像上面這種寫法，就是把一個 SlashCommandBuilder 的物件 和一個 函式物件 這兩個export 出去
*/
