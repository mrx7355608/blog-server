import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import BlogModel from "../models/blog.model.js";
import ApiError from "../utils/ApiError.js";
import validator from "validator";
import slugify from "slugify";
import blogValidator from "../validators/blog.validator.js";

const router = Router();

// GET BLOGS
router.get("/", async (req, res, next) => {
    try {
        const page = req.query.page * 1 || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        const blogs = await BlogModel.find(
            { is_published: true },
            "-__v -is_published",
        )
            .sort("-createdAt")
            .limit(limit)
            .skip(skip);

        return res.status(200).json({
            ok: true,
            data: blogs,
        });
    } catch (err) {
        next(err);
    }
});

// GET BLOG BY ID
router.get("/:id", async (req, res, next) => {
    try {
        const blogID = req.params.id;
        // Validate blog id
        if (validator.isMongoId() === false) {
            throw new ApiError("Invalid blog id", 400);
        }

        // Check if blog exists
        const blog = await BlogModel.findById(blogID);
        if (blog === null) {
            throw new ApiError("Blog not found", 404);
        }

        // Return blog
        return res.status(200).json({
            ok: true,
            data: blog,
        });
    } catch (err) {
        next(err);
    }
});

// CREATE POST
router.post("/", async (req, res, next) => {
    try {
        const data = req.body;

        // Validate blog data
        blogValidator(data);

        // Create a new blog in database
        const newBlog = await BlogModel.create({
            ...data,
            published_on: new Date(Date.now()).toDateString(),
            slug: slugify(data.title),
        });

        // return response with new blog
        return res.status(201).json({
            ok: true,
            data: newBlog,
        });
    } catch (err) {
        next(err);
    }
});

router.use(isAuthenticated);
