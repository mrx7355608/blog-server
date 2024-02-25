import rateLimit from "express-rate-limit";

const loginRateLimiter = rateLimit({
    windowMs: 24 * 3600 * 1000, // 1 day
    limit: 3, // Only 3 requests in one day
    standardHeaders: true,
    legacyHeaders: false,
});

export default loginRateLimiter;
