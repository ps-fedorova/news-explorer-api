const {
  JWT_SECRET = 'JWT_SECRET',
  PORT = 3000,
  MONGO = 'mongodb://localhost:27017/diplomadb',
} = process.env;

module.exports = {
  JWT_SECRET, PORT, MONGO,
};
