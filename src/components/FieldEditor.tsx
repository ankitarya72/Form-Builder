import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import type { FieldConfig } from '../types';
import DerivedFieldEditor from './DerivedFieldEditor';

interface Props {
  field: FieldConfig | null;
  allFields: FieldConfig[];
  onSave: (id: string, changes: Partial<FieldConfig>) => void;
}

export default function FieldEditor({ field, allFields, onSave }: Props) {
  if (!field) return <Box>Please select a field to edit.</Box>;

  const set = (changes: Partial<FieldConfig>) => onSave(field.id, changes);

  return (
    <Box>
      <TextField label="Label" value={field.label} size="small" fullWidth onChange={(e) => set({ label: e.target.value })} sx={{ mb: 1 }} />
      <FormControlLabel control={<Switch checked={field.required} onChange={(e) => set({ required: e.target.checked })} />} label="Required" />

      <Box mt={1}>
        <TextField
          label="Default value"
          size="small"
          fullWidth
          value={field.defaultValue ?? ''}
          onChange={(e) => set({ defaultValue: e.target.value })}
          sx={{ mb: 1 }}
        />

        {(field.type === 'select' || field.type === 'radio' || field.type === 'checkbox') && (
          <Box>
            <Box component="div" mb={1}>Options (comma separated)</Box>
            <TextField
              size="small"
              fullWidth
              value={(field.options ?? []).join(',')}
              onChange={(e) => set({ options: e.target.value.split(',').map((s) => s.trim()) })}
            />
          </Box>
        )}

        {/* Validation */}
        <Box mt={2}>
          <Stack spacing={1}>
            <TextField
              label="Min length"
              size="small"
              type="number"
              value={field.validation?.minLength ?? ''}
              onChange={(e) => set({ validation: { ...(field.validation ?? {}), minLength: e.target.value ? Number(e.target.value) : undefined } })}
            />
            <TextField
              label="Max length"
              size="small"
              type="number"
              value={field.validation?.maxLength ?? ''}
              onChange={(e) => set({ validation: { ...(field.validation ?? {}), maxLength: e.target.value ? Number(e.target.value) : undefined } })}
            />
            <FormControlLabel control={<Switch checked={!!field.validation?.email} onChange={(e) => set({ validation: { ...(field.validation ?? {}), email: e.target.checked } })} />} label="Email format" />

            {/* Password rule editor */}
            {field.type === 'text' && (
              <Box>
                <FormControlLabel control={<Switch checked={!!field.validation?.password} onChange={(e) => set({ validation: { ...(field.validation ?? {}), password: e.target.checked ? { minLength: 8, requireNumber: true } : null } })} />} label="Custom password rule" />
                {field.validation?.password && (
                  <Stack direction="row" spacing={1} mt={1}>
                    <TextField
                      label="Min chars"
                      size="small"
                      type="number"
                      value={field.validation?.password?.minLength ?? 8}
                      onChange={(e) => set({ validation: { ...(field.validation ?? {}), password: { ...(field.validation?.password ?? {}), minLength: Number(e.target.value) } } })}
                    />
                    <FormControlLabel control={<Switch checked={!!field.validation?.password?.requireNumber} onChange={(e) => set({ validation: { ...(field.validation ?? {}), password: { ...(field.validation?.password ?? {}), requireNumber: e.target.checked } } })} />} label="Require number" />
                  </Stack>
                )}
              </Box>
            )}
          </Stack>
        </Box>
      </Box>

      <DerivedFieldEditor field={field} allFields={allFields} onChange={(c) => set(c)} />

      <Box mt={2}>
        <Button variant="contained" onClick={() => alert('Changes are saved automatically (through Save button on top).')}>Note</Button>
      </Box>
    </Box>
  );
}