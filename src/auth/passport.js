const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const Profesionals = mongoose.model('profissional');

passport.use(new LocalStrategy({
  usernameField: 'profissional[email]',
  passwordField: 'profissional[password]',
}, (email, password, done) => {
  Profesionals.findOne({ email })
    .then((profissional) => {
      if(!profissional || !profissional.validatePassword(password)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }
      return done(null, profissional);
    }).catch(done);
}));