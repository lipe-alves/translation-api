const { exec } = require("child_process");
const fs = require("fs");

serveFirebase();

async function serveFirebase() {
    const env = getEnvVariables();
    await execCommand(
        `npm run build && firebase serve --port ${env.PORT} --only functions`
    );
}

function getEnvVariables() {
    const jsonStr = fs.readFileSync("../src/env.json");
    return JSON.parse(jsonStr);
}

/** @param {string} command */
function execCommand(command) {
    return new Promise(async (resolve, reject) => {
        try {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.log("Error executing command:", command);
                    console.error("Error:", error);
                    console.log("Stderr:", stderr);
                    reject(error);
                } else {
                    resolve(stdout);
                }
            });
        } catch (err) {
            reject(err);
        }
    });
}
