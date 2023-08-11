import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Enum to represent possible field types
export enum FieldType {
  Number = "number",
  String = "string",
  Date = "date",
  Boolean = "boolean",
}

// Field object structure
type Field = {
  key: string;
  type: FieldType;
  label: string;
  value: string;
  validation: string | null;
  enabledValidationRules: string[]; // List of enabled validation rules for the field
};

// Form state structure
export interface FormState {
  fields: { [key: string]: Field };
}

// Initial state for the form
const initialState: FormState = {
  fields: {},
};

// Create a Redux slice for form-related actions and reducers
export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    // Action to add a new field to the form
    addField: (
      state: FormState,
      action: PayloadAction<{
        key: string;
        type: FieldType;
        label: string;
        enabledValidationRules: Array<string>;
      }>
    ) => {
      const { key, type, label, enabledValidationRules } = action.payload;

      // Initialize the field object with provided properties
      state.fields[key] = {
        key,
        type,
        label,
        value: "",
        validation: null, // Add the validation property
        enabledValidationRules: enabledValidationRules,
      };
    },
    // Action to set a field's value
    setValue: (
      state,
      action: PayloadAction<{ key: string; value: string }>
    ) => {
      const { key, value } = action.payload;
      state.fields[key].value = value;
    },
    // Action to set a field's validation message
    setValidation: (
      state,
      action: PayloadAction<{ key: string; validation: string | null }>
    ) => {
      const { key, validation } = action.payload;
      state.fields[key].validation = validation;
    },
  },
});

export const { addField, setValue, setValidation } = formSlice.actions;
export const formReducer = formSlice.reducer;
