/**
 * dependency injection-ish with Logger, version and args for better testing
 */

import yargs from "yargs";
import path from "path";

import extractModule from "./export";
import importModule from "./import";

import defaultLogger, { LoggerInterface } from "../../logger";

export interface optionsInterface {
  version?: string;
  logger?: LoggerInterface;
}

export default function (args: string[], options?: optionsInterface): void {
  const version = options?.version || "0.0.0";
  const logger = options?.logger || defaultLogger;

  const cliModules: any[] = [extractModule(logger), importModule(logger)];

  yargs.version(version);

  yargs.help(true);

  yargs
    .option("p", {
      alias: "path",
      describe:
        "Frontiers path folder\n" +
        "on Windows: %localappdata%\\Frontiers\\\n" +
        "on Linux: <steamlibrary>\\steamapps\\common\\<torchlight 3 install dir>\\Frontiers",
      type: "string",
    })
    .coerce(["path"], (p) => (p ? path.resolve(p) : undefined));

  for (const module of cliModules) {
    yargs.command(module.command, module.describe);
  }

  yargs.usage("Usage: torchlight-3-save-editor [command] [option]");

  const cliArgs = yargs.parse(args);

  if (cliArgs["version"]) {
    yargs.showVersion(logger.info);
    return;
  }

  if (cliArgs["help"] || cliArgs["h"]) {
    yargs.showHelp(logger.info);
    return;
  }

  if (cliArgs["_"].length === 0) {
    logger.error("no command");
    return;
  }

  const choseModule = cliModules.filter((m) => m.command === cliArgs["_"][0]);
  if (choseModule.length === 0) {
    logger.error("invalid command");
    return;
  }

  try {
    choseModule[0].handler(cliArgs);
  } catch (error) {
    logger.error(error.message);
  }
}
