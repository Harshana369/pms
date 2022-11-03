const mongoose = require('mongoose');

const siteEngineersNamesListSchema = new mongoose.Schema({
  Name:String
});

module.exports = mongoose.model('SiteEngineersNamesList',siteEngineersNamesListSchema);
