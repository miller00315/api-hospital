const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const Professionals = mongoose.model('professional');

passport.use(new LocalStrategy({
  usernameField: 'professional[email]',
  passwordField: 'professional[password]',
}, (email, password, done) => {
  Professionals.findOne({ email })
    .then((professional) => {
      if(!professional || !professional.validatePassword(password)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }
      return done(null, professional);
    }).catch(done);
}));