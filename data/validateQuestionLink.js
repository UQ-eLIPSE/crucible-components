import { questions } from "./question-data.js";
import fs from "fs/promises";
import path from "path";

const statusSuccess = 200;

// log file: create directory if it doesn't exist
const logsDirectory = "./logs"; // Directory to store logs
const logsPath = path.join(logsDirectory, "broken-links-logs.csv");
const ensureLogsDirectoryExists = async () => {
  try {
    await fs.access(logsDirectory);
  } catch (error) {
    // Logs directory doesn't exist, create it
    await fs.mkdir(logsDirectory);
  }
};

// The input param is the link to be validated on.
export const validateURLResponse = async (input) => {
  try {
    const response = await fetch(input);

    const status = response.status;

    return status === statusSuccess;
  } catch (error) {
    console.error(
      `An error occured while accessing "${input}". \nError: ${error}`,
    );
    return false;
  }
};

const validateQuizLink = async (
  linkList,
  concurrencyLimit = 10,
  waitResponse = 500,
) => {
  const badLinks = [];
  const queueLinks = [...linkList];

  const processLink = async (queueLinks) => {
    while (queueLinks.length > 0) {
      const { link, index } = queueLinks.shift();
      const result = await validateURLResponse(link);
      if (!result) {
        console.error("Found invalid link:", link, "at index", index);
        badLinks.push({ link });
      }
      await new Promise((resolve) => setTimeout(resolve, waitResponse));
    }
  };
  const workers = Array.from({ length: concurrencyLimit }, () =>
    processLink(queueLinks),
  );
  await Promise.all(workers);
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
  await ensureLogsDirectoryExists();

  let badLinks = await validateQuizLink(questions);

  badLinks = await retryValidation(badLinks);

  const resourcesLinksLogs = path.resolve(logsPath);
  await fs.writeFile(resourcesLinksLogs, "Link\n"); // header
  if (!badLinks) return console.info("No bad links. Done.");
  badLinks.forEach(async ({ link }) => {
    await logError(resourcesLinksLogs, `${link}`);
  });
}

main();
