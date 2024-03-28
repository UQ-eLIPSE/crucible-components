import { questions } from "./question-data.js";
import fs from "fs/promises";
import path from "path";

// Run this script and check logs/broken-links-logs.csv for broken links

const STATUS_SUCCESS = 200;
const LOGS_PATH = "../logs/broken-links-logs.csv";

// The input param is the link to be validated on.
export const validateURLResponse = async (input) => {
  try {
    const response = await fetch(input);

    const status = response.status;

    return status === STATUS_SUCCESS;
  } catch (error) {
    console.error(
      `An error occured while accessing "${input}". \nError: ${error}`,
    );
    return false;
  }
};

const validateQuizLink = async (linkList) => {
  console.info("validating links...", linkList.length);
  const badLinks = [];

  await Promise.all(
    linkList.map(async ({ link }, idx) => {
      const result = await validateURLResponse(link);
      if (!result) {
        console.error("Found invalid link:", link, "at index", idx);
        badLinks.push({ link });
      }
    }),
  );
  return badLinks;
};

async function logError(errorLog, message) {
  await fs.appendFile(errorLog, message + "\n");
}

// If length are too much, can use the trialTimes parameter
// i.e. retryValidation(badLinks, length / 10)
const retryValidation = async (badLinks, trialTimes = 3) => {
  let n = 0;
  while (n <= trialTimes) {
    console.log("Retrying...", ++n);
    console.log("Number of badlinks:", badLinks.length);
    if (badLinks.length !== 0) {
      badLinks = await validateQuizLink(badLinks);
    } else {
      break;
    }
  }
  return badLinks;
};

async function main() {
  let badLinks = await validateQuizLink(questions);

  badLinks = await retryValidation(badLinks);

  const resourcesLinksLogs = path.resolve(LOGS_PATH);
  await fs.writeFile(resourcesLinksLogs, "Link\n"); // header
  badLinks.forEach(async ({ link }) => {
    await logError(resourcesLinksLogs, `${link}`);
  });
}
main();
