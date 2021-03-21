const config = require("./config.js");
const axios = require("axios");
const crypto = require("crypto");

const delay = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

const generateGuid = () => crypto.randomBytes(16).toString("hex");

const appRouter = (app) => {
  // Google Places Search API (Place Details is also available for individual result)
  // We could imagine using different providers as well
  app.get("/doctors", async (req, res) => {
    const { lat, lng, radius } = req.query;

    if (!lat) return res.status(400).send("'lat' parameter is missing.");
    if (!lng) return res.status(400).send("'lng' parameter is missing.");
    if (!radius) return res.status(400).send("'radius' parameter is missing.");

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/search/json?location=${lat},${lng}&radius=${radius}&types=doctor&key=${config.googlePlacesApiKey}`
    );
    res.status(200).send(response.data);
  });

  app.post("/appointments", async (_req, res) => {
    // TODO: this could be implemented with a database
    await delay(1000);
    res.status(200).send({ id: generateGuid() });
  });

  app.post("/confirmations", async (req, res) => {
    const { appointmentId } = req.query;
    // TODO: this could integrate with an email system
    await delay(1000);
    res
      .status(200)
      .send("Confirmation email sent for appointment " + appointmentId);
  });
};

module.exports = appRouter;
