import { Router } from "../types";
import { translateTextController } from "../controllers";

const mainRouter: Router = (api) => {
    api.get("/translate/text/", translateTextController);
};

export default mainRouter;
export { mainRouter };
