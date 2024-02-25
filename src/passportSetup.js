import passport from "passport";
import { Strategy } from "passport-local";
import UserModel from "./models/user.model";
import bc from "bcryptjs";

export default function passportSetup() {
    passport.use(
        new Strategy(async (username, password, done) => {
            // Check if user exists
            const user = await UserModel.findOne({ username });
            if (!user) {
                return done(null, false, {
                    message: "Incorrect email or password",
                });
            }

            // Verify password
            const isValidPassword = await bc.compare(password, user.password);
            if (!isValidPassword) {
                return done(null, false, {
                    message: "Incorrect email or password",
                });
            }

            return done(null, user);
        }),
    );

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
        UserModel.findById(id)
            .then((doc) => done(null, doc))
            .catch((err) => done(err));
    });
}
