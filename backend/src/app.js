// backend/src/app.js
const { getDailyVerse, getRandomVerse } = require('./services/verseService');
const { getRandomImageUrl } = require('./services/imageService'); // 👈 nuevo

const buildResponse = (res, status, payload) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
};

const parseQuery = (url) => {
  const query = {};
  const parts = url.split('?');
  if (parts.length > 1) {
    const queryString = parts[1];
    queryString.split('&').forEach((pair) => {
      const [key, value] = pair.split('=');
      if (key) {
        query[decodeURIComponent(key)] = decodeURIComponent(value || '');
      }
    });
  }
  return query;
};

const handleRequest = (req, res) => {
  const { method, url } = req;

  // Health check
  if (method === 'GET' && url.startsWith('/api/health')) {
    return buildResponse(res, 200, { status: 'ok' });
  }

  // Versículo diario (con idioma ?language=es|en)
  if (method === 'GET' && url.startsWith('/api/verse/daily')) {
    const query = parseQuery(url);
    const language = query.language;

    return getDailyVerse(language)
      .then((verse) => buildResponse(res, 200, { verse }))
      .catch((err) => {
        console.error('Error in /api/verse/daily:', err);
        buildResponse(res, 500, { error: 'Internal Server Error' });
      });
  }

  // Versículo random (con idioma ?language=es|en)
  if (method === 'GET' && url.startsWith('/api/verse/random')) {
    const query = parseQuery(url);
    const language = query.language;

    return getRandomVerse(language)
      .then((verse) => buildResponse(res, 200, { verse }))
      .catch((err) => {
        console.error('Error in /api/verse/random:', err);
        buildResponse(res, 500, { error: 'Internal Server Error' });
      });
  }

  // 🔥 Imagen random de naturaleza / medio ambiente
  if (method === 'GET' && url.startsWith('/api/image/random')) {
    const imageUrl = getRandomImageUrl();
    return buildResponse(res, 200, { imageUrl });
  }

  // 404 por defecto
  return buildResponse(res, 404, { error: 'Not Found' });
};

module.exports = handleRequest;
