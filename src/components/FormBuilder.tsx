import { Dropdown } from "./fields/Dropdown.tsx";
import { useState } from "react";
import { addField, FieldType } from "../store/form.ts";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from "@mui/material";
import { InputField } from "./fields/InputField.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/config.ts";
import { validationRules } from "../utils/ValidationRules.ts";

export const FormBuilder = () => {
  const [currentType, setCurrentType] = useState("");
  const [currentKey, setCurrentKey] = useState("");
  const [currentLabel, setCurrentLabel] = useState("");
  const [enableDynamicValidation, setEnableDynamicValidation] = useState(false);
  const [selectedValidationRules, setSelectedValidationRules] = useState<
    string[]
  >([]);
  const dispatch = useDispatch();
  const { fields } = useSelector((state: RootState) => state.form);

  // Handles the action of adding a new field
  const handleAddingField = () => {
    if (fields[currentKey] !== undefined) {
      alert("Key already exists");
      return;
    }

    if (currentType && currentKey && currentLabel) {
      const fieldType = currentType as FieldType;

      dispatch(
        addField({
          key: currentKey,
          type: fieldType,
          label: currentLabel,
          enabledValidationRules: selectedValidationRules,
        })
      );
    }
  };

  // Handles changes in dynamic validation rule selections
  const handleValidationRuleChange = (ruleName: string, enabled: boolean) => {
    if (enabled) {
      setSelectedValidationRules((prevRules) => [...prevRules, ruleName]);
    } else {
      setSelectedValidationRules((prevRules) =>
        prevRules.filter((rule) => rule !== ruleName)
      );
    }
  };

  return (
    <Grid container spacing={2} sx={{ width: 300, margin: "auto" }}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Form Builder
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {/* Dropdown to select field type */}
        <Dropdown
          label="Choose a field type"
          value={currentType}
          onChange={(type) => setCurrentType(type)}
          options={{
            Number: FieldType.Number,
            String: FieldType.String,
            Date: FieldType.Date,
            Boolean: FieldType.Boolean,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        {/* Input field for key */}
        <InputField
          onChange={(value) => setCurrentKey(value)}
          label="Key"
          value={currentKey}
          fieldType={FieldType[currentType as keyof typeof FieldType]}
        />
      </Grid>
      <Grid item xs={12}>
        {/* Input field for label */}
        <InputField
          onChange={(value) => setCurrentLabel(value)}
          label="Label"
          value={currentLabel}
          fieldType={FieldType[currentType as keyof typeof FieldType]}
        />
      </Grid>
      <Grid item xs={12}>
        {/* Checkbox to enable dynamic validation */}
        <FormControlLabel
          control={
            <Checkbox
              checked={enableDynamicValidation}
              onChange={(event) =>
                setEnableDynamicValidation(event.target.checked)
              }
            />
          }
          label="Enable Dynamic Validation"
        />
      </Grid>
      {enableDynamicValidation && (
        <Grid item xs={12}>
          {/* Dynamic validation rule checkboxes */}
          <FormGroup>
            {Object.keys(validationRules).map((ruleName) => (
              <FormControlLabel
                key={ruleName}
                control={
                  <Checkbox
                    checked={selectedValidationRules.includes(ruleName)}
                    onChange={(event) =>
                      handleValidationRuleChange(ruleName, event.target.checked)
                    }
                  />
                }
                label={ruleName}
              />
            ))}
          </FormGroup>
        </Grid>
      )}
      <Grid item xs={12}>
        {/* Button to add the field */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddingField}
          disabled={!currentType || !currentKey || !currentLabel}
        >
          Add Field
        </Button>
      </Grid>
    </Grid>
  );
};
