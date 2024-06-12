import { Express } from "express";
import { mainRouter } from "./routers";
import {
    requestLoggerMiddleware,
    errorMiddleware,
    responseFormatterMiddleware,
} from "./middlewares";
import { Api } from "./types";
import pingController from "./controllers/pingController";

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app: any = express();

const corsOptions = {
    origin: [/^http:\/\/localhost/, /^https:\/\//],
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Headers": true,
    "Access-Control-Expose-Headers": true,
};

const jsonOptions = {
    limit: "100mb",
    type: "application/json",
};

const urlencodedOptions = {
    limit: "100mb",
    extended: true,
    type: "multipart/form-data",
};

app.use(cors(corsOptions));
app.use(express.json(jsonOptions));
app.use(bodyParser.json(jsonOptions));
app.use(express.urlencoded(urlencodedOptions));

const api: Api = {
    use(route, middleware) {
        app.use(route, middleware);
    },
    error(route, middleware) {
        app.use(route, (err: any, req: any, res: any, next: any) =>
            middleware(req, res, next, err)
        );
    },
    get(route, controller) {
        app.get(route, controller);
    },
    patch(route, controller) {
        app.patch(route, controller);
    },
    delete(route, controller) {
        app.delete(route, controller);
    },
    put(route, controller) {
        app.put(route, controller);
    },
    post(route, controller) {
        app.post(route, controller);
    },
};

api.use("/*", requestLoggerMiddleware);
api.use("/*", responseFormatterMiddleware);

api.get("/ping", pingController);
mainRouter(api);

api.error("/*", errorMiddleware);

export default app as Express;
