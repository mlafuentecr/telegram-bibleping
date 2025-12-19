// backend/src/controllers/health.controller.js
const { buildResponse } = require('../utils/response');

const healthCheck = (req, res) => {
  buildResponse(res, 200, { status: 'ok' });
};

module.exports = { healthCheck };
