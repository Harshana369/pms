const mongoose = require('mongoose');

const Sub_ContractorSchema = new mongoose.Schema({
  Sub_Contractor:String
});

module.exports = mongoose.model('Sub_ContractorList',Sub_ContractorSchema);
