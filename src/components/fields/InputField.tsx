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
};

export const InputField = ({
  label,
  value,
  onChange,
  fieldType,
  ...rest
}: InputFieldProps) => {
  const [error, setError] = useState<string | null>(null); // State to manage error message
  const storeState = useSelector((state: RootState) => state); // Get Redux store state if needed
  const [valid, setValid] = useState<boolean>(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
      setError(null); // Clear the error when user starts typing
    }
  };

  const handleBlur = () => {
    const validationError = validateFieldValue(fieldType, value, storeState);
    setError(validationError);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", position: "relative" }}
    >
      <TextField
        label={label}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur} // Trigger validation on blur
        variant="outlined"
        fullWidth
        margin="normal"
        {...rest}
      />
      {error && (
        <p
          style={{
            color: "red",
            fontSize: "12px",
            position: "absolute",
            bottom: -25,
            left: 10,
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
};
