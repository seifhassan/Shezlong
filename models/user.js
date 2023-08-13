const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userId: {
      type: Number,
      required: true,
    },
    email:{
      type: String,
      required: true,
    },
    friends: [Number],
  },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
