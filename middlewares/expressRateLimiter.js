const rateLimit = require('express-rate-limit');

const expressRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // max 100 requests per 15 min
});

module.exports = expressRateLimiter;
