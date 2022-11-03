const mongoose = require('mongoose');

const Special_TagSchema = new mongoose.Schema({
  Special_Tag:String
});

module.exports = mongoose.model('SpecialTagsList',Special_TagSchema);
