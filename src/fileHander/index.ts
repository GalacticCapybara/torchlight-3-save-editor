import fs from "fs";
import path from "path";

import appRoot from "app-root-path";

import savHandler from "../savHandler";

const saveGameFolder = "Saved/SaveGames";

// TODO: get JSON by jumpTo instead last dataVersion
// /[0-9]*-QuestData\.(sav|json)/,
// /[0-9]*-AccountQuests\.(sav|json)/,
const validFiles = [
  /[0-9]*-CharacterData\.(sav|json)/,
  /[0-9]*-AccountWide\.(sav|json)/,
  /[0-9]*-FortInventory\.(sav|json)/,
  /[0-9]*-FortStash\.(sav|json)/,
];

function saveFile(filePath: string, content: string | object) {
  if (typeof content === "object") {
    content = JSON.stringify(content);
  }

  const fileFolder = path.dirname(filePath);
  if (!fs.existsSync(fileFolder)) {
    fs.mkdirSync(fileFolder, { recursive: true });
  }

  const buffer = savHandler.toBuffer(content);

  fs.writeFileSync(filePath, buffer);
}

function getContent(filePath: string) {
  const fileAsBuffer = fs.readFileSync(filePath);
  const content = savHandler.toStringifiedJson(fileAsBuffer);

  return content;
}

function listAllValidFiles(dirPath) {
  const fileList = fs.readdirSync(dirPath);

  const validFileList = fileList.filter(
    (fileName) =>
      validFiles.filter((pattern) => fileName.match(pattern)).length > 0
  );

  return validFileList;
}

export default {
  saveGameFolder,

  saveFile,
  listAllValidFiles,
  getContent,
};