import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import validateBlogId from "../middlewares/validateBlogId.js";
import {
    getAllBlogs,
    createNewBlog,
    getBlogById,
    updateBlog,
    deleteBlog,
    patchPublishBlog,
    patchUnpublishBlog,
} from "../controllers/blogs.controllers.js";

const router = Router();

router.get("/", getAllBlogs);
router.get("/:id", validateBlogId, getBlogById);

// Created a middleware to allow authenticated requests only
router.use(isAuthenticated);

router.post("/", createNewBlog);
router.patch("/:id", validateBlogId, updateBlog);
router.delete("/:id", validateBlogId, deleteBlog);
router.patch("/publish/:id", validateBlogId, patchPublishBlog);
router.patch("/un-publish/:id", validateBlogId, patchUnpublishBlog);

export default router;
