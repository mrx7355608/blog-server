import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = Router();

router.use(isAuthenticated);

router.get("/", (req, res) => {
    const user = req.user;
    return res.status(200).json({
        ok: true,
        data: user,
    });
});

export default router;
