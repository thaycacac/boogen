/**
 * @public
 * @description Returns a css if and ONLY if condition is true.
 * @param {boolean} conditions
 * @param {string} returnTrue
 * @returns {*}
 */
export function ifThen(conditions: any, returnTrue: any) {
  return ifElse(conditions, returnTrue, '')
}

/**
 * @public
 * @description Returns a different css depending on condition value.
 * @param {boolean} conditions
 * @param {string} returnTrue
 * @param {string} returnFalse
 * @returns {*}
 */
export function ifElse(conditions: any, returnTrue: any, returnFalse: any) {
  return conditions ? returnTrue : returnFalse
}

export default {
  ifThen,
  ifElse,
}
