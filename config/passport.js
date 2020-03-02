const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Member = require('../models/member');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    // a user has logged in with OAuth..
    Member.findOne({googleId: profile.id}, function(err, member) {
      if (err) return cb(err);
      if (member) {
        // returning user
        return cb(null, member);
      } else {
        // we have a new student via OAuth!
        const newMember = new Member({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        });
        newMember.save(function(err) {
          if (err) return cb(err);
          return cb(null, newMember);
        });
      }
    });
  }
));

passport.serializeUser(function(member, done) {
  done(null, member.id);
});

passport.deserializeUser(function(id, done) {
  Member.findById(id, function(err, member) {
    done(err, member);
  });
});