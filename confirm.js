const mongoose = require('mongoose');
const confirmSchema = mongoose.Schema({
  payload: {
     type: String,
     require: true
   }
})

const Confirmation = mongoose.model("confirmation", confirmSchema);

module.exports = Confirmation;