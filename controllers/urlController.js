const Url = require("../models/Url");
const shortid = require("shortid");

// POST /shorten: Shorten a URL
exports.createShortUrl = async (req, res) => {
  const { originalUrl } = req.body;

  console.log("Request Body: ", req.body); // Debug: log incoming request body

  if (!originalUrl) {
    console.log("Error: No original URL provided"); // Debug: No original URL
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    console.log("Generating shortId for URL: ", originalUrl); // Debug: before generating shortId
    const shortId = shortid.generate();
    const newUrl = new Url({ originalUrl, shortId });

    console.log("Saving new URL to DB: ", newUrl); // Debug: before saving to DB
    await newUrl.save();

    console.log("URL saved successfully: ", newUrl); // Debug: after saving to DB
    res.status(201).json({ shortId, message: "Short URL created successfully" });
  } catch (err) {
    console.error("Error saving URL to DB: ", err); // Debug: on error
    res.status(500).json({ error: "Server error" });
  }
};


// GET /:shortId: Redirect to original URL
// GET /:shortId: Redirect to original URL
exports.redirectToOriginalUrl = async (req, res) => {
  const { shortId } = req.params;
  console.log(`Redirecting for shortId: ${shortId}`); // Debugging log

  try {
    const url = await Url.findOne({ shortId });
    if (!url) {
      console.log(`URL not found for shortId: ${shortId}`); // Debugging log
      return res.status(404).json({ error: "URL not found" });
    }

    // Increment click count
    url.clicks += 1;
    url.lastAccessed = new Date();
    await url.save();

    console.log(`Redirecting to: ${url.originalUrl}`); // Debugging log
    res.redirect(url.originalUrl);
  } catch (err) {
    console.error("Error during redirection: ", err); // Debugging log
    res.status(500).json({ error: "Server error" });
  }
};


// GET /stats/:shortId: Get URL statistics
exports.getUrlStats = async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await Url.findOne({ shortId });
    if (!url) return res.status(404).json({ error: "URL not found" });

    res.json({
      originalUrl: url.originalUrl,
      shortId: url.shortId,
      clicks: url.clicks,
      lastAccessed: url.lastAccessed,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
