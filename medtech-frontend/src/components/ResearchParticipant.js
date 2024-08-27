import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField, Button, List, Typography, Box, CircularProgress,
  Container, Grid, Paper, Chip, AppBar, Toolbar,
  CssBaseline, useScrollTrigger, Fab, Zoom
} from '@mui/material';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import ScienceIcon from '@mui/icons-material/Science';
import ChatIcon from '@mui/icons-material/Chat';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.2, 
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h3: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

const AnimatedListItem = styled(motion.div)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
}));

// Scroll to top component
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
  const [researchList, setResearchList] = useState([]);
  const [selectedResearch, setSelectedResearch] = useState('');
  const [trials, setTrials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResearchList = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/research/researcher');
        setResearchList(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchResearchList();
  }, []);

  useEffect(() => {
    if (selectedResearch) {
      const fetchTrials = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/trail/research/${selectedResearch}`);
          setTrials(res.data);
        } catch (err) {
          console.error(err);
        }
      };

      fetchTrials();
    }
  }, [selectedResearch]);

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Participant Trials Management
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <Container maxWidth="lg">
        <Box py={4}>
          <Typography variant="h3" gutterBottom component={motion.h3}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Manage Trials
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <StyledPaper elevation={3}>
                <Typography variant="h5" gutterBottom>Select Research</Typography>
                <TextField
                  select
                  fullWidth
                  label="Select Research"
                  value={selectedResearch}
                  onChange={(e) => setSelectedResearch(e.target.value)}
                  SelectProps={{ native: true }}
                  margin="normal"
                >
                  <option value="">Select Research</option>
                  {researchList.map((research) => (
                    <option key={research._id} value={research._id}>
                      {research.title}
                    </option>
                  ))}
                </TextField>
              </StyledPaper>
            </Grid>
          </Grid>

          <AnimatePresence>
            {trials.length > 0 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <List>
                  {trials.map((trial) => (
                    <AnimatedListItem key={trial._id} variants={itemVariants}>
                      <StyledPaper elevation={3}>
                        <Typography variant="h5">{trial.description}</Typography>
                        <Chip
                          icon={<ScienceIcon />}
                          label={`${trial.stages.length} Stages`}
                          color="primary"
                          sx={{ mt: 1 }}
                        />
                      </StyledPaper>
                    </AnimatedListItem>
                  ))}
                </List>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Container>
      <ScrollTop>
        <StyledFab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </StyledFab>
      </ScrollTop>
    </ThemeProvider>
  );
};

export default ParticipantTrials;
