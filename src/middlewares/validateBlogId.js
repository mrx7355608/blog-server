import validator from "validator";
import ApiError from "../utils/ApiError.js";

export default function validateBlogId(req, res, next) {
    const blogID = req.params.id;

    // Validate blog id
    if (validator.isMongoId(blogID) === false) {
        return next(new ApiError("Invalid blog id", 400));
    }
    return next();
}
