import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { UserModel } from "./models/userModel.js"; // Import model MongoDB của bạn
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Tìm người dùng trong MongoDB
        let user = await UserModel.findOne({ googleId: profile.id });

        if (!user) {
          // Tạo người dùng mới nếu chưa tồn tại
          user = await UserModel.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/auth/facebook/callback`,
      // profileFields: ['id', 'displayName', 'photos', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Tìm người dùng trong MongoDB
        let user = await UserModel.findOne({ facebookId: profile.id });

        if (!user) {
          // Tạo người dùng mới nếu chưa tồn tại
          user = await UserModel.create({
            facebookId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
