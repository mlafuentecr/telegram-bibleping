// backend/src/app.js
const router = require('./router');

const handleRequest = (req, res) => {
  router(req, res);
};

module.exports = handleRequest;
