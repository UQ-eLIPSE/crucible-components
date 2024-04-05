import * as fs from "fs";
import { promisify } from "util";
import { generateDummyData } from "./dummyQuestionData";

// this generates the static data found in the ./dummyQuestionData file and writes it as a JSON file
async function writeToFile() {
  const data = generateDummyData();
  const writeFile = promisify(fs.writeFile);
  await writeFile("dummy-question-data.json", JSON.stringify(data, null, 2));
  console.log("Data written to file");
}

writeToFile().catch(console.error);
