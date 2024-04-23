import { MCQOptions, MCQuestion } from "@/types/MCQ";

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

function isMCQOptions(obj: unknown): obj is MCQOptions {
  return (
    validate.isObject(obj) &&
    validate.isString(obj.optionValue) &&
    (obj.optionCorrect === undefined || typeof obj.optionCorrect === "boolean")
  );
}

function isMCQuestion(obj: unknown): obj is MCQuestion {
  return (
    validate.isObject(obj) &&
    validate.isObject(obj._id) &&
    validate.isString(obj._id.$oid) &&
    validate.isString(obj.statement) &&
    validate.isObject(obj.tags) &&
    validate.isArray(obj.optionsList, isMCQOptions) &&
    typeof obj.link === "string"
  );
}

function isMCQuestionArray(obj: unknown): obj is MCQuestion[] {
  return validate.isArray(obj, isMCQuestion);
}

export default { isMCQuestion, isMCQuestionArray };
