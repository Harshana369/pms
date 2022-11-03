const mongoose = require('mongoose');

const DependencySchema = new mongoose.Schema({
  Dependency:String
});

module.exports = mongoose.model('DependencyList',DependencySchema);
