import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Alert, Container, Typography } from '@mui/material';
import axios from 'axios';

const CreateResearchPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setMediaFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    mediaFiles.forEach((file) => formData.append('mediaFiles', file));

    try {
      const response = await axios.post('http://localhost:5000/api/research/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to create research');
      }

      setSuccess(true);
      setTimeout(() => navigate('/manage-research'), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create New Research
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Research created successfully! Redirecting...
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          margin="normal"
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
        />
        <Typography variant="body1" gutterBottom>
          Upload Media Files:
        </Typography>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          accept="image/*,video/*"
          style={{ marginBottom: '16px' }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Create Research
        </Button>
      </form>
    </Container>
  );
};

export default CreateResearchPage;
