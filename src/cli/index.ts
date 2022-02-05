#! /usr/bin/env node

import main from "./modules/main";
// @ts-ignore
import packageJson from "../../package.json"; // outside src

const args: string[] = process.argv.slice(2);
const version: string = packageJson.version;

// call main module and inject its dependencies
main(args, { version });
