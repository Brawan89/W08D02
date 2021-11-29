const mongoose = require("mongoose");

require("dotenv").config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopoLogy: true,
};

mongoose.connect(process.env.DB_URL, options).then(
  () => {
    console.log(`DB Ready To Use`);
  },
  (err) => {
    console.log(err);
  }
);
