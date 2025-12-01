const { getDailyVerse, getRandomVerse } = require('./services/verseService');

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
  if (method === 'GET' && url.startsWith('/api/health')) {
    return buildResponse(res, 200, { status: 'ok' });
  }

  if (method === 'GET' && url.startsWith('/api/verse/daily')) {
    const query = parseQuery(url);
    const verse = getDailyVerse(query.language);
    return buildResponse(res, 200, { verse });
  }

  if (method === 'GET' && url.startsWith('/api/verse/random')) {
    const query = parseQuery(url);
    const verse = getRandomVerse(query.language);
    return buildResponse(res, 200, { verse });
  }

  return buildResponse(res, 404, { error: 'Not Found' });
};

module.exports = handleRequest;
