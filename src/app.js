import express from "express";
import helmet from "helmet";
import cors from "cors";
import hpp from "hpp";
import morgan from "morgan";
import { catch404, globalErrorHandler } from "./utils/errorHandlers.js";

const app = express();

app.use(helmet());
app.use(hpp());
app.use(morgan("commmon"));
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    }),
);
app.use(express.json());

// ERROR HANDLERS
app.use(catch404);
app.use(globalErrorHandler);

export default app;
