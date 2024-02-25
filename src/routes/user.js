import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated";

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
