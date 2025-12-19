
/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Build an HTTP response with JSON payload.
 * @param {http.ServerResponse} res - response object
 * @param {number} status - HTTP status code
 * @param {object} payload - JSON payload
 */
/*******  7021c03c-0c24-4b4c-b265-37e14a19abec  *******/
const buildResponse = (res, status, payload) => {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });

  res.end(JSON.stringify(payload));
};

module.exports = { buildResponse };
