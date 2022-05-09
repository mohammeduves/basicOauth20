const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID = "286765776626-04lpmfliavp0r1v3mc158tra439ot688.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET="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"

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
    // callbackURL: "http://localhost:5000/redirect"
  },
//   Middleware
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(null, profile);
   
  }
));


passport.serializeUser(function(user,done){
    done(null,user)
});

passport.deserializeUser(function(user,done){
    done(null,user)
});