const mongoose = require('mongoose');

const New_RATSchema = new mongoose.Schema({
  New_RAT:String
});

module.exports = mongoose.model('New_RATList',New_RATSchema);
