const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  link: String,
  linktext: String
}, {
  timestamps: true
});

const subSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }
})

const memberSchema = new mongoose.Schema({
  name: String,
  email: String,
  googleId: String,
  displayName: String,
  links: [linkSchema],
  subscriptions: [subSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Member', memberSchema);