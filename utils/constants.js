const MONGO_DATEBASE_LINK = 'mongodb://localhost:27017/moviesdb';

const ALLOWED_CORS_LINKS = [
  'http://a-trsv-movies.nomoredomains.work',
  'https://a-trsv-movies.nomoredomains.work',
  'https://api-a-trsv-movies.nomoredomains.work',
  'http://api-a-trsv-movies.nomoredomains.work',
  'http://84.201.176.153',
  'localhost:3000',
  'http://localhost:3000',
  'localhost:3001',
  'http://localhost:3001',
];

module.exports = {
  MONGO_DATEBASE_LINK,
  ALLOWED_CORS_LINKS,
};
