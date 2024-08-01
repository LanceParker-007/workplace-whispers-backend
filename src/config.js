// config.js
const configArray = {
  development: {
    CORS_ORIGIN: process.env.DEV_CORS_ORIGIN,
    REDIRECT_URI: process.env.DEV_REDIRECT_URI,
  },
  production: {
    CORS_ORIGIN: process.env.PROD_CORS_ORIGIN,
    REDIRECT_URI: process.env.PROD_REDIRECT_URI,
  },
};

const currentEnv = process.env.NODE_ENV || "development";

const config = {
  ...configArray[currentEnv],

  PORT: process.env.PORT,

  MONGODB_URI: process.env.MONGODB_URI,
  DB_NAME: process.env.DB_NAME,

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};

export default config;
