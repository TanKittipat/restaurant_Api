const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const restaurantRouter = require("./routers/restaurant.router");

// Use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use router
app.use("/api/vi/restaurants", restaurantRouter);

app.get("/", (req, res) => {
  res.send("<h1>Hello Restaurant API</h1>");
});
app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});
