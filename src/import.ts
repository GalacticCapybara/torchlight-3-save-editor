import path from "path";
import fs from "fs";

import getPath from "platform-folders";

import file from "./file";

function command(frontiersFolder) {
  const inputFolder = path.join(
    getPath("documents"),
    "torchlight-3-save-editor"
  );
  const outputFolder = path.join(frontiersFolder, file.saveGameFolder);

  const fileNames = file.listAllValidFiles(inputFolder);

  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }

  for (let fileName of fileNames) {
    const content = fs.readFileSync(path.join(inputFolder, fileName), "utf-8");

    file.saveFile(
      path.join(outputFolder, fileName.replace(".json", ".sav")),
      JSON.parse(content)
    );
  }
}

export default command;
