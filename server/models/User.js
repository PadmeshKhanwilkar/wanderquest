const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  dateOfBirth: Date,
  score: { type: Number, default: 0 },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
