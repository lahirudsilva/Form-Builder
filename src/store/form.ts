import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export enum FieldType {
  Number = "number",
  String = "string",
  Date = "date",
  Boolean = "boolean",
}

type Field = {
  key: string;
  type: FieldType;
  label: string;
  value: string;
  validation: string | null;
};

export interface FormState {
  fields: { [key: string]: Field };
}

const initialState: FormState = {
  fields: {},
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addField: (
      state: FormState,
      action: PayloadAction<{ key: string; type: FieldType; label: string }>
    ) => {
      const { key, type, label } = action.payload;

      state.fields[key] = {
        key,
        type,
        label,
        value: "",
        validation: null, // Add the validation property
      };
    },
    setValue: (
      state,
      action: PayloadAction<{ key: string; value: string }>
    ) => {
      const { key, value } = action.payload;
      state.fields[key].value = value;
    },
    setValidation: (
      state,
      action: PayloadAction<{ key: string; validation: string | null }>
    ) => {
      const { key, validation } = action.payload;
      console.log(action.payload);
      state.fields[key].validation = validation;
    },
  },
});

export const { addField, setValue, setValidation } = formSlice.actions;
export const formReducer = formSlice.reducer;
