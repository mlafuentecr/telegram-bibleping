// backend/src/services/getVerseAPI.js

// En Node 18+ fetch ya existe global.
// Si al correr te dice que "fetch is not defined",
// descomenta las dos líneas de node-fetch y haz `npm install node-fetch`.

// const fetch = (...args) =>
//   import('node-fetch').then(({ default: fetch }) => fetch(...args));

/**
 * Trae un versículo desde bible-api.com
 * SOLO devuelve inglés (bible-api no tiene español).
 * @param {string} ref - referencia tipo "john 3:16"
 * @param {string} lang - 'en' o 'es'
 */
const getVerseFromAPI = async (ref = 'john 3:16', lang = 'en') => {
  try {
    // Si pasan 'es', por ahora también devolvemos inglés
    const url = `https://bible-api.com/${encodeURIComponent(ref)}`;

    const response = await fetch(url);
    if (!response.ok) {
      console.error('Bible API error:', response.status);
      return null;
    }

    const data = await response.json();

    return {
      reference: data.reference,
      text: data.text
    };
  } catch (err) {
    console.error('Error fetching verse:', err);
    return null;
  }
};

module.exports = { getVerseFromAPI };
