import rateLimit from 'express-rate-limit';

/**
 * Rate limiter for authentication routes (register, login)
 * Limit: 5 requests per 15 minutes per IP
 */
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    success: false,
    error: 'Too Many Requests',
    message: 'Too many authentication attempts. Please try again later.',
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: 'Too Many Requests',
      message: 'Too many authentication attempts. Please try again in 15 minutes.',
    });
  },
});

/**
 * Rate limiter for health data sync endpoint
 * Limit: 100 requests per 15 minutes per IP
 */
export const syncRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too Many Requests',
    message: 'Too many sync requests. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: 'Too Many Requests',
      message: 'Too many sync requests. Please try again in 15 minutes.',
    });
  },
});

/**
 * Rate limiter for read operations (dashboard, workouts, trends)
 * Limit: 200 requests per 15 minutes per IP
 */
export const readRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per windowMs
  message: {
    success: false,
    error: 'Too Many Requests',
    message: 'Too many requests. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: 'Too Many Requests',
      message: 'Too many read requests. Please try again in 15 minutes.',
    });
  },
});

/**
 * General rate limiter for all other endpoints
 * Limit: 100 requests per 15 minutes per IP
 */
export const generalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too Many Requests',
    message: 'Too many requests. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
