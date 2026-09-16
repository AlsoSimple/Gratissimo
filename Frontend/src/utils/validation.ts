// regexes from https://ihateregex.io

// email regex
export function isEmail(value: string): boolean {
  return /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/.test(value);
}

// password regex
export function isStrongPassword(value: string): boolean {
  return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(value);
}

// phone regex
export function isPhone(value: string): boolean {
  return /^\d{8}$/.test(value);
}
