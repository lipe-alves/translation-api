import * as functions from "firebase-functions";
import api from "./api";
import env from "./env.json";

const runtimeOptions = {
    timeoutSeconds: 540,
    memory: "8GB" as "8GB",
};

export const translationApi = functions
    .runWith(runtimeOptions)
    .https.onRequest(api);

api.listen(env.PORT, () => {
    console.log("API is listening on port", env.PORT);
});
