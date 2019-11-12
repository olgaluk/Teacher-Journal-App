const mongoose = require('mongoose');

const Student = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: false,
    max: 25,
  },
  address: {
    type: String,
    required: false,
  },
  academicPerformance: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model('Student', Student);