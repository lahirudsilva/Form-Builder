import { FieldType } from "../store/form.ts";
import { RootState } from "../store/config.ts";

export const validateFieldValue = (
  fieldType: FieldType,
  value: string,
  storeState: RootState
): string | null => {
  switch (fieldType) {
    case FieldType.Number:
      if (!/^\d+$/.test(value)) {
        return "Value must be a valid number";
      }
      break;
    case FieldType.String:
      // Add your string-specific validation logic here
      break;
    case FieldType.Date:
      // Add your date-specific validation logic here
      break;
    case FieldType.Boolean:
      // Add your boolean-specific validation logic here
      break;
    default:
      throw new Error(`Unsupported field type: ${fieldType}`);
  }

  return null; // If no validation error
};
