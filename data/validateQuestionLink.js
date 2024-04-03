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

/**
 * Sometimes multiple retries in validation of links is required since there
 * are too many links. This retries all the bad ones depending on the trialTimes
 * provided.
 *
 * If length are too long, can use the trialTimes parameter
 * i.e. retryValidation(badLinks, badLinks.length / 10)
 */
const retryValidation = async (badLinks, trialTimes = 3) => {
  if (!badLinks.length) return console.info("No need to retry validation");

  let n = 0;
  while (n <= trialTimes && badLinks.length) {
    console.info("Retrying...", ++n);
    console.info("Testing number of badlinks:", badLinks.length);
    badLinks = await validateQuizLink(badLinks);
  }

  return badLinks;
};

async function main() {
  let badLinks = await validateQuizLink(questions);

  badLinks = await retryValidation(badLinks);

  const resourcesLinksLogs = path.resolve(LOGS_PATH);
  await fs.writeFile(resourcesLinksLogs, "Link\n"); // header
  if (!badLinks) return console.info("No bad links. Done.");
  badLinks.forEach(async ({ link }) => {
    await logError(resourcesLinksLogs, `${link}`);
  });
}

main();
