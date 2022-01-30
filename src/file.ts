import fs from "fs";
import path from "path";

import appRoot from "app-root-path";

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

function getStartindex(fileAsBuffer) {
  const jsonType = fileAsBuffer.indexOf("JsonString", 0, "utf-8");
  return fileAsBuffer.indexOf("{", jsonType, "utf-8");
}

function getEndIndex(fileAsBuffer) {
  var lastDataVersion = fileAsBuffer.indexOf("dataVersion", 0, "utf-8");
  while (
    fileAsBuffer.indexOf("dataVersion", lastDataVersion + 1, "utf-8") > -1
  ) {
    lastDataVersion = fileAsBuffer.indexOf(
      "dataVersion",
      lastDataVersion + 1,
      "utf-8"
    );
  }

  return fileAsBuffer.indexOf("}", lastDataVersion, "utf-8") + 1;
}

function saveFile(path, content) {
  const fileAsBuffer = fs.readFileSync(`${appRoot.path}/assets/1mb.sav`);

  const indexOfFirstBracket = getStartindex(fileAsBuffer);
  const indexOfLastBracket = getEndIndex(fileAsBuffer);

  if (typeof content === "object") {
    content = JSON.stringify(content);
  }

  if (content.length > indexOfLastBracket - indexOfFirstBracket) {
    throw new Error("Content too large");
  }

  const paddedContent =
    content.slice(0, -1).padEnd(indexOfLastBracket - indexOfFirstBracket - 1) +
    content[content.length - 1];

  for (
    let index = 0;
    index <= indexOfLastBracket - indexOfFirstBracket;
    index++
  ) {
    fileAsBuffer[indexOfFirstBracket + index] = paddedContent.charCodeAt(index);
  }

  fs.writeFileSync(path, fileAsBuffer);
}

function getContent(filePath) {
  const fileAsBuffer = fs.readFileSync(filePath);

  const indexOfFirstBracket = getStartindex(fileAsBuffer);
  const indexOfLastBracket = getEndIndex(fileAsBuffer);

  const content = fileAsBuffer
    .slice(indexOfFirstBracket, indexOfLastBracket)
    .toString("utf-8");
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
