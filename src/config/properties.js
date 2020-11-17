module.exports = {
  /** Server API configs. **/
  api: {
    host: process.env.API_HOST || "0.0.0.0",
    port: process.env.API_PORT || 3001,
    path: process.env.API_BASE_PATH || "/api",
    version: process.env.API_VERSION || "/v1",
    secret: process.env.AUTH_SECRET || "120213ASDdsa2"
  },

  /** Server MongoDB configs. **/
  mongo: {
    host: process.env.MONGO_HOST || "mongodb.dynamix.com.br",
    port: process.env.MONGO_PORT || 27017,
    db: process.env.MONGO_DB || "marvin_testes_trocatti",
    max: 100,
    min: 1
  }
};
