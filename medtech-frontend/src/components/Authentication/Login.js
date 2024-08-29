import React, { useState } from 'react';
import axios from 'axios';
import { 
  Button, 
  TextField, 
  Typography, 
  Container, 
  Box, 
  Avatar,
  Snackbar
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const LoginComponent = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      // Store token and user in localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      const userRole = res.data.user.role; // Assuming 'role' is provided in the response
      
      setOpenSnackbar(true);

      // Redirect based on the user role
      setTimeout(() => {
        if (userRole === 'researcher') {
          navigate('/research');
        } else if (userRole === 'participant') {
          navigate('/research-studies');
        } else {
          navigate('/research-studies'); // Default route if role doesn't match
        }
      }, 2000);
    } catch (err) {
      console.error('Login error', err.response?.data || err.message);
      setError(err.response?.data?.msg || 'Invalid credentials');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Box
          sx={{
            width: '100%',
            maxWidth: 400,
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main', transition: 'all 0.3s ease' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
            Login
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ width: '100%' }}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={onChange}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={onChange}
                sx={{ mb: 2 }}
              />
            </motion.div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 1, py: 1.5, fontWeight: 'bold', bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
            >
              Login
            </Button>
          </Box>
          {error && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={() => setOpenSnackbar(false)}
            message="Login successful!"
            sx={{ mt: 2 }}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginComponent;
