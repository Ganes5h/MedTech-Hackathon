import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button, Typography, Box, CircularProgress, Container, Grid, Paper, Chip, AppBar, Toolbar,
  CssBaseline, useScrollTrigger, Fab, Zoom, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction
} from '@mui/material';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import ScienceIcon from '@mui/icons-material/Science';
import ChatIcon from '@mui/icons-material/Chat';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CloseIcon from '@mui/icons-material/Close';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6200ea',
      light: '#9d46ff',
      dark: '#0a00b6',
    },
    secondary: {
      main: '#00bfa5',
      light: '#5df2d6',
      dark: '#008e76',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
      color: '#6200ea',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    body1: {
      fontSize: '1rem',
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
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 20px rgba(98, 0, 234, 0.2)',
  },
}));

const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
}));

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    }
  },
};

function ScrollTop(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box onClick={handleClick} role="presentation" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        {children}
      </Box>
    </Zoom>
  );
}

const ParticipantTrials = () => {
  const [researches, setResearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createTrialDialog, setCreateTrialDialog] = useState({ open: false, researchId: null });
  const [newTrialDescription, setNewTrialDescription] = useState('');
  const [communicationDialog, setCommunicationDialog] = useState({ open: false, trialId: null });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchResearches = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const participantId = user._id;
        const res = await axios.get(`http://localhost:5000/api/research/get-participant/${participantId}`);
        setResearches(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchResearches();
  }, []);

  const handleCreateTrial = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userID = user._id;
      const res = await axios.post('http://localhost:5000/api/trail', {
        researchId: createTrialDialog.researchId,
        description: newTrialDescription,
        userId:userID
      });
      setResearches(researches.map(research => 
        research._id === createTrialDialog.researchId 
          ? { ...research, trials: [...research.trials, res.data] }
          : research
      ));
      setCreateTrialDialog({ open: false, researchId: null });
      setNewTrialDescription('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendMessage = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const participantId = user._id;
      await axios.post('http://localhost:5000/api/trail/communication', {
        trialId: communicationDialog.trialId,
        participantId,
        message,
      });
      setCommunicationDialog({ open: false, trialId: null });
      setMessage('');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Participant Research Hub
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <Container maxWidth="lg">
        <Box py={4}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h2" gutterBottom align="center">
              Your Research Projects
            </Typography>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid container spacing={3}>
              {researches.map((research) => (
                <Grid item xs={12} md={6} key={research._id} component={motion.div} variants={itemVariants}>
                  <StyledPaper elevation={3}>
                    <Typography variant="h5" gutterBottom>{research.title}</Typography>
                    <Typography variant="body1" paragraph>{research.description}</Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Chip
                        icon={<ScienceIcon />}
                        label={`${research.trials ? research.trials.length : 0} Trials`}
                        color="primary"
                      />
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<AddIcon />}
                        onClick={() => setCreateTrialDialog({ open: true, researchId: research._id })}
                      >
                        Create Trial
                      </Button>
                    </Box>
                    {research.trials && research.trials.length > 0 && (
                      <List>
                        {research.trials.map((trial) => (
                          <ListItem key={trial._id} disablePadding>
                            <ListItemText primary={trial.description} />
                            <ListItemSecondaryAction>
                              <IconButton edge="end" aria-label="communicate" onClick={() => setCommunicationDialog({ open: true, trialId: trial._id })}>
                                <ChatIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </StyledPaper>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>
      </Container>

      <Dialog 
        open={createTrialDialog.open} 
        onClose={() => setCreateTrialDialog({ open: false, researchId: null })}
      >
        <DialogTitle>Create New Trial</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Trial Description"
            type="text"
            fullWidth
            variant="outlined"
            value={newTrialDescription}
            onChange={(e) => setNewTrialDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateTrialDialog({ open: false, researchId: null })} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateTrial} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog 
        open={communicationDialog.open} 
        onClose={() => setCommunicationDialog({ open: false, trialId: null })}
      >
        <DialogTitle>Send Message</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Message"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCommunicationDialog({ open: false, trialId: null })} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSendMessage} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>

      <ScrollTop>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </ThemeProvider>
  );
};

export default ParticipantTrials;
