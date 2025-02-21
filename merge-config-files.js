const fs = require("fs");
const _ = require("lodash");

try {
  // Generate PreProd config
  const rootConfig = JSON.parse(fs.readFileSync("production.json", "utf-8"));
  const preProdOverrides = JSON.parse(fs.readFileSync("preprod-overrides.json", "utf-8"));

  // Deep merge JSON files
  const mergedPreProdConfig = _.merge({}, rootConfig, preProdOverrides);

  // Save the merged JSON
  fs.writeFileSync("preprod.json", JSON.stringify(mergedPreProdConfig, null, 2));
  console.log("preprod.json generated successfully!");

  // Generate QA config
  const preProdConfig = JSON.parse(fs.readFileSync("preprod.json", "utf-8"));
  const qaOverrides = JSON.parse(fs.readFileSync("qa-overrides.json", "utf-8"));

  console.log("PreProd Config:", preProdConfig);
  console.log("QA Overrides:", qaOverrides);

  // Deep merge JSON files
  const mergedQaConfig = _.merge({}, preProdConfig, qaOverrides);

  console.log("QA Config:", mergedQaConfig);

  // Save the merged JSON
  fs.writeFileSync("qa.json", JSON.stringify(mergedQaConfig, null, 2));
  console.log("qa.json generated successfully!");

  // Verify the changes
  const writtenQaConfig = JSON.parse(fs.readFileSync("qa.json", "utf-8"));
  if (_.isEqual(mergedQaConfig, writtenQaConfig)) {
    console.log("qa.json has been updated correctly!");
  } else {
    console.log("qa.json update verification failed!");
  }

} catch (error) {
  console.error("An error occurred:", error);
}
