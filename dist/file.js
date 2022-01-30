"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs_1 = __importDefault(require("fs"));
var app_root_path_1 = __importDefault(require("app-root-path"));
var saveGameFolder = "Saved/SaveGames";
// TODO: get JSON by jumpTo instead last dataVersion
// /[0-9]*-QuestData\.(sav|json)/,
// /[0-9]*-AccountQuests\.(sav|json)/,
var validFiles = [
    /[0-9]*-CharacterData\.(sav|json)/,
    /[0-9]*-AccountWide\.(sav|json)/,
    /[0-9]*-FortInventory\.(sav|json)/,
    /[0-9]*-FortStash\.(sav|json)/,
];
function getStartindex(fileAsBuffer) {
    var jsonType = fileAsBuffer.indexOf("JsonString", 0, "utf-8");
    return fileAsBuffer.indexOf("{", jsonType, "utf-8");
}
function getEndIndex(fileAsBuffer) {
    var lastDataVersion = fileAsBuffer.indexOf("dataVersion", 0, "utf-8");
    while (fileAsBuffer.indexOf("dataVersion", lastDataVersion + 1, "utf-8") > -1) {
        lastDataVersion = fileAsBuffer.indexOf("dataVersion", lastDataVersion + 1, "utf-8");
    }
    return fileAsBuffer.indexOf("}", lastDataVersion, "utf-8") + 1;
}
function saveFile(path, content) {
    var fileAsBuffer = fs_1["default"].readFileSync("".concat(app_root_path_1["default"].path, "/assets/1mb.sav"));
    var indexOfFirstBracket = getStartindex(fileAsBuffer);
    var indexOfLastBracket = getEndIndex(fileAsBuffer);
    if (typeof content === "object") {
        content = JSON.stringify(content);
    }
    if (content.length > indexOfLastBracket - indexOfFirstBracket) {
        throw new Error("Content too large");
    }
    var paddedContent = content.slice(0, -1).padEnd(indexOfLastBracket - indexOfFirstBracket - 1) +
        content[content.length - 1];
    for (var index = 0; index <= indexOfLastBracket - indexOfFirstBracket; index++) {
        fileAsBuffer[indexOfFirstBracket + index] = paddedContent.charCodeAt(index);
    }
    fs_1["default"].writeFileSync(path, fileAsBuffer);
}
function getContent(filePath) {
    var fileAsBuffer = fs_1["default"].readFileSync(filePath);
    var indexOfFirstBracket = getStartindex(fileAsBuffer);
    var indexOfLastBracket = getEndIndex(fileAsBuffer);
    var content = fileAsBuffer
        .slice(indexOfFirstBracket, indexOfLastBracket)
        .toString("utf-8");
    return content;
}
function listAllValidFiles(dirPath) {
    var fileList = fs_1["default"].readdirSync(dirPath);
    var validFileList = fileList.filter(function (fileName) {
        return validFiles.filter(function (pattern) { return fileName.match(pattern); }).length > 0;
    });
    return validFileList;
}
exports["default"] = {
    saveGameFolder: saveGameFolder,
    saveFile: saveFile,
    listAllValidFiles: listAllValidFiles,
    getContent: getContent
};
