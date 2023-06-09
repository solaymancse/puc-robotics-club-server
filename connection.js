const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@puc-robotics.vsdnbwb.mongodb.net/puc-robotics-club?retryWrites=true&w=majority`,
  () => {
    console.log("Connected to MongoDB.");
  }
);
