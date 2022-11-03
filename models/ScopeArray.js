const mongoose = require('mongoose');

const ScopeSchema = new mongoose.Schema({
  Scope:String
});

module.exports = mongoose.model('ScopeList',ScopeSchema);
