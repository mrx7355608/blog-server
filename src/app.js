import express from "express";
import helmet from "helmet";
import cors from "cors";
import hpp from "hpp";
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
import passportSetup from "./passportSetup.js";
import { catch404, globalErrorHandler } from "./utils/errorHandlers.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";

const app = express();

app.use(helmet());
app.use(hpp());
app.use(morgan("combined"));
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        secret: process.env.SESSIONS_SECRET,
        cookie: {
            maxAge: 24 * 3600 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            proxy: true,
        },
        resave: false,
        saveUninitialized: false,
    }),
);
app.use(passport.initialize());
app.use(passport.session());
passportSetup();

// ROUTES
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// ERROR HANDLERS
app.use(catch404);
app.use(globalErrorHandler);

export default app;
