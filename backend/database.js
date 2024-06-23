const { mongoose } = require("mongoose");
require('dotenv').config();
const mongoURI = "mongodb+srv://SanjayAPI:g6WIo4g08DS0jDzd@sanjay.ecryqbg.mongodb.net/sanjay?retryWrites=true&w=majority";
const connectToMongo = () => {
  mongoose.connect(mongoURI)
    .then(() => {
      console.log("database connected")
    }).catch((err) => {
      console.log("something went wrong")
    });
}
module.exports = connectToMongo;