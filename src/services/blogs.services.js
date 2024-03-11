import BlogModel from "../models/blog.model.js";
import blogValidator from "../validators/blog.validator.js";
import slugify from "slugify";
import ApiError from "../utils/ApiError.js";

const listAllBlogs = async (page) => {
    const limit = 10;
    const skip = (page - 1) * limit;

    const blogs = await BlogModel.find({}, "-__v")
        .sort("-createdAt")
        .limit(limit)
        .skip(skip);
    return blogs;
};

const listBlogBySlug = async (slug) => {
    const blog = await BlogModel.findOne({ slug }, "-__v");
    if (!blog) {
        throw new ApiError("Blog not found", 404);
    }
    return blog;
};

const listPublishedBlogs = async (page) => {
    const limit = 10;
    const skip = (page - 1) * limit;

    const blogs = await BlogModel.find(
        { is_published: true },
        "-__v -is_published"
    )
        .sort("-createdAt")
        .limit(limit)
        .skip(skip);

    return blogs;
};

const listUnpublishedBlogs = async (page) => {
    const limit = 10;
    const skip = (page - 1) * limit;

    const blogs = await BlogModel.find(
        { is_published: false },
        "-__v -is_published"
    )
        .sort("-createdAt")
        .limit(limit)
        .skip(skip);

    return blogs;
};
const listOneBlogById = async (blogID) => {
    // Check if blog exists
    const blog = await BlogModel.findById(blogID);
    if (blog === null) {
        throw new ApiError("Blog not found", 404);
    }

    return blog;
};

const addBlog = async (data) => {
    // Validate blog data
    blogValidator(data);

    // Create a new blog in database
    const newBlog = await BlogModel.create({
        ...data,
        published_on: new Date(Date.now()).toDateString(),
        slug: slugify(data.title),
    });

    return newBlog;
};

const editBlog = async (blogID, newBlogData) => {
    // TODO: Validate new blog data

    // Check if blog exists
    const blog = await BlogModel.findById(blogID);
    if (!blog) {
        throw new ApiError("Blog not found", 404);
    }

    // Update blog
    const updatedBlog = await BlogModel.findByIdAndUpdate(blogID, newBlogData, {
        new: true,
    });

    return updatedBlog;
};

const removeBlog = async (blogID) => {
    // Check if blog exists
    const blog = await BlogModel.findById(blogID);
    if (!blog) {
        throw new ApiError("Blog not found", 404);
    }

    // Delete blog
    await BlogModel.findByIdAndDelete(blogID);
    return null;
};

const publishBlog = async (blogID) => {
    // Check if blog exists
    const blog = await BlogModel.findById(blogID);
    if (!blog) {
        throw new ApiError("Blog not found", 404);
    }

    if (blog.is_published === true) {
        throw new ApiError("Blog is already published", 400);
    }

    const updatedBlog = await BlogModel.findByIdAndUpdate(
        blogID,
        { is_published: true },
        {
            new: true,
        }
    );
    return updatedBlog;
};

const unpublishBlog = async (blogID) => {
    // Check if blog exists
    const blog = await BlogModel.findById(blogID);
    if (!blog) {
        throw new ApiError("Blog not found", 404);
    }

    if (blog.is_published === false) {
        throw new ApiError("Blog is already un-published", 400);
    }

    const updatedBlog = await BlogModel.findByIdAndUpdate(
        blogID,
        { is_published: false },
        {
            new: true,
        }
    );
    return updatedBlog;
};
export {
    listAllBlogs,
    listOneBlogById,
    addBlog,
    editBlog,
    removeBlog,
    publishBlog,
    unpublishBlog,
    listPublishedBlogs,
    listUnpublishedBlogs,
    listBlogBySlug,
};
