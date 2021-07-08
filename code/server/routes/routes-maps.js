require("dotenv").config();

const REACT_APP_GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

module.exports = (app) => {
  app.get("/get-maps-api", function (req, res) {
    res.set("Content-Type", "application/json");
    res.send(`{"mapsApiKey":"${REACT_APP_GOOGLE_MAPS_API_KEY}"}`);
  });
};
