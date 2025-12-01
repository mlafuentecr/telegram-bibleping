const dotenv = require('dotenv');

dotenv.config();

const config = {
  botToken: process.env.BOT_TOKEN || '',
  port: process.env.PORT || 3000,
  defaultLanguage: process.env.DEFAULT_LANGUAGE || 'en',
  dailyPushHour: parseInt(process.env.DAILY_PUSH_HOUR || '8', 10),
  dataDir: process.env.DATA_DIR || './data'
};

module.exports = config;
