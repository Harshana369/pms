const mongoose = require('mongoose');

const ResponsibleSchema = new mongoose.Schema({
  Responsible:String
});

module.exports = mongoose.model('ResponsibleList',ResponsibleSchema);
