// backend/src/bot.js
import "dotenv/config";
import { Bot } from "grammy";
import fetch from "node-fetch";

// 1. Verificamos que el token exista
const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error("❌ TELEGRAM_BOT_TOKEN no está definido en .env");
  process.exit(1);
}

console.log("✅ Token cargado (primeros 8 chars):", token.slice(0, 8) + "...");

// 2. Creamos el bot
const bot = new Bot(token);

// 3. Manejo de errores global del bot
bot.catch((err) => {
  console.error("🤖 Bot error:", err.error);
});

// /start
bot.command("start", async (ctx) => {
  await ctx.reply(
    "👋 Welcome to BiblePing!\nUse /verse to get a Bible verse.\nUse /app to open the Mini App."
  );
});

// /verse
bot.command("verse", async (ctx) => {
  try {
    const res = await fetch(
      "https://bibleping.netlify.app/api/verse?language=en"
    );
    const data = await res.json();
    const verse = data.verse ?? data;

    await ctx.reply(`📖 *${verse.reference}*\n\n${verse.text}`, {
      parse_mode: "Markdown",
    });
  } catch (err) {
    console.error("Error fetching verse:", err);
    await ctx.reply("⚠️ Error fetching verse.");
  }
});

// /app
bot.command("app", async (ctx) => {
  await ctx.reply("📲 Open BiblePing:", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Open BiblePing",
            web_app: { url: "https://bibleping.netlify.app" },
          },
        ],
      ],
    },
  });
});

// 4. Arrancamos el bot
bot.start();
console.log("🚀 BiblePing bot is running...");
