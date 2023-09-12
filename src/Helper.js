/**
 * Converts a Unix timestamp to a human-readable date and time string.
 *
 * @param {number} seconds - The Unix timestamp in seconds.
 * @return {string} The localized string representation of the date and time.
 */
export function UnixTimeStampToLocaleStr(seconds){
    return new Date(seconds * 1000).toLocaleString()
  }