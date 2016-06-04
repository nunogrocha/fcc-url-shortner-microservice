var mongoose = require('mongoose');

var LinkSchema = new mongoose.Schema({
  link: {
    type: String
  },
  shortened: {
    type: String
  }
});

module.exports = mongoose.model('Link', LinkSchema);
