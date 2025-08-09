import { useSelector, useDispatch } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import EditIcon from '@mui/icons-material/Edit';
import type { RootState } from '../store';
import { deleteField, moveFieldDown, moveFieldUp } from '../slices/builderSlice';
import type { FieldConfig } from '../types';

interface Props {
  onSelect: (field: FieldConfig) => void;
}

export default function FieldList({ onSelect }: Props) {
  const fields = useSelector((s: RootState) => s.builder.fields);
  const dispatch = useDispatch();

  return (
    <List>
      {fields.map((f) => (
        <ListItem key={f.id} secondaryAction={
          <>
            <IconButton edge="end" onClick={() => dispatch(moveFieldUp(f.id))} title="Move up">
              <ArrowUpward />
            </IconButton>
            <IconButton edge="end" onClick={() => dispatch(moveFieldDown(f.id))} title="Move down">
              <ArrowDownward />
            </IconButton>
            <IconButton edge="end" onClick={() => onSelect(f)} title="Edit">
              <EditIcon />
            </IconButton>
            <IconButton edge="end" onClick={() => dispatch(deleteField(f.id))} title="Delete">
              <DeleteIcon />
            </IconButton>
          </>
        }>
          <ListItemText primary={f.label} secondary={`${f.type}${f.derived ? ' • derived' : ''}`} />
        </ListItem>
      ))}
    </List>
  );
}