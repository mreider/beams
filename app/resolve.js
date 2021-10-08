const mongoose = require('mongoose');
const resolveSchema = mongoose.Schema({
  payload: {
     type: String,
     require: true
   }
})

const Resolution = mongoose.model("resolution", resolveSchema);

module.exports = Resolution;