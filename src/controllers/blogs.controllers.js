import BlogModel from "../models/blog.model.js";
import catchAsyncError from "../utils/catchAsyncError.js";
import ApiError from "../utils/ApiError.js";
import blogValidator from "../validators/blog.validator.js";
import slugify from "slugify";

const getAllBlogs = catchAsyncError(async (httpObject) => {
    const page = httpObject.query.page * 1 || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const blogs = await BlogModel.find(
        { is_published: true },
        "-__v -is_published",
    )
        .sort("-createdAt")
        .limit(limit)
        .skip(skip);

    return {
        status: 200,
        data: blogs,
    };
});

const getBlogById = catchAsyncError(async (httpObject) => {
    const blogID = httpObject.params.id;

    // Check if blog exists
    const blog = await BlogModel.findById(blogID);
    if (blog === null) {
        throw new ApiError("Blog not found", 404);
    }

    return {
        status: 200,
        data: blog,
    };
});

const createNewBlog = catchAsyncError(async (httpObject) => {
    const data = httpObject.body;

    // Validate blog data
    blogValidator(data);

    // Create a new blog in database
    const newBlog = await BlogModel.create({
        ...data,
        published_on: new Date(Date.now()).toDateString(),
        slug: slugify(data.title),
    });

    return {
        status: 201,
        data: newBlog,
    };
});

const updateBlog = catchAsyncError(async (httpObject) => {
    const blogID = httpObject.params.id;
    const newBlogData = httpObject.body;

    // Validate new blog data
    blogValidator(newBlogData);

    // Check if blog exists
    const blog = await BlogModel.findById(blogID);
    if (!blog) {
        throw new ApiError("Blog not found", 404);
    }

    // Update blog
    const updatedBlog = await BlogModel.findByIdAndUpdate(blogID, newBlogData, {
        new: true,
    });

    return {
        status: 200,
        data: updatedBlog,
    };
});

const deleteBlog = catchAsyncError(async (httpObject) => {
    const blogID = httpObject.params.id;

    // Check if blog exists
    const blog = await BlogModel.findById(blogID);
    if (!blog) {
        throw new ApiError("Blog not found", 404);
    }

    // Delete blog
    await BlogModel.findByIdAndDelete(blogID);
    return {
        status: 204,
        data: null,
    };
});

export { getAllBlogs, getBlogById, createNewBlog, updateBlog, deleteBlog };
