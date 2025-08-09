import type { FormSchema } from '../types';

const STORAGE_KEY = 'form-builder.forms.v1';

export function loadSavedForms(): FormSchema[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as FormSchema[];
  } catch (e) {
    console.error('Failed to parse saved forms', e);
    return [];
  }
}

export function saveForms(forms: FormSchema[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
  } catch (e) {
    console.error('Failed to save forms', e);
  }
}