import { MissingParam } from "../errors";
import { Controller, ApiRequest } from "../types";
import { translateText } from "../use-cases";
import responseCodes from "../constants/responseCodes";

interface TextTranslationControllerParams extends ApiRequest {
    query: {
        from?: string | "auto";
        to: string;
        text: string;
    };
}

const translateTextController: Controller<
    TextTranslationControllerParams
> = async (req, res, next) => {
    try {
        const { from = "auto", to, text } = req.query;

        if (!to) throw new MissingParam("to");
        if (!text) throw new MissingParam("text");

        const response = await translateText(decodeURIComponent(text), {
            from,
            to,
        });

        res.sendResponse({
            status: 200,
            code: responseCodes.SUCCESS,
            data: response,
        });
    } catch (err) {
        next(err);
    }
};

export default translateTextController;
export { translateTextController };
export type { TextTranslationControllerParams };
