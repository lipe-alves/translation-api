import { Middleware } from "../types";
import { ApiError, InternalServerError } from "../errors";
import responseCodes from "../constants/responseCodes";

const errorMiddleware: Middleware = (req, res, next, err) => {
    const originalReq = {
        params: JSON.parse(JSON.stringify(req.params)),
        query: JSON.parse(JSON.stringify(req.query)),
        body: JSON.parse(JSON.stringify(req.body)),
        headers: JSON.parse(JSON.stringify(req.headers)),
    };

    let error: ApiError = new InternalServerError();

    if (err instanceof ApiError) {
        error = err;
    } else if (err instanceof Error) {
        error = new ApiError(
            500,
            err?.message,
            responseCodes.INTERNAL_SERVER_ERROR
        );
    }

    console.log("QUERY:", JSON.stringify(originalReq.query || {}, null, 2));
    console.log("BODY:", JSON.stringify(originalReq.body || {}, null, 2));
    console.log("PARAMS:", JSON.stringify(originalReq.params || {}, null, 2));
    console.log("HEADERS:", JSON.stringify(originalReq.headers || {}, null, 2));
    console.log("Error:", error);
    console.log("Date:", new Date());

    res.status(error.status).send({
        status: error.status,
        message: error.message,
        code: error.code,
    });
};

export default errorMiddleware;
export { errorMiddleware };
