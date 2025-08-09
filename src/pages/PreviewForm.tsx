import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import FieldRenderer from '../components/FieldRenderer';
import { evaluateFormula } from '../utils/derive';

export default function PreviewForm() {
  const params = useParams();
  const forms = useSelector((s: RootState) => s.forms.forms);
  const builderFields = useSelector((s: RootState) => s.builder.fields);

  const formToPreview = params.formId ? forms.find((f) => f.id === params.formId) : null;
  const fields = formToPreview ? formToPreview.fields : builderFields;

  const { register, handleSubmit, watch, setValue, formState } = useForm({ mode: 'onBlur' });

  useEffect(() => {
    // set defaults
    fields.forEach((f) => {
      if (f.defaultValue !== undefined) setValue(f.id, f.defaultValue);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields]);

  // Watch everything
  const watched = watch();

  // Compute derived fields whenever parents change
  useEffect(() => {
    fields.forEach((f) => {
      if (f.derived) {
        // collect parent values
        const values: Record<string, any> = {};
        f.derived.parentIds.forEach((pid) => (values[pid] = watched[pid]));
        const newVal = evaluateFormula(f.derived.formula, values);
        setValue(f.id, newVal);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(watched)]);

  function buildRegisterRules(f: any) {
    const rules: any = {};
    if (f.required) rules.required = 'This field is required';
    if (f.validation?.minLength) rules.minLength = { value: f.validation.minLength, message: `Min ${f.validation.minLength}` };
    if (f.validation?.maxLength) rules.maxLength = { value: f.validation.maxLength, message: `Max ${f.validation.maxLength}` };
    if (f.validation?.email) rules.pattern = { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' };
    if (f.validation?.password) {
      rules.validate = (val: string) => {
        const min = f.validation.password.minLength ?? 8;
        if (!val || val.length < min) return `Minimum ${min} characters`;
        if (f.validation.password.requireNumber && !/\d/.test(val)) return 'Password must contain a number';
        return true;
      };
    }
    return rules;
  }

  function onSubmit(data: any) {
    // Preview should not persist values - just show
    alert('Form is valid! Submitted data will not be saved. Check console.');
    console.log('Submitted:', data);
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" mb={2}>Preview</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {fields.map((f) => (
            <Box key={f.id}>
              <FieldRenderer
                field={f}
                register={(name: string) => register(name, buildRegisterRules(f))}
                value={watch(f.id)}
                error={formState.errors?.[f.id]?.message as string | undefined}
              />
            </Box>
          ))}

          <Box>
            <Button type="submit" variant="contained">Submit</Button>
          </Box>
        </Stack>
      </form>
    </Paper>
  );
}