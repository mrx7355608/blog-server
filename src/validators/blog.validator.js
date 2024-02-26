import joi from "joi";
import ApiError from "../utils/ApiError.js";

const blogValidationSchema = joi.object({
    title: joi.string().min(5).max(200).required().messages({
        "any.required": "Please enter a blog title",
        "string.empty": "Blog title cannot be empty",
        "string.min": "Blog title should be 5 characters long at least",
        "string.max": "Blog title cannot be longer than 200 characters",
        "string.base": "Please enter a valid blog title",
    }),

    content: joi.string().min(200).max(4000).required().messages({
        "any.required": "Please enter a blog content",
        "string.empty": "Blog content cannot be empty",
        "string.min": "Blog content should be 200 characters long at least",
        "string.max": "Blog content cannot be longer than 4000 characters",
        "string.base": "Please enter a valid blog content",
    }),

    tags: joi.array().min(1).max(10).items(joi.string()).required().messages({
        "array.base": "Tags must be provided as an array.",
        "array.min": "At least one tag must be provided.",
        "array.max": "Maximum of 10 tags are allowed.",
        "any.required": "Blog tags are provided.",
        "string.base": "Tags must be strings.",
    }),
    is_published: joi.boolean().required().messages({
        "any.required": "Please select if blog should be published or not",
        "boolean.base": "is_published field must be a boolean value.",
    }),
    summary: joi.string().min(100).max(700).required().messages({
        "any.required": "Please enter a blog summary",
        "string.empty": "Blog summary cannot be empty",
        "string.min": "Blog summary should be 100 characters long at least",
        "string.max": "Blog summary cannot be longer than 700 characters",
        "string.base": "Please enter a valid blog summary",
    }),
});

export default function blogValidator(data) {
    const { error } = blogValidationSchema.validate(data);
    if (error) {
        throw new ApiError(error.message, 400);
    }
}
