// backend/src/controllers/verse.controller.js
const { getDailyVerse, getRandomVerse } = require('../services/verseService');
const { buildResponse } = require('../utils/response');
const { parseQuery } = require('../utils/query');

const dailyVerse = async (req, res, url) => {
  try {
    const { language } = parseQuery(url);
    const verse = await getDailyVerse(language);
    buildResponse(res, 200, { verse });
  } catch (err) {
    console.error('Error in dailyVerse:', err);
    buildResponse(res, 500, { error: 'Internal Server Error' });
  }
};

const randomVerse = async (req, res, url) => {
  try {
    const { language } = parseQuery(url);
    const verse = await getRandomVerse(language);
    buildResponse(res, 200, { verse });
  } catch (err) {
    console.error('Error in randomVerse:', err);
    buildResponse(res, 500, { error: 'Internal Server Error' });
  }
};

module.exports = {
  dailyVerse,
  randomVerse,
};
