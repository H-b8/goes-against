var mongoose = require('mongoose');

// The factSchema is used to embedded docs in as student doc.
// There is no model and no 'facts' collection
var linkSchema = new mongoose.Schema({
  link: String,
  linktext: String
}, {
  timestamps: true
});

var memberSchema = new mongoose.Schema({
  name: String,
  email: String,
  displayName: String,
  links: [linkSchema],
  googleId: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Member', memberSchema);