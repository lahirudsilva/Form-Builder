import { ChangeEvent, useState } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { FieldType } from "../../store/form";
import { validateFieldValue } from "../../utils/Validation";
import { useSelector } from "react-redux";
import { RootState } from "../../store/config";

type InputFieldProps = Omit<TextFieldProps, "onChange"> & {
  label: string;
  value: string;
  onChange: (value: string) => void;
  fieldType: FieldType; // Add the fieldType prop
  selectedValidationRules?: any;
};

/**
 * The InputField component handles text input with type and dynamic validation errors.
 * It displays the input field and validates the input value based on selected rules.
 * Validation errors are shown as a list of bullet points below the input field.
 **/
export const InputField = ({
  label,
  value,
  onChange,
  fieldType,
  selectedValidationRules,
  ...rest
}: InputFieldProps) => {
  // State to store validation errors
  const [errors, setErrors] = useState<string[]>([]);
  // Get the Redux store state if needed
  const storeState = useSelector((state: RootState) => state); // Get Redux store state if needed

  // Handler for input value change
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
      setErrors([]); // Clear the error when user starts typing
    }
  };

  // Handler for input onBlur event (when input loses focus)
  const handleBlur = () => {
    // Validate the input value based on selected validation rules
    const validationErrors: any = validateFieldValue(
      fieldType,
      value,
      selectedValidationRules, // Pass selected validation rules
      storeState
    );

    setErrors(validationErrors); // Update the errors state with validation results
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", position: "relative" }}
    >
      {/* Input field */}
      <TextField
        label={label}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        variant="outlined"
        fullWidth
        margin="normal"
        {...rest}
      />
      {/* Display error messages */}
      {errors.length > 0 && (
        <div
          style={{
            color: "red",
            fontSize: "12px",
            position: "absolute",
            top: "100%",
            left: 10,
          }}
        >
          <ul style={{ listStyleType: "disc", paddingLeft: "15px" }}>
            {errors.map((errorMessage, index) => (
              <li key={index}>{errorMessage}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
