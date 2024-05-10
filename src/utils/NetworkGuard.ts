import { DataMCQOptions, DataMCQuestion, DataTags } from "@/types/DataMCQ";

/**
 * A helper module function that validates the structure of primitives and objects
 */
const validate = (() => {
  const isString = (str: unknown): str is string => typeof str === "string";

  const isObject = (obj: unknown): obj is Record<string, unknown> => {
    return typeof obj === "object" && obj !== null;
  };

  const isBoolean = (bool: unknown): bool is boolean =>
    typeof bool === "boolean";

  const isArray = <T>(
    arr: unknown,
    check: (item: unknown) => item is T,
  ): arr is T[] => {
    return Array.isArray(arr) && arr.every(check);
  };

  const isNumber = (num: unknown): num is number => {
    return typeof num === "number";
  };

  const isFunction = (func: unknown): func is Function => {
    return typeof func === "function";
  };

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
 * Validates the tags for a question
 * Three types of tags:
 * 1. Taxonomy: (i.e. Course: VETHUB2011)
 * 2. Search tags: (i.e. Animal_Being) NO SPACES
 * TODO: Decide on the format of the directives and its purpose
 * 3. Directives: (i.e. !!EXCLUDE!!)
 * @param tag string to validate
 * @returns {boolean}
 */
function isTag(tag: string): boolean {
  const isTaxonomy = tag.includes(":") && tag.split(":").length === 2;
  const isSearchTag = !tag.includes(":") && tag.split(" ").length === 1;
  return isTaxonomy || isSearchTag;
}

function isTags(arr: unknown): arr is DataTags {
  return validate.isArray(arr, validate.isString) && arr.some(isTag);
}

function isAllTags(arr: unknown): boolean {
  return validate.isArray(arr, validate.isString) && arr.every(isTag);
}

function isMCQOptions(obj: unknown): obj is DataMCQOptions {
  return (
    validate.isObject(obj) &&
    validate.isString(obj.optionValue) &&
    (obj.optionCorrect === undefined || validate.isBoolean(obj.optionCorrect))
  );
}

function isMCQuestion(obj: unknown): obj is DataMCQuestion {
  return (
    validate.isObject(obj) &&
    validate.isObject(obj._id) &&
    validate.isString(obj._id.$oid) &&
    validate.isString(obj.statement) &&
    isTags(obj.tags) &&
    validate.isArray(obj.optionsList, isMCQOptions) &&
    validate.isString(obj.link)
  );
}

function isMCQuestionArray(obj: unknown): obj is DataMCQuestion[] {
  return validate.isArray(obj, isMCQuestion);
}

export default {
  isMCQuestion,
  isMCQuestionArray,
  isAllTags,
  isTags,
  isTag,
  validate,
};
