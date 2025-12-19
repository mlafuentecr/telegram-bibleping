// backend/src/controllers/image.controller.js
const { getRandomImageUrl } = require('../services/imageService');
const { buildResponse } = require('../utils/response');

const randomImage = (req, res) => {
  const imageUrl = getRandomImageUrl();
  buildResponse(res, 200, { imageUrl });
};

module.exports = { randomImage };
