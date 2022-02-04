#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var main_1 = __importDefault(require("./modules/main"));
// @ts-ignore
var package_json_1 = __importDefault(require("../../package.json")); // outside src
var args = process.argv.slice(2);
var version = package_json_1["default"].version;
// call main module and inject its dependencies
(0, main_1["default"])(args, { version: version });
