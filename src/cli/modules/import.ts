import path from "path";
import fs from "fs";

import getPath from "platform-folders";

import fileHander from "../../fileHander";
import defaultLogger, { LoggerInterface } from "../../logger";
import { ErrorEnum } from "./enums";

function getModule(logger: LoggerInterface = defaultLogger) {
  return {
    command: "import",
    handler: (argv) => {
      if (!argv["path"]) {
        throw new Error(ErrorEnum.pathRequired);
      }

      const frontiersFolder = argv["path"];

      const inputFolder = path.join(
        getPath("documents"),
        "torchlight-3-save-editor"
      );
      const outputFolder = path.join(
        frontiersFolder,
        fileHander.saveGameFolder
      );

      const fileNames = fileHander.listAllValidFiles(inputFolder);

      if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true });
      }

      for (let fileName of fileNames) {
        const content = fs.readFileSync(
          path.join(inputFolder, fileName),
          "utf-8"
        );

        fileHander.saveFile(
          path.join(outputFolder, fileName.replace(".json", ".sav")),
          JSON.parse(content)
        );
      }
    },
    builder: {},
    describe:
      "Imports the save game as JSON from <documents>/torchlight-3-save-editor",
  };
}

export default getModule;
