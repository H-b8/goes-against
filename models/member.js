const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  link: String,
  linktext: String
}, {
  timestamps: true
});

const subSchema = new mongoose.Schema({
    subEmail: {
        type: String,
        required: true
    }
})

const memberSchema = new mongoose.Schema({
  name: String,
  email: String,
  googleId: String,
  displayName: {
    type: String,
    default: 'USERNAME'
  },
  links: [linkSchema],
  subscriptions: [subSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Member', memberSchema);