import { DataMCQOptions, DataMCQuestion } from "@/types/DataMCQ";

/**
 * A helper module function that validates the structure of primitives and objects
 */
const validate = (() => {
  const isString = (str: string): boolean => typeof str === "string";

  const isObject = (obj: object): obj is Record<string, any> =>
    typeof obj === "object" && obj !== null;

  const isBoolean = (bool: boolean): boolean => typeof bool === "boolean";

  const isArray = <T>(arr: T[], check: (item: T) => boolean): arr is T[] =>
    Array.isArray(arr) && arr.every(check);

  const isNumber = (num: number): boolean => typeof num === "number";

  const isFunction = (func: Function): boolean => typeof func === "function";

  return {
    isString,
    isObject,
    isBoolean,
    isArray,
    isNumber,
    isFunction,
  };
})();

/**
 * Validates tags to ensure they meet the specified formats.
 */
function isTag(tag: string): boolean {
  const isTaxonomy = tag.includes(":") && tag.split(":").length === 2;
  const isSearchTag = !tag.includes(":") && !tag.includes(" ");
  return isTaxonomy || isSearchTag;
}

function validateTags(arr: string[], checkAll: boolean = false): boolean {
  if (!validate.isArray(arr, validate.isString)) {
    return false;
  }
  return checkAll ? arr.every(isTag) : arr.some(isTag);
}

function isMCQOptions(obj: DataMCQOptions): boolean {
  return (
    validate.isObject(obj) &&
    validate.isString(obj.optionValue) &&
    (obj.optionCorrect === undefined || validate.isBoolean(obj.optionCorrect))
  );
}

function isMCQuestion(obj: DataMCQuestion): boolean {
  return (
    validate.isObject(obj) &&
    validate.isObject(obj._id) && // Assuming _id is an object with $oid property
    validate.isString(obj._id.$oid) &&
    validate.isString(obj.statement) &&
    validateTags(obj.tags) && // Modified to ensure tags are always checked
    validate.isArray(obj.optionsList, isMCQOptions) &&
    validate.isString(obj.link)
  );
}

function isMCQuestionArray(obj: DataMCQuestion[]): boolean {
  return validate.isArray(obj, isMCQuestion);
}

export interface InvalidDataQsLogs {
  invalidTags: number;
  noTags: number;
  invalidQs: number;
  totalTags: number;
}

export default {
  isMCQuestion,
  isMCQuestionArray,
  validateTags,
  isTag,
};
