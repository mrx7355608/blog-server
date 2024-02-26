import { Router } from "express";
import passport from "passport";
import loginRateLimiter from "../middlewares/loginRateLimiter.js";

const router = Router();

const createSession = (user, req, res, next) => {
    req.login(user, (err) => {
        if (err) {
            return next(err);
        }
        return res.status(200).json({
            ok: true,
            data: {
                name: user.name,
                username: user.username,
            },
        });
    });
};

router.post("/login", loginRateLimiter, (req, res, next) => {
    // Authenticate user with username and password (passport local strategy)
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(400).json({
                ok: false,
                error: info.message,
            });
        }

        // Create session
        createSession(user, req, res, next);
    })(req, res, next);
});

router.post("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }

        res.status(200).json({
            ok: true,
            data: null,
        });
    });
});

export default router;
