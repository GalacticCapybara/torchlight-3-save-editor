import path from "path";
import fs from "fs";

import getPath from "platform-folders";

import fileHander from "../../fileHander";
import defaultLogger, { LoggerInterface } from "../../logger";
import { ErrorEnum } from "./enums";

function getModule(logger: LoggerInterface = defaultLogger) {
  return {
    command: "export",
    handler: (argv) => {
      if (!argv["path"]) {
        throw new Error(ErrorEnum.pathRequired);
      }

      const frontiersFolder = argv["path"];

      const inputFolder = path.join(frontiersFolder, fileHander.saveGameFolder);
      const outputFolder = path.join(
        getPath("documents"),
        "torchlight-3-save-editor"
      );

      const fileNames = fileHander.listAllValidFiles(inputFolder);

      if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true });
      }

      for (let fileName of fileNames) {
        const content = fileHander.getContent(path.join(inputFolder, fileName));
        fs.writeFileSync(
          path.join(outputFolder, fileName.replace(".sav", ".json")),
          JSON.stringify(JSON.parse(content), null, 2)
        );
      }
    },
    builder: {},
    describe:
      "Exports the save game as JSON to <documents>/torchlight-3-save-editor",
  };
}

export default getModule;
