/**
 * BiblePing Telegram Bot
 * ----------------------
 * This file is responsible ONLY for:
 * - Connecting to Telegram via Grammy
 * - Handling Telegram commands (/start, /verse, /app)
 * - Inline mode support
 *
 * It does NOT expose HTTP APIs.
 */

import "dotenv/config";
import { Bot } from "grammy";
import fetch from "node-fetch";

/* ============================================================================
 * 1. ENVIRONMENT VALIDATION
 * ============================================================================
 */

// Telegram Bot Token
const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error("❌ TELEGRAM_BOT_TOKEN is not defined in .env");
  process.exit(1);
}

console.log("✅ Telegram token loaded:", token.slice(0, 8) + "...");

/* ============================================================================
 * 2. BOT INITIALIZATION
 * ============================================================================
 */

const bot = new Bot(token);

// Global error handler for the bot
bot.catch((err) => {
  console.error("🤖 Telegram bot error:", err.error);
});

/* ============================================================================
 * 3. COMMAND HANDLERS
 * ============================================================================
 */

/**
 * /start
 * Welcome message
 */
bot.command("start", async (ctx) => {
  await ctx.reply(
    "👋 Welcome to BiblePing!\n\n" +
    "• Use /verse to get a Bible verse\n" +
    "• Use /app to open the Mini App"
  );
});

/**
 * /verse
 * Fetches a Bible verse from the public API and replies to the user
 */
bot.command("verse", async (ctx) => {
  try {
    const response = await fetch(
      "https://bibleping.netlify.app/api/verse?language=en"
    );

    const data = await response.json();
    const verse = data.verse ?? data;

    await ctx.reply(
      `📖 *${verse.reference}*\n\n${verse.text}`,
      { parse_mode: "Markdown" }
    );
  } catch (error) {
    console.error("❌ Error fetching verse:", error);
    await ctx.reply("⚠️ Sorry, I couldn't fetch a verse right now.");
  }
});

/**
 * /app
 * Opens the BiblePing web app (Telegram Mini App)
 */
bot.command("app", async (ctx) => {
  await ctx.reply("📲 Open BiblePing:", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Open BiblePing",
            web_app: {
              url: "https://bibleping.netlify.app",
            },
          },
        ],
      ],
    },
  });
});

/* ============================================================================
 * 4. INLINE MODE
 * ============================================================================
 *
 * Allows users to type:
 * @BiblePing something
 * and get inline results
 */
bot.on("inline_query", async (query) => {
  console.log("🔍 Inline query received:", query.query);

  const searchText = query.query.trim();

  // If empty query, return no results
  if (!searchText) {
    return bot.answerInlineQuery(query.id, [], { cache_time: 0 });
  }

  // Example inline result (placeholder)
  // TODO: Connect this to a real Bible API
  const results = [
    {
      type: "article",
      id: "verse-1",
      title: `Verse result for: ${searchText}`,
      description: "Example verse (replace with real API response)",
      input_message_content: {
        message_text: "John 3:16 — For God so loved the world...",
      },
    },
  ];

  await bot.answerInlineQuery(query.id, results, { cache_time: 0 });
});

/* ============================================================================
 * 5. START BOT
 * ============================================================================
 */

bot.start();
console.log("🚀 BiblePing Telegram bot is running...");
