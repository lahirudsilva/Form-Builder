import {Checkbox, FormControlLabel} from "@mui/material";

type CheckboxFieldProps = {
    label: string;
    value: string;
    onChange: (checked: string) => void;
}

export const CheckboxField = ({ label, value, onChange }: CheckboxFieldProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked ? "1" : "0");
    };

    return (
        <FormControlLabel
            control={<Checkbox checked={value === "1"} onChange={handleChange} />}
            label={label}
        />
    );
};