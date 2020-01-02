const env = process.env;
export const denEnv = env.NODE_ENV || 'development';

export const logStars = function(message) {
  console.log(message);
};

export default {
  mongodbUri: 'mongodb://localhost:27017/test',
  port: env.PORT || 8080,
  host: env.HOST || '0.0.0.0',
  get serverUrl() {
    return `http://${this.host}:${this.port}`;
  }
};




