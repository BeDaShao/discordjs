// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';    // 為了從.env檔案中取得環境變數，這個方法需要額外安裝dotenv套件

dotenv.config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
client.login(process.env.TOKEN);

// 加一個檔案 ".env" (環境變數) 裡面宣告token