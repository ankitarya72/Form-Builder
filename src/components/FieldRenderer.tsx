import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import type { FieldConfig } from '../types';

interface Props {
  field: FieldConfig;
  register: any; // from react-hook-form register
  value?: any;
  error?: string | undefined;
}

export default function FieldRenderer({ field, register, value, error }: Props) {
  const commonProps = {
    id: field.id,
    label: field.label,
    helperText: error,
    error: !!error,
    fullWidth: true,
    size: 'small' as const,
    defaultValue: field.defaultValue ?? '',
  };

  switch (field.type) {
    case 'text':
    case 'number':
    case 'date':
      return (
        <TextField
          {...commonProps}
          type={field.type === 'date' ? 'date' : field.type === 'number' ? 'number' : 'text'}
          InputLabelProps={{ shrink: !!value || !!field.defaultValue }}
          {...(register ? register(field.id) : {})}
        />
      );

    case 'textarea':
      return <TextField {...commonProps} multiline minRows={3} {...(register ? register(field.id) : {})} />;

    case 'select':
      return (
        <TextField select {...commonProps} {...(register ? register(field.id) : {})}>
          {(field.options ?? []).map((o) => (
            <MenuItem key={o} value={o}>
              {o}
            </MenuItem>
          ))}
        </TextField>
      );

    case 'radio':
      return (
        <div>
          <div style={{ marginBottom: 6 }}>{field.label}</div>
          <RadioGroup value={value} {...(register ? register(field.id) : {})}>
            {(field.options ?? []).map((o) => (
              <FormControlLabel key={o} value={o} control={<Radio />} label={o} />
            ))}
          </RadioGroup>
        </div>
      );

    case 'checkbox':
      return (
        <FormGroup>
          {(field.options ?? []).map((o) => (
            <FormControlLabel key={o} control={<Checkbox {...(register ? register(field.id) : {})} />} label={o} />
          ))}
        </FormGroup>
      );

    default:
      return null;
  }
}