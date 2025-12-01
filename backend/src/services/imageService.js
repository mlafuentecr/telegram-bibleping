// backend/src/services/imageService.js

// Usamos LoremFlickr: fotos reales por tema, sin API key
// Ejemplo: https://loremflickr.com/1200/800/nature

const THEMES = ['nature', 'landscape', 'forest', 'mountains', 'river', 'sky', 'sunrise', 'sunset'];

const getRandomImageUrl = () => {
  const width = 1200;
  const height = 800;

  const index = Math.floor(Math.random() * THEMES.length);
  const theme = THEMES[index];

  return `https://loremflickr.com/${width}/${height}/${encodeURIComponent(theme)}`;
};

module.exports = { getRandomImageUrl };
