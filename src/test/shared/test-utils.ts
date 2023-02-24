/**
 * eSub (Error Subscriber)
 *
 * Check if the error object exists, print console error log.
 * @param e Error object
 * @returns void
 */
export const eSub = (e: Error) => (e ? console.error(e) : undefined);
