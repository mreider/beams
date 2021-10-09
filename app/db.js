const mongoose = require('mongoose');
mongoose.connect("mongodb://mongodb:27017", { 
     useNewUrlParser: true,
     useUnifiedTopology: true
})
