import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';

type DropdownProps = {
    label: string;
    options: { [caption: string]: string }
    onChange: (selectedOption: string) => void;
    value?: string;
}

export const Dropdown = ({label, options, onChange, value}: DropdownProps) => {
    const handleChange = (event: SelectChangeEvent<string>) => {
        onChange(event.target.value);
    };

    const renderOptions = () => {
        const items = [];
        for (const caption in options) {
            const option = options[caption];
            items.push(<MenuItem key={caption} value={option}>{caption}</MenuItem>)
        }

        return items;
    }

    return (
        <FormControl fullWidth  sx={{ marginTop: "16px", marginBottom: "8px" }}>
            <InputLabel id={`dropdown-label-${label}`}>{label}</InputLabel>
            <Select
                labelId={`dropdown-label-${label}`}
                value={value}
                label={label}
                onChange={handleChange}
            >
                {renderOptions()}
            </Select>
        </FormControl>
    );
};