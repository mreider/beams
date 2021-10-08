const mongoose = require('mongoose');
const calculateSchema = mongoose.Schema({
  payload: {
     type: String,
     require: true
   }
})

const Calculation = mongoose.model("calculation", calculateSchema);

module.exports = Calculation;