const { getDailyVerse } = require('../../backend/src/services/verseService');

exports.handler = async (event) => {
  try {
    const language = event.queryStringParameters?.language || 'en';
    const verse = await getDailyVerse(language);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ verse }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
