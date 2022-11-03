const mongoose = require('mongoose');

const Site_StatusSchema = new mongoose.Schema({
  Site_Status:String
});

module.exports = mongoose.model('Site_StatusList',Site_StatusSchema);
