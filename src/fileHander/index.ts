import fs from "fs";
import path from "path";

import savHandler from "../savHandler";

const saveGameFolder = "Saved/SaveGames";

const validFiles = [
  /[0-9]*-QuestData\.(sav|json)/,
  /[0-9]*-AccountQuests\.(sav|json)/,
  /[0-9]*-CharacterData\.(sav|json)/,
  /[0-9]*-AccountWide\.(sav|json)/,
  /[0-9]*-FortInventory\.(sav|json)/,
  /[0-9]*-FortStash\.(sav|json)/,
  /[0-9]*-SharedStash-[0-9]\.(sav|json)/,
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

function getFromStaticContent(dirPath, assetsFile): string {
  const fileList = fs.readdirSync(dirPath);

  const validFileList = fileList.filter((fileName) =>
    fileName.match(/[0-9]*-StaticContent\.sav/)
  );

  if (validFileList.length === 0) {
    throw new Error("no staticContent file");
  }

  const buffer = fs.readFileSync(path.join(dirPath, validFileList[0]));

  return savHandler.toStringifiedAsset(buffer, assetsFile);
}

export default {
  saveGameFolder,

  saveFile,
  listAllValidFiles,
  getContent,
  getFromStaticContent,
};
