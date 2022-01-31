import path from "path";
import fs from "fs";

import getPath from "platform-folders";

import file from "./file";

function command(frontiersFolder) {
  const inputFolder = path.join(frontiersFolder, file.saveGameFolder);
  const outputFolder = path.join(
    getPath("documents"),
    "torchlight-3-save-editor"
  );

  const fileNames = file.listAllValidFiles(inputFolder);

  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }

  for (let fileName of fileNames) {
    const content = file.getContent(path.join(inputFolder, fileName));
    fs.writeFileSync(
      path.join(outputFolder, fileName.replace(".sav", ".json")),
      JSON.stringify(JSON.parse(content), null, 2)
    );
  }
}

export default command;
