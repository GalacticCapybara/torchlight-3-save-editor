"use strict";
/**
 * dependency injection-ish with Logger, version and args for better testing
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var yargs_1 = __importDefault(require("yargs"));
var path_1 = __importDefault(require("path"));
var export_1 = __importDefault(require("./export"));
var import_1 = __importDefault(require("./import"));
var logger_1 = __importDefault(require("../../logger"));
function default_1(args, options) {
    var version = (options === null || options === void 0 ? void 0 : options.version) || "0.0.0";
    var logger = (options === null || options === void 0 ? void 0 : options.logger) || logger_1["default"];
    var cliModules = [(0, export_1["default"])(logger), (0, import_1["default"])(logger)];
    yargs_1["default"].version(version);
    yargs_1["default"].help(true);
    yargs_1["default"]
        .option("p", {
        alias: "path",
        describe: "Frontiers path folder\n" +
            "on Windows: %localappdata%\\Frontiers\\\n" +
            "on Linux: <steamlibrary>\\steamapps\\common\\<torchlight 3 install dir>\\Frontiers",
        type: "string"
    })
        .coerce(["path"], function (p) { return (p ? path_1["default"].resolve(p) : undefined); });
    for (var _i = 0, cliModules_1 = cliModules; _i < cliModules_1.length; _i++) {
        var module_1 = cliModules_1[_i];
        yargs_1["default"].command(module_1.command, module_1.describe);
    }
    yargs_1["default"].usage("Usage: torchlight-3-save-editor [command] [option]");
    var cliArgs = yargs_1["default"].parse(args);
    if (cliArgs["version"]) {
        yargs_1["default"].showVersion(logger.info);
        return;
    }
    if (cliArgs["help"] || cliArgs["h"]) {
        yargs_1["default"].showHelp(logger.info);
        return;
    }
    if (cliArgs["_"].length === 0) {
        logger.error("no command");
        return;
    }
    var choseModule = cliModules.filter(function (m) { return m.command === cliArgs["_"][0]; });
    if (choseModule.length === 0) {
        logger.error("invalid command");
        return;
    }
    try {
        choseModule[0].handler(cliArgs);
    }
    catch (error) {
        logger.error(error.message);
    }
}
exports["default"] = default_1;
