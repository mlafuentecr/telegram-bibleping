const { getVerseFromAPI } = require('./getVerseAPI');
const VERSES = require('../data/verses'); // 👈 ahora viene de /data

const normalizeLanguage = (language) => (language === 'en' ? 'en' : 'es');

const pickDailyIndex = () => {
  const today = new Date();
  return today.getDay() % VERSES.length;
};

const pickRandomIndex = () => {
  return Math.floor(Math.random() * VERSES.length);
};

// Versículo del día
const getDailyVerse = async (language = 'es') => {
  const lang = normalizeLanguage(language);
  const verseInfo = VERSES[pickDailyIndex()];

  if (lang === 'en') {
    const apiVerse = await getVerseFromAPI(verseInfo.refEn, 'en');
    if (apiVerse) return apiVerse;
    return { reference: verseInfo.enReference, text: verseInfo.enText };
  }

  return {
    reference: verseInfo.esReference,
    text: verseInfo.esText
  };
};

// Versículo aleatorio
const getRandomVerse = async (language = 'es') => {
  const lang = normalizeLanguage(language);
  const verseInfo = VERSES[pickRandomIndex()];

  if (lang === 'en') {
    const apiVerse = await getVerseFromAPI(verseInfo.refEn, 'en');
    if (apiVerse) return apiVerse;
    return { reference: verseInfo.enReference, text: verseInfo.enText };
  }

  return {
    reference: verseInfo.esReference,
    text: verseInfo.esText
  };
};

module.exports = {
  getDailyVerse,
  getRandomVerse
};
