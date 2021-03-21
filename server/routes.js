const config = require("./config.js");
const axios = require("axios");

const appRouter = (app) => {
  // Google Places Search API (Place Details is also available for individual result)
  // We could imagine using different providers as well
  app.get("/doctors", async (req, res) => {
    let { lat, lng, radius } = req.query;

    if (!lat) return res.status(400).send("'lat' parameter is missing.");
    if (!lng) return res.status(400).send("'lng' parameter is missing.");
    if (!radius) return res.status(400).send("'radius' parameter is missing.");

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/search/json?location=${lat},${lng}&radius=${radius}&types=doctor&key=${config.googlePlacesApiKey}`
    );
    res.status(200).send(response.data);
  });
};

module.exports = appRouter;
