#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var yargs_1 = __importDefault(require("yargs"));
var path_1 = __importDefault(require("path"));
var export_1 = __importDefault(require("./export"));
var import_1 = __importDefault(require("./import"));
var options = yargs_1["default"]
    .version("0.1.0")
    .usage("Usage: torchlight-3-save-editor [command] [option]\n" +
    "\n" +
    "--path:\n" +
    "on Windows: %localappdata%\\Frontiers\\\n" +
    "on Linux: <steamlibrary>\\steamapps\\common\\<torchlight 3 install dir>\\Frontiers")
    .option("p", {
    alias: "path",
    describe: "Alternative Frontiers path folder",
    type: "string",
    demandOption: true
})
    .command("export", "Exports the save game as JSON to <documents>/torchlight-3-save-editor")
    .command("import", "Imports the save game as JSON from <documents>/torchlight-3-save-editor")
    .demandCommand(1)
    .help(true)
    .coerce(["path"], path_1["default"].resolve)
    .parse();
if (options["_"][0] === "export") {
    (0, export_1["default"])(options["path"]);
}
else if (options["_"][0] === "import") {
    (0, import_1["default"])(options["path"]);
}
else {
    console.log("invalid command");
}
