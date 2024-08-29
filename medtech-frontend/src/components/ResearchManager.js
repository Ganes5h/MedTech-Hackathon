import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Typography,
  Button,
  TextField,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Alert,
  Container,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Box,
  Avatar,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Add,
  VisibilityOutlined,
  PeopleOutline,
  Science,
  CheckCircle,
  Cancel,
  ArrowForward,
  ArrowBack,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

// Create a custom theme with a more vibrant and modern color palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3', // A vibrant blue
      light: '#64b5f6',
      dark: '#1976d2',
    },
    secondary: {
      main: '#ff4081', // A bright pink
      light: '#ff80ab',
      dark: '#c51162',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#2196f3',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
  '&:hover': {
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    transform: 'translateY(-5px)',
  },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  fontWeight: 600,
}));

const ResearchItem = ({ research, onCreateTrial, onViewTrials, onViewRequests }) => {
  const [participants, setParticipants] = useState(0);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/participant/participants/${research._id}`);
        setParticipants(response.data.totalParticipants);
      } catch (error) {
        console.error('Failed to fetch participants:', error);
      }
    };
    fetchParticipants();
  }, [research._id]);

  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <StyledCard>
        <CardHeader
          title={research.title}
          subheader={`Created on ${new Date(research.createdAt).toLocaleDateString()}`}
          action={
            <IconButton onClick={() => onViewRequests(research._id)} color="primary">
              <PeopleOutline />
            </IconButton>
          }
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {research.description}
          </Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
            <StyledChip
              icon={<PeopleOutline />}
              label={`${participants} Participants`}
              color="primary"
              variant="outlined"
            />
            <StyledChip
              icon={<Science />}
              label={`${research.trials.length} Trials`}
              color="secondary"
              variant="outlined"
            />
          </Box>
          <Box mt={2}>
            <Typography variant="caption" color="text.secondary">
              Progress
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(participants / research.targetParticipants) * 100}
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Button startIcon={<Add />} onClick={() => onCreateTrial(research._id)} color="primary" variant="contained" fullWidth>
            Create Trial
          </Button>
          <Button startIcon={<VisibilityOutlined />} onClick={() => onViewTrials(research._id)} color="secondary" variant="outlined" fullWidth>
            View Trials
          </Button>
        </CardActions>
      </StyledCard>
    </motion.div>
  );
};

    
  const CreateTrialDialog = ({ open, onClose, onSubmit, researchId }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [trialData, setTrialData] = useState({
      description: '',
      stages: [{ title: '', description: '' }],
    });
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleSubmit = () => {
      onSubmit(researchId, trialData);
      setTrialData({
        description: '',
        stages: [{ title: '', description: '' }],
      });
      setActiveStep(0);
    };
  
    const handleAddStage = () => {
      setTrialData((prevData) => ({
        ...prevData,
        stages: [...prevData.stages, { title: '', description: '' }],
      }));
    };
  
    const handleStageChange = (index, field, value) => {
      setTrialData((prevData) => {
        const newStages = [...prevData.stages];
        newStages[index] = { ...newStages[index], [field]: value };
        return { ...prevData, stages: newStages };
      });
    };
  
    const steps = ['Trial Description', 'Trial Stages', 'Review'];
  
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth TransitionComponent={motion.div}>
        <DialogTitle>Create New Trial</DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === 0 && (
            <TextField
              label="Trial Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={trialData.description}
              onChange={(e) => setTrialData({ ...trialData, description: e.target.value })}
              required
              margin="normal"
            />
          )}
          {activeStep === 1 && (
            <>
              {trialData.stages.map((stage, index) => (
                <Paper key={index} elevation={3} sx={{ p: 2, mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Stage {index + 1}
                  </Typography>
                  <TextField
                    label="Stage Title"
                    variant="outlined"
                    fullWidth
                    value={stage.title}
                    onChange={(e) => handleStageChange(index, 'title', e.target.value)}
                    required
                    margin="normal"
                  />
                  <TextField
                    label="Stage Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    value={stage.description}
                    onChange={(e) => handleStageChange(index, 'description', e.target.value)}
                    margin="normal"
                  />
                </Paper>
              ))}
              <Button onClick={handleAddStage} startIcon={<Add />} variant="outlined" sx={{ mt: 2 }}>
                Add Stage
              </Button>
            </>
          )}
          {activeStep === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Trial Summary
              </Typography>
              <Typography variant="body1" gutterBottom>
                Description: {trialData.description}
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Stages:
              </Typography>
              {trialData.stages.map((stage, index) => (
                <Paper key={index} elevation={3} sx={{ p: 2, mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Stage {index + 1}: {stage.title}
                  </Typography>
                  <Typography variant="body2">{stage.description}</Typography>
                </Paper>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          {activeStep > 0 && (
            <Button onClick={handleBack} startIcon={<ArrowBack />}>
              Back
            </Button>
          )}
          {activeStep < steps.length - 1 ? (
            <Button onClick={handleNext} variant="contained" color="primary" endIcon={<ArrowForward />}>
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Create Trial
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  };
  
  const TrialsDialog = ({ open, onClose, trials }) => (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth TransitionComponent={motion.div}>
      <DialogTitle>Trials</DialogTitle>
      <DialogContent>
        <List>
          <AnimatePresence>
            {trials.map((trial) => (
              <motion.div
                key={trial._id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <Paper elevation={3} sx={{ mb: 2, p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {trial.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Created on {new Date(trial.createdAt).toLocaleDateString()}
                  </Typography>
                  <Box mt={2}>
                    <Typography variant="subtitle1" gutterBottom>
                      Stages:
                    </Typography>
                    {trial.stages.map((stage, index) => (
                      <Box key={index} mb={1}>
                        <Typography variant="subtitle2">{stage.title}</Typography>
                        <Typography variant="body2">{stage.description}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </motion.div>
            ))}
          </AnimatePresence>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
  
  const ParticipantRequestsDialog = ({ open, onClose, requests, onAccept, onReject }) => (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth TransitionComponent={motion.div}>
      <DialogTitle>Participant Requests</DialogTitle>
      <DialogContent>
        <List>
          <AnimatePresence>
            {requests.map((request) => (
              <motion.div
                key={request._id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <ListItem>
                  <ListItemText
                    primary={request.name}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {request.email}
                        </Typography>
                        {` — ${request.reason}`}
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="accept" onClick={() => onAccept(request._id)} color="success">
                      <CheckCircle />
                    </IconButton>
                    <IconButton edge="end" aria-label="reject" onClick={() => onReject(request._id)} color="error">
                      <Cancel />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </motion.div>
            ))}
          </AnimatePresence>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
  
const CommunicationDialog = ({ open, onClose, communicationData }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/communication/${communicationData._id}`);
        setMessages(response.data.messages);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };
    if (communicationData) {
      fetchMessages();
    }
  }, [communicationData]);

  const handleSendMessage = async () => {
    try {
      await axios.post(`http://localhost:5000/api/communication/${communicationData._id}`, { text: newMessage });
      setMessages([...messages, { text: newMessage, sender: 'Me' }]);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Communication</DialogTitle>
      <DialogContent>
        <List>
          {messages.map((message, index) => (
            <ListItem key={index}>
              <ListItemText primary={message.text} secondary={message.sender} />
            </ListItem>
          ))}
        </List>
        <TextField
          label="New Message"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSendMessage} color="primary">
          Send
        </Button>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};


  const ManageResearchPage = () => {
    const [researches, setResearches] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [createTrialDialog, setCreateTrialDialog] = useState({ open: false, researchId: null });
    const [trialsDialog, setTrialsDialog] = useState({ open: false, trials: [] });
    const [requestsDialog, setRequestsDialog] = useState({ open: false, requests: [] });
  
    useEffect(() => {
      fetchResearches();
    }, []);
  
    const fetchResearches = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user._id;
        const response = await axios.get(`http://localhost:5000/api/research/researcher/${userId}`);
        setResearches(response.data);
      } catch (err) {
        setError('Failed to fetch researches');
      }
    };
  
    const handleCreateTrial = async (researchId, trialData) => {
      try {
        await axios.post('http://localhost:5000/api/trial/', { ...trialData, researchId });
        setSuccess('Trial created successfully');
        setCreateTrialDialog({ open: false, researchId: null });
        fetchResearches();
      } catch (err) {
        setError('Failed to create trial');
      }
    };
  
    const handleViewTrials = async (researchId) => {
        try {
          const response = await axios.get(`http://localhost:5000/api/trail/get/${researchId}`);
          setTrialsDialog({ open: true, trials: response.data });
        } catch (err) {
          setError('Failed to fetch trials');
        }
      };
      
  
    const handleViewRequests = (researchId) => {
      const research = researches.find((r) => r._id === researchId);
      setRequestsDialog({ open: true, requests: research.participantRequests });
    };
  
    const handleParticipantRequest = async (requestId, action) => {
      try {
        await axios.put(`http://localhost:5000/api/participant/handle/${requestId}`, { status: action });
        setSuccess(`Participant request ${action === 'accepted' ? 'accepted' : 'rejected'} successfully`);
        fetchResearches();
        setRequestsDialog((prev) => ({
          ...prev,
          requests: prev.requests.filter((request) => request._id !== requestId),
        }));
      } catch (err) {
        setError(`Failed to ${action} participant request`);
      }
    };
  
    return (
        <ThemeProvider theme={theme}>
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h1" component="h1" gutterBottom align="center">
              Manage Research
            </Typography>
            {error && (
              <Alert severity="error" onClose={() => setError('')} sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" onClose={() => setSuccess('')} sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}
            <Grid container spacing={3}>
              {researches.map((research) => (
                <Grid item xs={12} sm={6} md={4} key={research._id}>
                  <ResearchItem
                    research={research}
                    onCreateTrial={() => setCreateTrialDialog({ open: true, researchId: research._id })}
                    onViewTrials={handleViewTrials}
                    onViewRequests={handleViewRequests}
                  />
                </Grid>
              ))}
            </Grid>
            <CreateTrialDialog
              open={createTrialDialog.open}
              onClose={() => setCreateTrialDialog({ open: false, researchId: null })}
              onSubmit={handleCreateTrial}
              researchId={createTrialDialog.researchId}
            />
            <TrialsDialog
              open={trialsDialog.open}
              onClose={() => setTrialsDialog({ open: false, trials: [] })}
              trials={trialsDialog.trials}
            />
            <ParticipantRequestsDialog
              open={requestsDialog.open}
              onClose={() => setRequestsDialog({ open: false, requests: [] })}
              requests={requestsDialog.requests}
              onAccept={(requestId) => handleParticipantRequest(requestId, 'accepted')}
              onReject={(requestId) => handleParticipantRequest(requestId, 'rejected')}
            />
          </Container>
        </ThemeProvider>
      );
    };
    
export default ManageResearchPage;