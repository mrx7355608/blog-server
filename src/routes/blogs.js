import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import validateBlogId from "../middlewares/validateBlogId.js";
import {
    getAllBlogs,
    createNewBlog,
    getBlogById,
    updateBlog,
    deleteBlog,
} from "../controllers/blogs.controllers.js";

const router = Router();

router.get("/", getAllBlogs);
router.get("/:id", validateBlogId, getBlogById);

// Created a middleware to allow authenticated requests only
router.use(isAuthenticated);

// CREATE POST
router.post("/", createNewBlog);

// EDIT BLOG
router.patch("/:id", validateBlogId, updateBlog);

// DELETE BLOG
router.delete("/:id", validateBlogId, deleteBlog);

export default router;
