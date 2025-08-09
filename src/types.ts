export type FieldType =
  | 'text'
  | 'number'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'date';

export interface ValidationRule {
  notEmpty?: boolean; // synonymous with required
  minLength?: number | null;
  maxLength?: number | null;
  email?: boolean;
  password?: {
    minLength?: number;
    requireNumber?: boolean;
  } | null;
}

export interface DerivedConfig {
  parentIds: string[]; // ids of parent fields
  formula: string; // JS-like expression using {{fieldId}} placeholders. Example: "Number({{a}}) + Number({{b}})"
}

export interface FieldConfig {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  defaultValue?: any;
  options?: string[]; // for select/radio/checkbox
  validation?: ValidationRule | null;
  derived?: DerivedConfig | null;
}

export interface FormSchema {
  id: string;
  name: string;
  createdAt: string; // ISO
  fields: FieldConfig[];
}
