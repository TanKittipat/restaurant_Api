const Restaurant = require("../models/restaurant.model");

// Create and Save a new restaurant
exports.create = async (req, res) => {
  const { name, type, imgUrl } = req.body;
  // Validate data
  if (!name || !type || !imgUrl) {
    res.status(400).send({
      message: "Name, Type or ImageUrl can't be empty!",
    });
  }
  await Restaurant.findOne({ where: { name: name } }).then((restaurant) => {
    if (restaurant) {
      res.status(400).send({
        message: "Restaurant already exists!",
      });
      return;
    }
    // Create a new Restaurant
    const newRestaurant = {
      name: name,
      type: type,
      imgUrl: imgUrl,
    };
    Restaurant.create(newRestaurant)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message ||
            "Something error occurred while creating the restaurant!",
        });
      });
  });
};
