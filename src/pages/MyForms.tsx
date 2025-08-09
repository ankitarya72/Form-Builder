import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeForm } from '../slices/formsSlice';
import { useNavigate } from 'react-router-dom';

export default function MyForms() {
  const forms = useSelector((s: RootState) => s.forms.forms);
  const dispatch = useDispatch();
  const nav = useNavigate();

  return (
    <List>
      {forms.map((f) => (
        <ListItem
          key={f.id}
          secondaryAction={
            <IconButton edge="end" onClick={() => dispatch(removeForm(f.id))}>
              <DeleteIcon />
            </IconButton>
          }
          disablePadding
        >
          <ListItemButton onClick={() => nav(`/preview/${f.id}`)}>
            <ListItemText
              primary={f.name}
              secondary={new Date(f.createdAt).toLocaleString()}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
