import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Container, Typography, Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Check, AlertTriangle, Loader } from 'lucide-react';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3A506B',
    },
    secondary: {
      main: '#5BC0BE',
    },
    background: {
      default: '#F0F3F5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0B132B',
      secondary: '#1C2541',
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
  },
});

const MotionBox = motion(Box);

const CreateResearchPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setMediaFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    mediaFiles.forEach((file) => formData.append('mediaFiles', file));

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    try {
      const response = await axios.post(
        `http://localhost:5000/api/research/?userId=${user._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 201) {
        throw new Error('Failed to create research');
      }

      setSuccess(true);
      setOpenDialog(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    if (success) {
      navigate('/research');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{
            mt: 8,
            p: 4,
            borderRadius: 4,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            bgcolor: 'background.paper',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom color="primary" fontWeight="bold">
            Create New Research
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              margin="normal"
              variant="outlined"
              sx={{ mb: 3 }}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              margin="normal"
              variant="outlined"
              sx={{ mb: 3 }}
            />
            <MotionBox
              sx={{
                border: '2px dashed',
                borderColor: 'secondary.main',
                borderRadius: 4,
                p: 3,
                mb: 3,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'rgba(91, 192, 190, 0.1)',
                },
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                accept="image/*,video/*"
                style={{ display: 'none' }}
                id="file-input"
              />
              <label htmlFor="file-input">
                <Upload size={40} style={{ marginBottom: '8px', color: theme.palette.secondary.main }} />
                <Typography variant="h6" gutterBottom color="primary">
                  Upload Media Files
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {mediaFiles.length > 0
                    ? `${mediaFiles.length} file(s) selected`
                    : 'Drag and drop files here or click to browse'}
                </Typography>
              </label>
            </MotionBox>
            <MotionBox
              component="button"
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              sx={{
                width: '100%',
                py: 2,
                px: 4,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                color: 'white',
                bgcolor: 'primary.main',
                border: 'none',
                borderRadius: 30,
                cursor: 'pointer',
                transition: 'all 0.3s',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
                '&:disabled': {
                  bgcolor: 'gray.400',
                  cursor: 'not-allowed',
                },
              }}
            >
              {isSubmitting ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Loader size={24} style={{ marginRight: '8px' }} />
                  Creating Research...
                </Box>
              ) : (
                'Create Research'
              )}
            </MotionBox>
          </form>
        </MotionBox>

        <Dialog open={openDialog} onClose={handleCloseDialog} PaperProps={{ style: { borderRadius: 16 } }}>
          <DialogTitle sx={{ bgcolor: success ? 'secondary.main' : 'error.main', color: 'white', py: 2 }}>
            {success ? 'Success!' : 'Error'}
          </DialogTitle>
          <DialogContent sx={{ py: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {success ? (
                <Check size={24} style={{ color: theme.palette.secondary.main, marginRight: '12px' }} />
              ) : (
                <AlertTriangle size={24} style={{ color: theme.palette.error.main, marginRight: '12px' }} />
              )}
              <Typography variant="body1">
                {success
                  ? 'Research created successfully!'
                  : 'Failed to create research. Please try again.'}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <MotionBox
              component="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCloseDialog}
              sx={{
                py: 1,
                px: 3,
                bgcolor: success ? 'secondary.main' : 'primary.main',
                color: 'white',
                border: 'none',
                borderRadius: 20,
                cursor: 'pointer',
                transition: 'all 0.3s',
                '&:hover': {
                  bgcolor: success ? 'secondary.dark' : 'primary.dark',
                },
              }}
            >
              {success ? 'Go to Manage Research' : 'Close'}
            </MotionBox>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default CreateResearchPage;