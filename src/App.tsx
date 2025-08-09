import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CreateForm from './pages/CreateForm';
import PreviewForm from './pages/PreviewForm';
import MyForms from './pages/MyForms';

function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Form Builder
          </Typography>
          <Routes>
            <Route path="/" element={<Navigate to="/create" replace />} />
            <Route path="/create" element={<CreateForm />} />
            <Route path="/preview" element={<PreviewForm />} />
            <Route path="/preview/:formId" element={<PreviewForm />} />
            <Route path="/myforms" element={<MyForms />} />
          </Routes>
        </Box>
      </Container>
    </BrowserRouter>
  );
}

export default App;
