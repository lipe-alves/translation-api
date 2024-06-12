import responseCodes from "../constants/responseCodes";

export type Method = "get" | "patch" | "delete" | "put" | "post";

export interface ApiRequest {
    originalUrl: string;
    params: {
        [key: string]: string;
    };
    query: {
        [key: string]: string | undefined;
    };
    body: {
        [key: string]: any;
    } & Request["body"];
    headers: {
        origin?: string;
        [key: string]: string | string[] | undefined;
    } & Request["headers"];
}

export interface ApiResponse {
    status(status: number): ApiResponse;
    send(data: any): void;
    sendResponse(response: {
        status?: number;
        code: ResponseCode;
        data?: any;
    }): void;
}

export type ResponseCode = (typeof responseCodes)[keyof typeof responseCodes];

export type RequiredPick<T, K extends keyof T> = Required<Pick<T, K>> &
    Omit<T, K>;

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type Router = (api: Api) => void;

export type Controller<RouteParams extends ApiRequest = ApiRequest> = (
    req: RouteParams,
    res: ApiResponse,
    next: (...args: any[]) => void
) => Promise<void>;

export type Middleware = (
    req: ApiRequest,
    res: ApiResponse,
    next: (...args: any[]) => void,
    err?: Error
) => void;

export interface Api {
    use: (route: string, middleware: Middleware) => void;
    error: (route: string, middleware: Middleware) => void;
    get: (route: string, controller: Controller<any>) => void;
    patch: (route: string, controller: Controller<any>) => void;
    delete: (route: string, controller: Controller<any>) => void;
    put: (route: string, controller: Controller<any>) => void;
    post: (route: string, controller: Controller<any>) => void;
}
