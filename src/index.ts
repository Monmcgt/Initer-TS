const v = require("./var");
const func = require("./func");
const config_file = require("../config/config.json").startup;

const map: Map<string, Array<string>> = new Map<string, Array<string>>();
let index: number = 0;

func.init_file(v.LOG_FILE);
func.init_file(v.LOG_ERR_FILE);

v.LOGGER.init(v.LOG_FILE, v.LOG_ERR_FILE);

for (const key in config_file) {
    if (!func.is_string(key)) {
        v.LOGGER.err("key is not a string at index " + index);
        continue;
    }

    const value: any = config_file[key];
    if (!func.is_string_array(value)) {
        v.LOGGER.err("value is not a string array at index " + index);
        continue;
    }

    map.set(key, value);
    index++;
}

for (const key of map.keys()) {
    const value: Array<string> = map.get(key) as Array<string>;
    func.run_command(key, value);
}

v.LOGGER.close();

// exit
func.sleep(3000).then(() => {
    process.exit(0);
});