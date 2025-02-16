// database user password: NlMKY0ldcIZm2jwB
const mongoose = require('mongoose');
require('dotenv').config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => console.log(err));
