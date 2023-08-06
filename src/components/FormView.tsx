import {RootState} from "../store/config.ts";
import {useDispatch, useSelector} from "react-redux";
import {FieldType, setValue} from "../store/form.ts";
import {InputField} from "./fields/InputField.tsx";
import {CheckboxField} from "./fields/CheckboxField.tsx";
import {DateField} from "./fields/DateField.tsx";
import {Grid, Typography} from "@mui/material";

export const FormView = () => {
    const {fields} = useSelector((state: RootState) => state.form)
    const dispatch = useDispatch()

    const renderFields = () => {
        const renderedFields = [];
        for (const key in fields) {
            const field = fields[key];
            const label = field.label;
            const onChange = (value: string) => dispatch(setValue({key, value}))
            const value = field.value;

            switch (field.type) {
                case FieldType.Number:
                case FieldType.String:
                    renderedFields.push(
                        <Grid item xs={12} key={key}>
                            <InputField label={label} onChange={onChange} value={value}/>
                        </Grid>
                    );
                    break;
                case FieldType.Boolean:
                    renderedFields.push(
                        <Grid item xs={12} key={key}>
                            <CheckboxField label={label} onChange={onChange} value={value}/>
                        </Grid>
                    );
                    break;
                case FieldType.Date:
                    renderedFields.push(
                        <Grid item xs={12} key={key}>
                            <DateField label={label} onChange={onChange} value={value}/>
                        </Grid>
                    );
            }
        }

        return renderedFields;
    };

    return (
        <Grid container spacing={2} sx={{width: 300, margin: "auto"}}>
            <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>
                    Form Preview
                </Typography>
            </Grid>
            {renderFields()}
        </Grid>
    );
}