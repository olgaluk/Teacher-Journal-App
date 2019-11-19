const mongoose = require('mongoose');

const Subject = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  teachersID: {
    type: Array,
    required: true,
  },
  cabinet: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('Subject', Subject);