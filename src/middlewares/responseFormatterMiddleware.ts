import { Middleware, ApiResponse } from "../types";

const responseFormatterMiddleware: Middleware = (req, res, next) => {
    const sendResponse: ApiResponse["sendResponse"] = (options) => {
        const { status = 200, code, data } = options;

        const response = {
            status,
            code,
            data,
        };

        console.log("API response:", JSON.stringify(response, null, 2));

        res.status(status).send(response);
    };

    res.sendResponse = sendResponse;
    next();
};

export { responseFormatterMiddleware };
export default responseFormatterMiddleware;
