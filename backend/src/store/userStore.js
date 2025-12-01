const fs = require('fs');
const path = require('path');
const { dataDir, defaultLanguage, dailyPushHour } = require('../config');

const USERS_PATH = path.join(dataDir, 'users.json');

// Ensure data directory + file exist
const ensureStore = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(USERS_PATH)) {
    fs.writeFileSync(USERS_PATH, JSON.stringify({ users: [] }, null, 2));
  }
};

// Load all users
const loadUsers = () => {
  ensureStore();
  const raw = fs.readFileSync(USERS_PATH, 'utf8');
  return JSON.parse(raw).users || [];
};

// Save list of users
const saveUsers = (users) => {
  ensureStore();
  fs.writeFileSync(USERS_PATH, JSON.stringify({ users }, null, 2));
};

// Get a user
const getUser = (chatId) => {
  const users = loadUsers();
  return users.find((user) => user.chatId === chatId);
};

// Create or update user
const upsertUser = (chatId, data = {}) => {
  const users = loadUsers();
  const existingIndex = users.findIndex((user) => user.chatId === chatId);

  const base = {
    chatId,
    language: defaultLanguage,   // 👈 idioma por defecto
    subscribed: true,
    sendHour: dailyPushHour,
    lastSentDate: null,
  };

  if (existingIndex >= 0) {
    users[existingIndex] = { ...base, ...users[existingIndex], ...data };
  } else {
    users.push({ ...base, ...data });
  }

  saveUsers(users);

  return getUser(chatId);
};

// Get user language
const getUserLanguage = (chatId) => {
  const user = getUser(chatId);
  return user?.language || defaultLanguage;
};

// Set user language
const setUserLanguage = (chatId, language) => {
  upsertUser(chatId, { language });
};

// List subscribed users
const listSubscribed = () => loadUsers().filter((user) => user.subscribed);

module.exports = { 
  getUser, 
  upsertUser, 
  listSubscribed,
  getUserLanguage,   
  setUserLanguage    
};
