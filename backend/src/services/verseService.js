const { getVerseFromAPI } = require('./getVerseAPI');
const VERSES = require('../data/verses');

const normalizeLanguage = (language) => (language === 'en' ? 'en' : 'es');

const pickDailyIndex = () => {
  const today = new Date().toISOString().slice(0, 10);
  const hash = [...today].reduce((sum, c) => sum + c.charCodeAt(0), 0);
  return hash % VERSES.length;
};

let lastRandomIndex = null;


const pickRandomIndex = () => {
    console.log('>>> pickRandomIndex CALLED');
  if (VERSES.length <= 1) return 0;

  let index;
  do {
    index = Math.floor(Math.random() * VERSES.length);
  } while (index === lastRandomIndex);

  lastRandomIndex = index;
  console.log('>>> random index:', index);
  return index;
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

    console.log('>>> getRandomVerse CALLED');
  const lang = normalizeLanguage(language);
  const verseInfo = VERSES[pickRandomIndex()];
 console.log('>>> verse picked:', verseInfo);
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
