import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { addField, updateField /* resetBuilder */ } from '../slices/builderSlice';
import { addForm } from '../slices/formsSlice';
import FieldList from '../components/FieldList';
import FieldEditor from '../components/FieldEditor';
import type { FieldConfig, FieldType } from '../types';
import { v4 as uuidv4 } from 'uuid';

export default function CreateForm() {
  const dispatch = useDispatch<AppDispatch>();
  const fields = useSelector((s: RootState) => s.builder.fields);

  const [selected, setSelected] = useState<FieldConfig | null>(null);
  const [saveOpen, setSaveOpen] = useState(false);
  const [formName, setFormName] = useState('');

  function handleAdd(type: FieldType) {
    dispatch(addField({ type }));
  }

  function handleSaveField(id: string, changes: Partial<FieldConfig>) {
    dispatch(updateField({ id, changes }));
    const updatedField = fields.find((x) => x.id === id);
    if (updatedField) {
      setSelected({ ...updatedField, ...changes });
    }
  }

  function confirmSave() {
    if (!formName.trim()) {
      alert('Please enter a form name');
      return;
    }

    const newForm = {
      id: uuidv4(),
      name: formName.trim(),
      createdAt: new Date().toISOString(),
      fields,
    };

    dispatch(addForm(newForm));
    setSaveOpen(false);
    setFormName('');
    // dispatch(resetBuilder()); // Uncomment if needed
    alert('Form saved! Go to My Forms to view it.');
  }

  return (
    <Grid container spacing={2}>
      {/* Left panel: Add fields & Save */}
      <Grid item xs={12} md={3}>
        <Paper sx={{ p: 2 }}>
          <Stack spacing={1}>
            {(['text', 'number', 'textarea', 'select', 'radio', 'checkbox', 'date'] as FieldType[]).map((t) => (
              <Button key={t} variant="contained" onClick={() => handleAdd(t)}>
                Add {t.charAt(0).toUpperCase() + t.slice(1)}
              </Button>
            ))}
          </Stack>
          <Box mt={2}>
            <Button variant="outlined" fullWidth onClick={() => setSaveOpen(true)}>
              Save Form
            </Button>
          </Box>
        </Paper>
      </Grid>

      {/* Middle panel: Field list */}
      <Grid item xs={12} md={5}>
        <Paper sx={{ p: 2 }}>
          <FieldList onSelect={(f) => setSelected(f)} />
        </Paper>
      </Grid>

      {/* Right panel: Field editor */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <FieldEditor field={selected} allFields={fields} onSave={handleSaveField} />
        </Paper>
      </Grid>

      {/* Save form dialog */}
      <Dialog open={saveOpen} onClose={() => setSaveOpen(false)}>
        <DialogTitle>Save Form</DialogTitle>
        <DialogContent>
          <TextField
            label="Form name"
            fullWidth
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveOpen(false)}>Cancel</Button>
          <Button onClick={confirmSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
