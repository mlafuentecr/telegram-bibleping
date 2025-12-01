// backend/src/services/imageService.js

const THEMES = ['sunrise', 'nature', 'landscape', 'mountains', 'river', 'forest'];

const getRandomImageUrl = () => {
  const theme = THEMES[Math.floor(Math.random() * THEMES.length)];
  const ts = Date.now();  

  // loremflickr devuelve imagen random y el ts evita caché del navegador
  return `https://loremflickr.com/1200/800/${encodeURIComponent(theme)}?t=${ts}`;
};

module.exports = { getRandomImageUrl };
