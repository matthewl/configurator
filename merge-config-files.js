const fs = require("fs");
const _ = require("lodash");

// Generate PreProd config
const rootConfig = JSON.parse(fs.readFileSync("production.json", "utf-8"));
const preProdOverrides = JSON.parse(fs.readFileSync("preprod-overrides.json", "utf-8"));

// Deep merge JSON files
const mergedPreProdConfig = _.merge({}, rootConfig, preProdOverrides);

// Save the merged JSON
fs.writeFileSync("preprod.json", JSON.stringify(mergedPreProdConfig, null, 2));

// Generate QA config
const preProdConfig = JSON.parse(fs.readFileSync("preprod.json", "utf-8"));
const qaOverrides = JSON.parse(fs.readFileSync("qa-overrides.json", "utf-8"));

// Deep merge JSON files
const mergedQaConfig = _.merge({}, preProdConfig, qaOverrides);

// Save the merged JSON
fs.writeFileSync("qa.json", JSON.stringify(mergedQaConfig, null, 2));

console.log("JSON files merged successfully!");
