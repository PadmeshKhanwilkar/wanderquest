//mongodb
require("./config/db");

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const UserRouter = require("./api/User");

app.use(express.json());

app.use("/user", UserRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
