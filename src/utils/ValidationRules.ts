/**
 * Validation rules configuration.
 * Maps rule names to corresponding validation functions.
 */
export const validationRules: {
  [ruleName: string]: (value: string, ...args: any[]) => string | null;
} = {
  minLength: (value: string) =>
    value.length >= 5 ? null : `Value must be at least 5 characters long.`,
  startsWithCapital: (value: string) =>
    /^[A-Z]/.test(value) ? null : "Value must start with a capital letter.",
  emailFormat: (value: string) =>
    /\S+@\S+\.\S+/.test(value)
      ? null
      : "Value must be in a valid email format.",
  noSpecialCharacters: (value: string) =>
    /^[a-zA-Z0-9]*$/.test(value)
      ? null
      : "Value cannot contain special characters.",
};
