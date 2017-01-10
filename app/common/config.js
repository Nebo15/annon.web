
let config = {};

if (global.__CLIENT__ && window && window.__CONFIG__) {
  try {
    config = JSON.parse(unescape(window.__CONFIG__));
  } catch (e) {} // eslint-disable-line
}

export const PORT = config.PORT || process.env.PORT || 8080;
export const HOSTNAME = typeof window !== 'undefined' ? window.location.origin : (config.HOSTNAME || 'http://localhost:8080');
export const API_HOST = config.API_HOST || process.env.API_HOST || 'http://gateway.api:8181';
