const fs = require("fs");
const _ = require("lodash");

// Load JSON files
const rootData = JSON.parse(fs.readFileSync("production.json", "utf-8"));
const overrideData = JSON.parse(fs.readFileSync("preprod-overrides.json", "utf-8"));

// Deep merge JSON files
const mergedData = _.merge({}, rootData, overrideData);

// Save the merged JSON
fs.writeFileSync("preprod.json", JSON.stringify(mergedData, null, 2));

console.log("JSON files merged successfully!");
