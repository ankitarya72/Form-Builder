import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormSchema } from '../types';
import { loadSavedForms, saveForms } from '../utils/localStorage';

interface FormsState {
  forms: FormSchema[];
}

const initialState: FormsState = {
  forms: loadSavedForms(),
};

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addForm(state, action: PayloadAction<FormSchema>) {
      state.forms.unshift(action.payload); // newest first
      saveForms(state.forms);
    },
    removeForm(state, action: PayloadAction<string>) {
      state.forms = state.forms.filter((f) => f.id !== action.payload);
      saveForms(state.forms);
    },
    setForms(state, action: PayloadAction<FormSchema[]>) {
      state.forms = action.payload;
      saveForms(state.forms);
    },
  },
});

export const { addForm, removeForm, setForms } = formsSlice.actions;
export default formsSlice.reducer;
