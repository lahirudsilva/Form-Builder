import {Dropdown} from "./fields/Dropdown.tsx";
import {useState} from "react";
import {addField, FieldType} from "../store/form.ts";
import {Button, Grid, Typography} from "@mui/material";
import {InputField} from "./fields/InputField.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/config.ts";

export const FormBuilder = () => {
    const [currentType, setCurrentType] = useState("");
    const [currentKey, setCurrentKey] = useState("")
    const [currentLabel, setCurrentLabel] = useState("")
    const dispatch = useDispatch();
    const {fields} = useSelector((state: RootState) => state.form)

    const handleAddingField = () => {
        if (fields[currentKey] !== undefined) {
            alert("Key already exists")
            return
        }

        if (currentType && currentKey && currentLabel) {
            dispatch(addField({key: currentKey, type: currentType as FieldType, label: currentLabel}))
        }
    }

    return (
        <Grid container spacing={2} sx={{width: 300, margin: "auto"}}>
            <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>
                    Form Builder
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Dropdown label="Choose a field type"
                          value={currentType}
                          onChange={(type) => setCurrentType(type)}
                          options={{
                              "Number": FieldType.Number,
                              "String": FieldType.String,
                              "Date": FieldType.Date,
                              "Boolean": FieldType.Boolean,
                          }}/>
            </Grid>
            <Grid item xs={12}>
                <InputField onChange={(value) => setCurrentKey(value)} label="Key" value={currentKey}/>
            </Grid>
            <Grid item xs={12}>
                <InputField onChange={(value) => setCurrentLabel(value)} label="Label" value={currentLabel}/>
            </Grid>
            <Grid item xs={12}>

                <Button variant="contained" color="primary" onClick={handleAddingField}>
                    Add Field
                </Button>
            </Grid>
        </Grid>
    )
}