import { FieldType } from "../store/form.ts";
import { RootState } from "../store/config.ts";
import { validationRules } from "./ValidationRules.ts";

/**
 * Validates a field value based on its type and enabled validation rules.
 **/

export const validateFieldValue = (
  fieldType: FieldType,
  value: string,
  enabledValidationRules: string[],
  storeState: RootState
): Array<string> => {
  let errors: string[] = [];

  // Validate based on field type
  switch (fieldType) {
    case FieldType.Number:
      if (!/^\d+$/.test(value)) {
        // return "Value must be a valid number";
        errors.push("Value must be a valid number");
      }
      break;
    case FieldType.String:
      // Apply additional validation rules
      for (const ruleName of enabledValidationRules) {
        const ruleFn = validationRules[ruleName];
        if (ruleFn) {
          const validationError = ruleFn(value);

          if (validationError) {
            errors.push(validationError);
          }
        }
      }
      break;
    case FieldType.Date:
      break;
    case FieldType.Boolean:
      break;
    default:
      throw new Error(`Unsupported field type: ${fieldType}`);
  }

  return errors; // If no validation error
};
