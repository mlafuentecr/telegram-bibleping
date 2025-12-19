// backend/src/router.js
const { healthCheck } = require('./controllers/health.controller');
const { dailyVerse, randomVerse } = require('./controllers/verse.controller');
const { randomImage } = require('./controllers/image.controller');
const { buildResponse } = require('./utils/response');

const router = (req, res) => {
  const { method, url } = req;

  if (method === 'GET' && url.startsWith('/api/health')) {
    return healthCheck(req, res);
  }

  if (method === 'GET' && url.startsWith('/api/verse/daily')) {
    return dailyVerse(req, res, url);
  }

  if (method === 'GET' && url.startsWith('/api/verse/random')) {
    return randomVerse(req, res, url);
  }

  if (method === 'GET' && url.startsWith('/api/image/random')) {
    return randomImage(req, res);
  }

  return buildResponse(res, 404, { error: 'Not Found' });
};

module.exports = router;
