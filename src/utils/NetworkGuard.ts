import { DataMCQOptions, DataMCQuestion } from "@/types/DataMCQ";

/**
 * A helper module function that validates the structure of primitives and objects
 */
const validate = (() => {
  const isString = (str: any): str is string => typeof str === "string";

  const isObject = (obj: any): obj is Record<string, any> =>
    typeof obj === "object" && obj !== null;

  const isBoolean = (bool: any): bool is boolean => typeof bool === "boolean";

  const isArray = <T>(arr: any, check: (item: any) => item is T): arr is T[] =>
    Array.isArray(arr) && arr.every(check);

  const isNumber = (num: any): num is number => typeof num === "number";

  const isFunction = (func: any): func is Function =>
    typeof func === "function";

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

function validateTags(arr: any, checkAll: boolean = false): boolean {
  if (!validate.isArray(arr, validate.isString)) {
    return false;
  }

  return checkAll ? arr.every(isTag) : arr.some(isTag);
}

function isMCQOptions(obj: any): obj is DataMCQOptions {
  return (
    validate.isObject(obj) &&
    validate.isString(obj.optionValue) &&
    (obj.optionCorrect === undefined || validate.isBoolean(obj.optionCorrect))
  );
}

function isMCQuestion(obj: any): obj is DataMCQuestion {
  return (
    validate.isObject(obj) &&
    validate.isObject(obj._id) &&
    validate.isString(obj._id.$oid) &&
    validate.isString(obj.statement) &&
    validateTags(obj.tags, false) &&
    validate.isArray(obj.optionsList, isMCQOptions) &&
    validate.isString(obj.link)
  );
}

function isMCQuestionArray(obj: any): obj is DataMCQuestion[] {
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
