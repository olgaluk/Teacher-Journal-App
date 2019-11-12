const mongoose = require('mongoose');

const Teacher = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Teacher', Teacher);