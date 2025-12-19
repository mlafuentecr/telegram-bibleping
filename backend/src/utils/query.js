
/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Parse a query string from a URL.
 * @param {string} url - URL to parse query from
 * @returns {Object} - Object with query parameters
 * @example
 * const query = parseQuery('https://example.com?foo=bar&baz=qux');
 * console.log(query); // { foo: "bar", baz: "qux" }
 */
/*******  96f52148-9dea-4b40-96ce-b4e8189713a1  *******/
const parseQuery = (url) => {
  const query = {};
  const parts = url.split('?');

  if (parts.length > 1) {
    parts[1].split('&').forEach((pair) => {
      const [key, value] = pair.split('=');
      if (key) {
        query[decodeURIComponent(key)] = decodeURIComponent(value || '');
      }
    });
  }

  return query;
};

module.exports = { parseQuery };
