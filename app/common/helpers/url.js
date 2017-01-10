import Url from 'url';

export const createUrl = (endpoint, options) => {
  const url = Url.parse(endpoint, true);
  url.query = { ...url.query, ...options };
  return Url.format(url);
};
