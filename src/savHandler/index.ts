import fs from "fs";

import appRoot from "app-root-path";

function getStartindex(fileAsBuffer) {
  const jsonType = fileAsBuffer.indexOf("JsonString", 0, "utf-8");
  return fileAsBuffer.indexOf("{", jsonType, "utf-8");
}

function calculateJumpToEnd(buffer, start) {
  var hex = buffer
    .slice(start, start + 3)
    .toString("hex")
    .match(/.{1,2}/g)
    .reverse()
    .join("");
  return parseInt(hex, 16);
}

function getEndIndex(fileAsBuffer) {
  const indexOfFirstBracket = getStartindex(fileAsBuffer);
  const jumpToEnd = calculateJumpToEnd(fileAsBuffer, indexOfFirstBracket - 4);

  return indexOfFirstBracket + jumpToEnd - 1;
}

function toStringifiedJson(buffer: Buffer): string {
  const indexOfFirstBracket = getStartindex(buffer);
  const indexOfLastBracket = getEndIndex(buffer);

  const content = buffer
    .slice(indexOfFirstBracket, indexOfLastBracket)
    .toString("utf-8");
  return content;
}

function toBuffer(stringifiedJson: string): Buffer {
  const minifiedContent = JSON.stringify(JSON.parse(stringifiedJson));

  const fileAsBuffer = fs.readFileSync(`${appRoot.path}/assets/1mb.sav`);

  const indexOfFirstBracket = getStartindex(fileAsBuffer);
  const indexOfLastBracket = getEndIndex(fileAsBuffer);

  if (minifiedContent.length > indexOfLastBracket - indexOfFirstBracket) {
    throw new Error("Content too large");
  }

  const paddedContent =
    minifiedContent
      .slice(0, -1)
      .padEnd(indexOfLastBracket - indexOfFirstBracket - 1) +
    minifiedContent[minifiedContent.length - 1];

  for (
    let index = 0;
    index <= indexOfLastBracket - indexOfFirstBracket;
    index++
  ) {
    fileAsBuffer[indexOfFirstBracket + index] = paddedContent.charCodeAt(index);
  }

  return fileAsBuffer;
}

export default {
  toStringifiedJson,
  toBuffer,
};
