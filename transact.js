const mongoose = require('mongoose');
const transactSchema = mongoose.Schema({
  payload: {
     type: String,
     require: true
   }
})

const Transaction = mongoose.model("transaction", transactSchema);

module.exports = Transaction;