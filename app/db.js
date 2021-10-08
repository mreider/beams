const mongoose = require('mongoose');
mongoose.connect("mongodb:27017", { 
     useNewUrlParser: true,
     useUnifiedTopology: true
})
