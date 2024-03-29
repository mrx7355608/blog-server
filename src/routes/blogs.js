import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import validateBlogId from "../middlewares/validateBlogId.js";
import {
    getAllBlogs,
    createNewBlog,
    updateBlog,
    deleteBlog,
    patchPublishBlog,
    patchUnpublishBlog,
    getPublishedBlogs,
    getUnpublishedBlogs,
    getBlogBySlug,
    getBlogById,
} from "../controllers/blogs.controllers.js";

const router = Router();

router.get("/published", getPublishedBlogs);
router.get("/un-published", isAuthenticated, getUnpublishedBlogs);
router.get("/:slug", getBlogBySlug);

// Created a middleware to allow authenticated requests only
router.use(isAuthenticated);

router.get("/", getAllBlogs);
router.get("/id/:id", getBlogById);
router.post("/", createNewBlog);
router.patch("/:id", validateBlogId, updateBlog);
router.delete("/:id", validateBlogId, deleteBlog);
router.patch("/publish/:id", validateBlogId, patchPublishBlog);
router.patch("/un-publish/:id", validateBlogId, patchUnpublishBlog);

export default router;
