/**
 * Application Configuration
 * -------------------------
 * Centralized configuration loader for the backend.
 * Values are loaded from environment variables using dotenv.
 *
 * This file is shared by:
 * - HTTP API
 * - Telegram bot
 * - Future background jobs (cron, queues, etc.)
 */

const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

/* ============================================================================
 * CONFIG OBJECT
 * ============================================================================
 */

const config = {
  /**
   * Telegram Bot Token
   * Used by the Telegram bot (grammy)
   */
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || "",

  /**
   * Server Port
   * Port where the HTTP API will listen
   */
  port: Number(process.env.PORT) || 4000,

  /**
   * Default language for verses
   * Supported values: 'en', 'es'
   */
  defaultLanguage: process.env.DEFAULT_LANGUAGE || "en",

  /**
   * Daily verse push hour (24h format)
   * Example: 8 = 8:00 AM
   */
  dailyPushHour: parseInt(process.env.DAILY_PUSH_HOUR || "8", 10),

  /**
   * Data directory
   * Used to store verses, cached data, or static files
   */
  dataDir: process.env.DATA_DIR || "./data",
};

module.exports = config;
