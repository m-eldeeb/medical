const mongoose = require("mongoose");

const connect = () => {
  return mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("connected to DB....");
    })
    .catch((err) => {
      console.log("failed to connect.....", err);
    });
};

module.exports = connect;
