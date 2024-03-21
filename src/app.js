import express from "express";
import helmet from "helmet";
import cors from "cors";
import hpp from "hpp";
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
import passportSetup from "./passportSetup.js";
import connectMongo from "connect-mongodb-session";
import { catch404, globalErrorHandler } from "./utils/errorHandlers.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import blogRouter from "./routes/blogs.js";
import path from "path";

const app = express();

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// app.use(helmet());
app.use(hpp());
app.use(morgan("combined"));
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "dist")));

const MongoStore = connectMongo(session);
const mongoSessionStore = new MongoStore({
    uri: process.env.DB_URL,
    collection: "sessions",
    databaseName: "blog",
});
app.use(
    session({
        secret: process.env.SESSIONS_SECRET,
        store: mongoSessionStore,
        proxy: true,
        cookie: {
            maxAge: 24 * 3600 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            sameSite: "none",
        },
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());
passportSetup();

// ROUTES
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/blogs", blogRouter);
app.get("*", (req, res) => {
    return res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

// ERROR HANDLERS
app.use(catch404);
app.use(globalErrorHandler);

export default app;
