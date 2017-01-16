
let config = {};

if (global.__CLIENT__ && window && window.__CONFIG__) {
  try {
    config = JSON.parse(unescape(window.__CONFIG__));
  } catch (e) {} // eslint-disable-line
}

export const PORT = config.PORT || process.env.PORT || 8080;
export const HOSTNAME = typeof window !== 'undefined' ? window.location.origin : (config.HOSTNAME || 'http://localhost:8080');
export const ADMIN_API_HOST = process.env.ADMIN_API_HOST || 'http://localhost:4001';
export const PUBLIC_API_HOST = process.env.PUBLIC_API_HOST || 'http://localhost:4000';
