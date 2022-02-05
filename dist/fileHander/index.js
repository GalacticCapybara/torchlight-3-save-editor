"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var savHandler_1 = __importDefault(require("../savHandler"));
var saveGameFolder = "Saved/SaveGames";
var validFiles = [
    /[0-9]*-QuestData\.(sav|json)/,
    /[0-9]*-AccountQuests\.(sav|json)/,
    /[0-9]*-CharacterData\.(sav|json)/,
    /[0-9]*-AccountWide\.(sav|json)/,
    /[0-9]*-FortInventory\.(sav|json)/,
    /[0-9]*-FortStash\.(sav|json)/,
    /[0-9]*-SharedStash-[0-9]\.(sav|json)/,
];
function saveFile(filePath, content) {
    if (typeof content === "object") {
        content = JSON.stringify(content);
    }
    var fileFolder = path_1["default"].dirname(filePath);
    if (!fs_1["default"].existsSync(fileFolder)) {
        fs_1["default"].mkdirSync(fileFolder, { recursive: true });
    }
    var buffer = savHandler_1["default"].toBuffer(content);
    fs_1["default"].writeFileSync(filePath, buffer);
}
function getContent(filePath) {
    var fileAsBuffer = fs_1["default"].readFileSync(filePath);
    var content = savHandler_1["default"].toStringifiedJson(fileAsBuffer);
    return content;
}
function listAllValidFiles(dirPath) {
    var fileList = fs_1["default"].readdirSync(dirPath);
    var validFileList = fileList.filter(function (fileName) {
        return validFiles.filter(function (pattern) { return fileName.match(pattern); }).length > 0;
    });
    return validFileList;
}
function getFromStaticContent(dirPath, assetsFile) {
    var fileList = fs_1["default"].readdirSync(dirPath);
    var validFileList = fileList.filter(function (fileName) {
        return fileName.match(/[0-9]*-StaticContent\.sav/);
    });
    if (validFileList.length === 0) {
        throw new Error("no staticContent file");
    }
    var buffer = fs_1["default"].readFileSync(path_1["default"].join(dirPath, validFileList[0]));
    return savHandler_1["default"].toStringifiedAsset(buffer, assetsFile);
}
exports["default"] = {
    saveGameFolder: saveGameFolder,
    saveFile: saveFile,
    listAllValidFiles: listAllValidFiles,
    getContent: getContent,
    getFromStaticContent: getFromStaticContent
};
