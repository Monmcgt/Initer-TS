const v = require("./var");
const func = require("./func");
const config_file = require("../config/config.json");

const array: string[] = [];
let index: number = 0;

func.init_file(v.LOG_FILE);
func.init_file(v.LOG_ERR_FILE);

v.LOGGER.init(v.LOG_FILE, v.LOG_ERR_FILE);

for (const value of config_file.startup) {
    if (!func.is_string(value)) {
        // throw new Error("value is not a string");
        v.LOGGER.err("value is not a string at index " + index);
    } else {
        array.push(value);
    }
    index++;
}

array.forEach(func.run_command);

v.LOGGER.close();

// exit
func.sleep(3000).then(() => {
    process.exit(0);
});