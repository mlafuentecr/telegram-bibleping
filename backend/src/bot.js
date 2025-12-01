const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');
const { getDailyVerse, getRandomVerse } = require('./services/verseService');
const { getUser, upsertUser, listSubscribed } = require('./store/userStore');

const formatVerse = (verse) => `${verse.reference}\n${verse.text}`;

const buildLanguageKeyboard = () => ({
  inline_keyboard: [[
    { text: 'Español', callback_data: 'lang:es' },
    { text: 'English', callback_data: 'lang:en' }
  ]]
});

const buildMenuKeyboard = () => ({
  keyboard: [
    [{ text: '📖 Versículo de hoy' }, { text: '🎲 Versículo aleatorio' }],
    [{ text: '⚙️ Configuración' }]
  ],
  resize_keyboard: true,
  one_time_keyboard: false
});

const sendMenu = (bot, chatId) => {
  bot.sendMessage(
    chatId,
    'Selecciona una opción para continuar:',
    { reply_markup: buildMenuKeyboard() }
  );
};

const handleLanguageSelection = (bot, chatId, language) => {
  const user = upsertUser(chatId, { language });
  bot.sendMessage(chatId, `Idioma actualizado a ${language === 'es' ? 'Español' : 'English'}.`);
  sendMenu(bot, chatId);
  return user;
};

const sendDailyVerse = (bot, chatId) => {
  const user = getUser(chatId) || {};
  const verse = getDailyVerse(user.language);
  bot.sendMessage(chatId, `Versículo del día (idioma: ${user.language || 'en'}):\n${formatVerse(verse)}`);
};

const sendRandomVerse = (bot, chatId) => {
  const user = getUser(chatId) || {};
  const verse = getRandomVerse(user.language);
  bot.sendMessage(chatId, `Versículo aleatorio (idioma: ${user.language || 'en'}):\n${formatVerse(verse)}`);
};

const handleProfile = (bot, chatId) => {
  const user = getUser(chatId);
  if (!user) {
    bot.sendMessage(chatId, 'No tienes un perfil creado aún. Usa /start para configurar.');
    return;
  }
  bot.sendMessage(
    chatId,
    `Tu configuración:\nIdioma: ${user.language}\nSuscripción diaria: ${user.subscribed ? 'Activa' : 'Inactiva'}\nHora de envío: ${user.sendHour}:00`,
    {
      reply_markup: {
        inline_keyboard: [[{ text: 'Cambiar idioma', callback_data: 'config:lang' }], [{ text: user.subscribed ? 'Desactivar suscripción' : 'Activar suscripción', callback_data: user.subscribed ? 'config:unsubscribe' : 'config:subscribe' }]]
      }
    }
  );
};

const scheduleDailyPush = (bot) => {
  const oneHour = 60 * 60 * 1000;
  setInterval(() => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const hour = now.getHours();
    const users = listSubscribed();
    users.forEach((user) => {
      if (user.sendHour === hour && user.lastSentDate !== today) {
        const verse = getDailyVerse(user.language);
        bot.sendMessage(user.chatId, `Versículo diario automático:\n${formatVerse(verse)}`);
        upsertUser(user.chatId, { lastSentDate: today });
      }
    });
  }, oneHour);
};

const startBot = () => {
  if (!config.botToken) {
    console.warn('BOT_TOKEN no configurado. El bot no se iniciará.');
    return null;
  }

  const bot = new TelegramBot(config.botToken, { polling: true });
  bot.setMyCommands([
    { command: '/start', description: 'Crear perfil y seleccionar idioma' },
    { command: '/menu', description: 'Mostrar menú principal' },
    { command: '/daily', description: 'Recibir el versículo del día' },
    { command: '/random', description: 'Recibir un versículo aleatorio' },
    { command: '/config', description: 'Ver o actualizar tu perfil' }
  ]);

  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    upsertUser(chatId, { username: msg.from?.username });
    bot.sendMessage(
      chatId,
      '¡Bienvenido a BiblePing! Selecciona tu idioma preferido.',
      { reply_markup: buildLanguageKeyboard() }
    );
  });

  bot.onText(/\/menu/, (msg) => sendMenu(bot, msg.chat.id));
  bot.onText(/\/daily/, (msg) => sendDailyVerse(bot, msg.chat.id));
  bot.onText(/\/random/, (msg) => sendRandomVerse(bot, msg.chat.id));
  bot.onText(/\/config/, (msg) => handleProfile(bot, msg.chat.id));

  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text || '';
    if (text === '📖 Versículo de hoy') {
      sendDailyVerse(bot, chatId);
    } else if (text === '🎲 Versículo aleatorio') {
      sendRandomVerse(bot, chatId);
    } else if (text === '⚙️ Configuración') {
      handleProfile(bot, chatId);
    }
  });

  bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    if (query.data.startsWith('lang:')) {
      const language = query.data.split(':')[1];
      handleLanguageSelection(bot, chatId, language);
      bot.answerCallbackQuery(query.id, { text: 'Idioma actualizado' });
    }
    if (query.data === 'config:lang') {
      bot.sendMessage(chatId, 'Elige tu idioma:', { reply_markup: buildLanguageKeyboard() });
      bot.answerCallbackQuery(query.id);
    }
    if (query.data === 'config:subscribe') {
      upsertUser(chatId, { subscribed: true });
      bot.sendMessage(chatId, 'Suscripción diaria activada.');
      bot.answerCallbackQuery(query.id);
    }
    if (query.data === 'config:unsubscribe') {
      upsertUser(chatId, { subscribed: false });
      bot.sendMessage(chatId, 'Suscripción diaria desactivada.');
      bot.answerCallbackQuery(query.id);
    }
  });

  scheduleDailyPush(bot);
  console.log('Bot iniciado y escuchando comandos.');
  return bot;
};

module.exports = startBot;
