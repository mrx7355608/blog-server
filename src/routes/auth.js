import { Router } from "express";
import UserModel from "../models/user.model.js";
import bc from "bcryptjs";

const router = Router();

// CREATE USER
router.post("/signup", async (req, res, next) => {
    try {
        const data = req.body;
        const newUser = await UserModel.create({
            ...data,
            password: bc.hash(data.password, 12),
        });
        return res.status(201).json({
            ok: true,
            data: newUser,
        });
    } catch (error) {
        next(error);
    }
});
