import catchAsyncError from "../utils/catchAsyncError.js";
import {
    addBlog,
    editBlog,
    listAllBlogs,
    listOneBlogById,
    publishBlog,
    unpublishBlog,
    removeBlog,
    listPublishedBlogs,
    listUnpublishedBlogs,
} from "../services/blogs.services.js";

const getAllBlogs = catchAsyncError(async (httpObject) => {
    const page = httpObject.query.page * 1 || 1;
    const blogs = await listAllBlogs(page);
    return {
        status: 200,
        data: blogs,
    };
});

const getPublishedBlogs = catchAsyncError(async (httpObject) => {
    const page = httpObject.query.page * 1 || 1;
    const blogs = await listPublishedBlogs(page);
    return {
        status: 200,
        data: blogs,
    };
});

const getUnpublishedBlogs = catchAsyncError(async (httpObject) => {
    const page = httpObject.query.page * 1 || 1;
    const blogs = await listUnpublishedBlogs(page);
    return {
        status: 200,
        data: blogs,
    };
});

const getBlogById = catchAsyncError(async (httpObject) => {
    const blogID = httpObject.params.id;
    const blog = await listOneBlogById(blogID);
    return {
        status: 200,
        data: blog,
    };
});

const createNewBlog = catchAsyncError(async (httpObject) => {
    const data = httpObject.body;
    const newBlog = await addBlog(data);
    return {
        status: 201,
        data: newBlog,
    };
});

const updateBlog = catchAsyncError(async (httpObject) => {
    const blogID = httpObject.params.id;
    const newBlogData = httpObject.body;
    const updatedBlog = await editBlog(blogID, newBlogData);
    return {
        status: 200,
        data: updatedBlog,
    };
});

const deleteBlog = catchAsyncError(async (httpObject) => {
    const blogID = httpObject.params.id;
    await removeBlog(blogID);
    return {
        status: 204,
        data: null,
    };
});

const patchPublishBlog = catchAsyncError(async (httpObject) => {
    const blogID = httpObject.params.id;
    const updatedBlog = await publishBlog(blogID);
    return {
        status: 200,
        data: updatedBlog,
    };
});

const patchUnpublishBlog = catchAsyncError(async (httpObject) => {
    const blogID = httpObject.params.id;
    const updatedBlog = await unpublishBlog(blogID);
    return {
        status: 200,
        data: updatedBlog,
    };
});

export {
    getAllBlogs,
    getBlogById,
    createNewBlog,
    updateBlog,
    deleteBlog,
    patchPublishBlog,
    patchUnpublishBlog,
    getPublishedBlogs,
    getUnpublishedBlogs,
};
