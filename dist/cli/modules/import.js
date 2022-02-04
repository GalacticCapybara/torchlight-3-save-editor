"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var platform_folders_1 = __importDefault(require("platform-folders"));
var fileHander_1 = __importDefault(require("../../fileHander"));
var logger_1 = __importDefault(require("../../logger"));
var enums_1 = require("./enums");
function getModule(logger) {
    if (logger === void 0) { logger = logger_1["default"]; }
    return {
        command: "import",
        handler: function (argv) {
            if (!argv["path"]) {
                throw new Error(enums_1.ErrorEnum.pathRequired);
            }
            var frontiersFolder = argv["path"];
            var inputFolder = path_1["default"].join((0, platform_folders_1["default"])("documents"), "torchlight-3-save-editor");
            var outputFolder = path_1["default"].join(frontiersFolder, fileHander_1["default"].saveGameFolder);
            var fileNames = fileHander_1["default"].listAllValidFiles(inputFolder);
            if (!fs_1["default"].existsSync(outputFolder)) {
                fs_1["default"].mkdirSync(outputFolder, { recursive: true });
            }
            for (var _i = 0, fileNames_1 = fileNames; _i < fileNames_1.length; _i++) {
                var fileName = fileNames_1[_i];
                var content = fs_1["default"].readFileSync(path_1["default"].join(inputFolder, fileName), "utf-8");
                fileHander_1["default"].saveFile(path_1["default"].join(outputFolder, fileName.replace(".json", ".sav")), JSON.parse(content));
            }
        },
        builder: {},
        describe: "Imports the save game as JSON from <documents>/torchlight-3-save-editor"
    };
}
exports["default"] = getModule;
