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

// Get all restaurant
exports.getAll = async (req, res) => {
  await Restaurant.findAll()
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
};

// Get by ID restaurant
exports.getById = async (req, res) => {
  const id = req.params.id;
  await Restaurant.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "No found Restaurant with ID : " + id,
        });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error occurred while creating the restaurant!",
      });
    });
};

// Update restaurant
// update จะ return จำนวนแถวที่แก้ไข
exports.update = async (req, res) => {
  const id = req.params.id;
  await Restaurant.update(req.body, { where: { id: id } }).then((num) => {
    if (num == 1) {
      res.send({ message: "Restaurant was updated successfully!" });
    } else {
      res.send({
        message:
          "Can't update restaurant with ID : " +
          id +
          ". Maybe restaurant wasn't found or req.body is empty!",
      });
    }
  });
};

// Delete restaurant
exports.delete = async (req, res) => {
  const id = req.params.id;
  await Restaurant.destroy({ where: { id: id } }).then((num) => {
    if (num == 1) {
      res.send({ message: "Restaurant was deleted successfully!" });
    } else {
      res.send({ message: "Can't delete restaurant ID : " + id + "." });
    }
  });
};
