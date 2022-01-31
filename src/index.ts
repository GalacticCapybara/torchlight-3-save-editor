#! /usr/bin/env node

import yargs from "yargs";
import path from "path";
import exportCommand from "./export";
import importCommand from "./import";

const options = yargs
  .version("0.1.4")
  .usage(
    "Usage: torchlight-3-save-editor [command] [option]\n" +
      "\n" +
      "--path:\n" +
      "on Windows: %localappdata%\\Frontiers\\\n" +
      "on Linux: <steamlibrary>\\steamapps\\common\\<torchlight 3 install dir>\\Frontiers"
  )
  .option("p", {
    alias: "path",
    describe: "Alternative Frontiers path folder",
    type: "string",
    demandOption: true,
  })
  .command(
    "export",
    "Exports the save game as JSON to <documents>/torchlight-3-save-editor"
  )
  .command(
    "import",
    "Imports the save game as JSON from <documents>/torchlight-3-save-editor"
  )
  .demandCommand(1)
  .help(true)
  .coerce(["path"], path.resolve)
  .parse();

if (options["_"][0] === "export") {
  exportCommand(options["path"]);
} else if (options["_"][0] === "import") {
  importCommand(options["path"]);
} else {
  console.log("invalid command");
}
