const mongoose = require("mongoose");

mongoose.connect(`${process.env.MONGO_URI}/outspot_db`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
