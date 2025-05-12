// src/components/layout/MainLayout.jsx
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';

export default function MainLayout({ children }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          ml: { sm: '240px' },
          backgroundColor: '#f3f2ef',
          minHeight: '100vh',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
