#! /usr/bin/env node
const args = process.argv.slice(2);

if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
  console.log("Usage: addEmptyFile [fileNameWithExtension] [options]");
  console.log("Options:");
  console.log("  --help, -h   Display help");
  console.log(
    "  --location, -lc  Location of the file to be created (default: current directory)"
  );
  process.exit();
}

let fileLocation = process.cwd();
const fileLocationIndex = args.findIndex(
  (arg) => arg === "--location" || arg === "-lc"
);
if (fileLocationIndex !== -1 && fileLocationIndex < args.length - 1) {
  fileLocation = args[fileLocationIndex + 1];
}

const fileName = args[0];

import { writeFile } from "fs";
import { promisify } from "util";

const writeFileAsync = promisify(writeFile);

writeFileAsync(`${fileLocation}/${fileName}`, "", "utf8")
  .then(() => {
    console.log(`File ${fileName} created successfully`);
    process.exit();
  })
  .catch((err) => {
    console.log(`Error creating file ${fileName}`);
    console.log(err);
    process.exit();
  });
