const { getRandomImageUrl } = require('../../backend/src/services/imageService');

exports.handler = async () => {
  try {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ imageUrl: getRandomImageUrl() }),
    };
  } catch {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
