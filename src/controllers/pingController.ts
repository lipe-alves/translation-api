import { Controller } from "../types";
import responseCodes from "../constants/responseCodes";

const pingController: Controller = async (_, res) => {
    res.sendResponse({
        status: 200,
        code: responseCodes.SUCCESS,
        data: "Ping!",
    });
};

export default pingController;
export { pingController };
