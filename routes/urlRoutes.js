const express = require("express");
const {
  createShortUrl,
  redirectToOriginalUrl,
  getUrlStats,
} = require("../controllers/urlController");

const apiLimiter = require("../config/rateLimit");

const router = express.Router();

// Apply rate limiting to all routes
router.use(apiLimiter);

router.post("/shorten", createShortUrl);
router.get("/:shortId", redirectToOriginalUrl);
router.get("/stats/:shortId", getUrlStats);

module.exports = router;
