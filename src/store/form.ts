import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
export enum FieldType {
    Number = 'number',
    String = 'string',
    Date = 'date',
    Boolean = 'boolean',
}

type Field = {
    key: string,
    type: FieldType,
    label: string,
    value: string,
}

export interface FormState {
    fields: { [key: string]: Field }
}

const initialState: FormState = {
    fields: {},
}

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        addField: (state: FormState, action: PayloadAction<{ key: string, type: FieldType, label: string }>) => {
            const { key, type, label } = action.payload

            state.fields[key] = {
                key,
                type,
                label,
                value: ''
            }
        },
        setValue: (state, action: PayloadAction<{ key: string, value: string }>) => {
            const { key, value } = action.payload
            const field = state.fields[key];

            field.value = value;
        }
    },
})

export const { addField, setValue } = formSlice.actions
export const formReducer = formSlice.reducer