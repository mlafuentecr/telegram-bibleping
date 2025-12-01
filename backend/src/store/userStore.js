const fs = require('fs');
const path = require('path');
const { dataDir, defaultLanguage, dailyPushHour } = require('../config');

const USERS_PATH = path.join(dataDir, 'users.json');

const ensureStore = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(USERS_PATH)) {
    fs.writeFileSync(USERS_PATH, JSON.stringify({ users: [] }, null, 2));
  }
};

const loadUsers = () => {
  ensureStore();
  const raw = fs.readFileSync(USERS_PATH, 'utf8');
  return JSON.parse(raw).users || [];
};

const saveUsers = (users) => {
  ensureStore();
  fs.writeFileSync(USERS_PATH, JSON.stringify({ users }, null, 2));
};

const getUser = (chatId) => {
  const users = loadUsers();
  return users.find((user) => user.chatId === chatId);
};

const upsertUser = (chatId, data) => {
  const users = loadUsers();
  const existingIndex = users.findIndex((user) => user.chatId === chatId);
  const base = {
    chatId,
    language: defaultLanguage,
    subscribed: true,
    sendHour: dailyPushHour,
    lastSentDate: null
  };
  if (existingIndex >= 0) {
    users[existingIndex] = { ...base, ...users[existingIndex], ...data };
  } else {
    users.push({ ...base, ...data });
  }
  saveUsers(users);
  return getUser(chatId);
};

const listSubscribed = () => loadUsers().filter((user) => user.subscribed);

module.exports = { getUser, upsertUser, listSubscribed };
