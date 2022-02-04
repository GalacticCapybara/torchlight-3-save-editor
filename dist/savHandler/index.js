"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs_1 = __importDefault(require("fs"));
var app_root_path_1 = __importDefault(require("app-root-path"));
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
function toStringifiedJson(buffer) {
    var indexOfFirstBracket = getStartindex(buffer);
    var indexOfLastBracket = getEndIndex(buffer);
    var content = buffer
        .slice(indexOfFirstBracket, indexOfLastBracket)
        .toString("utf-8");
    return content;
}
function toBuffer(stringifiedJson) {
    var minifiedContent = JSON.stringify(JSON.parse(stringifiedJson));
    var fileAsBuffer = fs_1["default"].readFileSync("".concat(app_root_path_1["default"].path, "/assets/1mb.sav"));
    var indexOfFirstBracket = getStartindex(fileAsBuffer);
    var indexOfLastBracket = getEndIndex(fileAsBuffer);
    if (minifiedContent.length > indexOfLastBracket - indexOfFirstBracket) {
        throw new Error("Content too large");
    }
    var paddedContent = minifiedContent
        .slice(0, -1)
        .padEnd(indexOfLastBracket - indexOfFirstBracket - 1) +
        minifiedContent[minifiedContent.length - 1];
    for (var index = 0; index <= indexOfLastBracket - indexOfFirstBracket; index++) {
        fileAsBuffer[indexOfFirstBracket + index] = paddedContent.charCodeAt(index);
    }
    return fileAsBuffer;
}
exports["default"] = {
    toStringifiedJson: toStringifiedJson,
    toBuffer: toBuffer
};
