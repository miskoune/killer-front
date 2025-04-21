const { VITE_API_URL, VITE_FRONT_URL, VITE_MERCURE_URL, PROD } = import.meta
  .env;

export const PROD_ENV = PROD;
export const API_URL = VITE_API_URL;
export const FRONT_URL = VITE_FRONT_URL;
export const MERCURE_URL = VITE_MERCURE_URL;
