import fs from "fs";

const child_process = require("child_process");
const { LOGGER } = require("./var");

function is_string(value: any): boolean {
    return typeof value === "string";
}

function run_command(command: string): void {
    child_process.spawn(command, [], {stdio: "pipe"});
    LOGGER.out("success: " + command);
}

function init_file(file: string): void {
    if (!fs.existsSync(file)) {
        // create parent directory
        if (file.includes("/")) {
            const parent_dir: string = file.substring(0, file.lastIndexOf("/"));
            if (!fs.existsSync(parent_dir)) {
                fs.mkdirSync(parent_dir);
            }
        }
    }
    // create file
    fs.writeFileSync(file, "");
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export { is_string, run_command, init_file, sleep };