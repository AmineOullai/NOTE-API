const mongoose = require("mongoose");

module.exports = {
  connect: () => {
    mongoose
      .connect(process.env.DB_HOST)
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => console.log(err));
  },
};
