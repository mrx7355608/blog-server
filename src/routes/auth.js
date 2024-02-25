import { Router } from "express";
import passport from "passport";

const router = Router();

// CREATE USER
// router.post("/signup", async (req, res, next) => {
//     try {
//         const data = req.body;
//         console.log(data);
//         const newUser = await UserModel.create({
//             ...data,
//             password: await bc.hash(data.password, 12),
//         });
//         return res.status(201).json({
//             ok: true,
//             data: newUser,
//         });
//     } catch (error) {
//         next(error);
//     }
// });

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

router.post("/login", (req, res, next) => {
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

export default router;
