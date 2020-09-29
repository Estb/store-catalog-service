require('dotenv-safe').config();
const passport    = require('passport');
const ExtractJWT =  require("passport-jwt").ExtractJwt;
const JWTstrategy = require('passport-jwt').Strategy;

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
      try {
        return done(null, token);
      } catch (error) {
        done(error);
      }
    }
  )
);