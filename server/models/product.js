"use strict";

const
  mongoose = require('mongoose');

const schema = mongoose.Schema({
  name : {
    type: String,
    trim: true,
  },
  price : Number,
  available: Boolean,
  dateCreated: {
    type: Date,
    default: Date.now,
    get: date => date.toString()
  }
}, { versionKey: false });

module.exports = mongoose.model('Product', schema);