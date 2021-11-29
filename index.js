const express = require("express");
require("dotenv").config();
require("./db")

const app = express();
app.use(express.json());

const roleRouter = require("./Routers/Routes/role");
app.use(roleRouter)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`SERVER ON ${PORT}`);
});
