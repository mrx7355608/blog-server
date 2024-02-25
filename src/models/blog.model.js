import { Schema, model } from "mongoose";

const blogSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    published_on: { type: String, required: true },
    is_published: { type: Boolean, required: true },
    tags: { type: [String], default: [] },
});

const BlogModel = model("Blog", blogSchema);

export default BlogModel;
