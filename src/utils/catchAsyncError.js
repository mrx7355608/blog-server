/*
 This function takes a controller function as parameter
 and returns an express's request handler function

 The controller function should return a js object,
 which should be like this:
 {
    status: number, -- The http status code
    data: any       -- The response data
 }
*/

export default function catchAsyncError(controllerFunc) {
    // Return express request handler
    return async function (req, res, next) {
        try {
            const httpObject = {
                body: req.body,
                params: req.params,
                query: req.query,
                user: req.user,
            };
            const response = await controllerFunc(httpObject);
            return res.status(response.status).json({
                ok: true,
                data: response.data,
            });
        } catch (err) {
            next(err);
        }
    };
}
