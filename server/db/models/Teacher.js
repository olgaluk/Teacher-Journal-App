const mongoose = require('mongoose');

const Teacher = new mongoose.Schema({
  id: {
    type: String,
    required: false,
  },
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