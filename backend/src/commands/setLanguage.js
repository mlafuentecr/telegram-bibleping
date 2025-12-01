// backend/src/commands/setLanguage.js

const { setUserLanguage } = require('../store/userStore');

/**
 * Registra el comando /language
 * Uso:
 *   /language es
 *   /language en
 */
module.exports = function registerSetLanguageCommand(bot) {
  bot.command('language', async (ctx) => {
    const chatId = String(ctx.chat.id);
    const parts = ctx.message.text.split(/\s+/);
    const lang = (parts[1] || '').toLowerCase();

    if (!['es', 'en'].includes(lang)) {
      return ctx.reply('Usá: /language es o /language en');
    }

    setUserLanguage(chatId, lang);

    const text =
      lang === 'es'
        ? '✔️ Listo. Ahora recibirás versículos en *español*.'
        : '✔️ Done. You will now receive verses in *English*.';

    return ctx.reply(text, { parse_mode: 'Markdown' });
  });
};
