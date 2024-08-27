import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button, TextField, Select, MenuItem, Modal,
  List, ListItem, ListItemText, Typography, Paper, Grid, Box,
  AppBar, Toolbar, IconButton, Divider, Snackbar, Alert,
  Container, Card, CardContent, CardActions
} from '@mui/material';
import { styled } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ModalContent = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  outline: 'none',
  maxWidth: 400,
  width: '100%',
}));

const ResearchManager = () => {
  const [research, setResearch] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [participantRequests, setParticipantRequests] = useState([]);
  const [trials, setTrials] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mediaPaths: [],
  });
  const [newParticipant, setNewParticipant] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedResearch, setSelectedResearch] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    fetchResearches();
    fetchParticipants();
  }, []);

  const fetchResearches = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/research');
      setResearch(data);
    } catch (error) {
      console.error('Error fetching research:', error);
      showSnackbar('Error fetching research', 'error');
    }
  };

  const fetchParticipants = async () => {
    try {
      const { data } = await axios.get('/api/participant/participants');
      setParticipants(data);
    } catch (error) {
      console.error('Error fetching participants:', error);
      showSnackbar('Error fetching participants', 'error');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddParticipant = async () => {
    try {
      await axios.post('/api/research/addParticipant', { researchId: selectedResearch, participantId: newParticipant });
      fetchResearches();
      showSnackbar('Participant added successfully', 'success');
    } catch (error) {
      console.error('Error adding participant:', error);
      showSnackbar('Error adding participant', 'error');
    }
  };

  const handleRequest = async (researchId) => {
    try {
      await axios.post('/api/participants/request', { researchId });
      fetchResearches();
      showSnackbar('Request sent successfully', 'success');
    } catch (error) {
      console.error('Error requesting to join research:', error);
      showSnackbar('Error sending request', 'error');
    }
  };

  const handleAcceptRequest = async (participantId) => {
    try {
      await axios.post('/api/research/acceptRequest', { researchId: selectedResearch, participantId });
      fetchResearches();
      showSnackbar('Request accepted', 'success');
    } catch (error) {
      console.error('Error accepting participant request:', error);
      showSnackbar('Error accepting request', 'error');
    }
  };

  const handleRejectRequest = async (participantId) => {
    try {
      await axios.post('/api/research/rejectRequest', { researchId: selectedResearch, participantId });
      fetchResearches();
      showSnackbar('Request rejected', 'success');
    } catch (error) {
      console.error('Error rejecting participant request:', error);
      showSnackbar('Error rejecting request', 'error');
    }
  };

  const handleCreateTrial = async () => {
    try {
      await axios.post('/api/trials/create', { researchId: selectedResearch, description: formData.description });
      fetchTrials();
      setModalOpen(false);
      showSnackbar('Trial created successfully', 'success');
    } catch (error) {
      console.error('Error creating trial:', error);
      showSnackbar('Error creating trial', 'error');
    }
  };

  const fetchTrials = async () => {
    try {
      const { data } = await axios.get(`/api/trials?researchId=${selectedResearch}`);
      setTrials(data);
    } catch (error) {
      console.error('Error fetching trials:', error);
      showSnackbar('Error fetching trials', 'error');
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Research Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <StyledPaper elevation={3}>
              <Typography variant="h5" gutterBottom>Create or Update Research</Typography>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                rows={4}
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleCreateTrial}
                sx={{ mt: 2 }}
              >
                Create/Update Research
              </Button>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledPaper elevation={3}>
              <Typography variant="h5" gutterBottom>Add Participant</Typography>
              <Select
                fullWidth
                value={newParticipant}
                onChange={(e) => setNewParticipant(e.target.value)}
                margin="normal"
              >
                {participants.map((participant) => (
                  <MenuItem key={participant._id} value={participant._id}>
                    {participant.name}
                  </MenuItem>
                ))}
              </Select>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddParticipant}
                sx={{ mt: 2 }}
              >
                Add Participant
              </Button>
            </StyledPaper>
          </Grid>
          <Grid item xs={12}>
            <StyledPaper elevation={3}>
              <Typography variant="h5" gutterBottom>Participant Requests</Typography>
              <List>
                {participantRequests.map((request) => (
                  <ListItem key={request._id}>
                    <ListItemText primary={request.name} />
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => handleAcceptRequest(request._id)}
                      sx={{ mr: 1 }}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleRejectRequest(request._id)}
                    >
                      Reject
                    </Button>
                  </ListItem>
                ))}
              </List>
            </StyledPaper>
          </Grid>
          <Grid item xs={12}>
            <StyledPaper elevation={3}>
              <Typography variant="h5" gutterBottom>Trials</Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setModalOpen(true)}
                sx={{ mb: 2 }}
              >
                Create Trial
              </Button>
              <Grid container spacing={2}>
                {trials.map((trial) => (
                  <Grid item xs={12} sm={6} md={4} key={trial._id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" component="div">
                          Trial
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {trial.description}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">View Details</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>

      <StyledModal open={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalContent>
          <Typography variant="h6" component="h2" gutterBottom>
            Create Trial
          </Typography>
          <TextField
            fullWidth
            label="Trial Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            multiline
            rows={4}
            margin="normal"
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={() => setModalOpen(false)} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleCreateTrial}>
              Create Trial
            </Button>
          </Box>
        </ModalContent>
      </StyledModal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ResearchManager;