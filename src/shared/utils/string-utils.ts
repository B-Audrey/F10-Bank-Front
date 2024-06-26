export const isNotTooLong = (str: string, maxLength: number): boolean => {
  return str.length <= maxLength;
}

export const isNotEmpty = (str: string): boolean => {
  return str.length > 0;
}

export const hasNoSpecialChars = (str: string): boolean => {
  return /^[a-zA-ZÉÈ0-9@.\-'éèç\s]*$/.test(str);
}

export const hasNotOnlySpaces = (str: string): boolean => {
  return str.trim().length > 0;
}
