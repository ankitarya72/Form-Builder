import type { FieldConfig } from '../types';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

interface Props {
  field: FieldConfig;
  allFields: FieldConfig[];
  onChange: (changes: Partial<FieldConfig>) => void;
}

export default function DerivedFieldEditor({ field, allFields, onChange }: Props) {
  const derived = field.derived ?? { parentIds: [], formula: '' };

  return (
    <Box mt={2}>
      <FormControl fullWidth size="small" sx={{ mb: 1 }}>
        <InputLabel id="parent-select-label">Parent fields (select multiple)</InputLabel>
        <Select
          labelId="parent-select-label"
          multiple
          value={derived.parentIds}
          label="Parent fields (select multiple)"
          onChange={(e) => onChange({ derived: { ...derived, parentIds: e.target.value as string[] } })}
          renderValue={(selected) => (selected as string[]).map(id => allFields.find(f => f.id === id)?.label ?? id).join(', ')}
        >
          {allFields.map((af) => (
            <MenuItem key={af.id} value={af.id}>
              <FormControlLabel control={<Checkbox checked={derived.parentIds.includes(af.id)} />} label={af.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Formula"
        size="small"
        fullWidth
        helperText={'Use JS expression with placeholders like {{fieldId}}. Example: Number({{a}}) + Number({{b}}) or Math.floor((Date.now()-new Date({{dob}}))/(365.25*24*60*60*1000)) for age'}
        value={derived.formula}
        onChange={(e) => onChange({ derived: { ...derived, formula: e.target.value } })}
      />

      <Box mt={1}>
        <FormControlLabel
          control={<Checkbox checked={!!field.derived} onChange={(e) => onChange({ derived: e.target.checked ? derived : null })} />}
          label="Mark as Derived Field"
        />
      </Box>
    </Box>
  );
}