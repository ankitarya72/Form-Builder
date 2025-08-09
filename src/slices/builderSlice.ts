import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FieldConfig, FieldType } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface BuilderState {
  fields: FieldConfig[];
}

const initialState: BuilderState = { fields: [] };

const defaultFieldFor = (type: FieldType): FieldConfig => ({
  id: uuidv4(),
  type,
  label: `${type.charAt(0).toUpperCase() + type.slice(1)} field`,
  required: false,
  defaultValue: type === 'checkbox' ? [] : '',
  options: type === 'select' || type === 'radio' || type === 'checkbox' ? ['Option 1', 'Option 2'] : undefined,
  validation: null,
  derived: null,
});

const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    addField(state, action: PayloadAction<{ type: FieldType }>) {
      state.fields.push(defaultFieldFor(action.payload.type));
    },
    updateField(state, action: PayloadAction<{ id: string; changes: Partial<FieldConfig> }>) {
      const { id, changes } = action.payload;
      const idx = state.fields.findIndex((f) => f.id === id);
      if (idx >= 0) state.fields[idx] = { ...state.fields[idx], ...changes };
    },
    deleteField(state, action: PayloadAction<string>) {
      state.fields = state.fields.filter((f) => f.id !== action.payload);
    },
    moveFieldUp(state, action: PayloadAction<string>) {
      const idx = state.fields.findIndex((f) => f.id === action.payload);
      if (idx > 0) {
        const tmp = state.fields[idx - 1];
        state.fields[idx - 1] = state.fields[idx];
        state.fields[idx] = tmp;
      }
    },
    moveFieldDown(state, action: PayloadAction<string>) {
      const idx = state.fields.findIndex((f) => f.id === action.payload);
      if (idx >= 0 && idx < state.fields.length - 1) {
        const tmp = state.fields[idx + 1];
        state.fields[idx + 1] = state.fields[idx];
        state.fields[idx] = tmp;
      }
    },
    setFields(state, action: PayloadAction<FieldConfig[]>) {
      state.fields = action.payload;
    },
    resetBuilder(state) {
      state.fields = [];
    },
  },
});

export const {
  addField,
  updateField,
  deleteField,
  moveFieldUp,
  moveFieldDown,
  setFields,
  resetBuilder,
} = builderSlice.actions;

export default builderSlice.reducer;
