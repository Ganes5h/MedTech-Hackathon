import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  List,
  ListItem,
  Typography,
  Box,
  CircularProgress,
  Divider,
  IconButton,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const ParticipantTrials = () => {
  const [researchList, setResearchList] = useState([]);
  const [selectedResearch, setSelectedResearch] = useState('');
  const [trials, setTrials] = useState([]);
  const [newTrialDesc, setNewTrialDesc] = useState('');
  const [selectedTrial, setSelectedTrial] = useState(null);
  const [newStageTitle, setNewStageTitle] = useState('');
  const [newStageDesc, setNewStageDesc] = useState('');
  const [result, setResult] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch list of research projects
    const fetchResearchList = async () => {
      try {
        const res = await axios.get('/api/researches');
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
      // Fetch trials for selected research
      const fetchTrials = async () => {
        try {
          const res = await axios.get(`/api/trials/research/${selectedResearch}`);
          setTrials(res.data);
        } catch (err) {
          console.error(err);
        }
      };

      fetchTrials();
    }
  }, [selectedResearch]);

  const handleCreateTrial = async () => {
    try {
      await axios.post('/api/trials', { researchId: selectedResearch, description: newTrialDesc });
      setNewTrialDesc('');
      // Refresh trials list
      const res = await axios.get(`/api/trials/research/${selectedResearch}`);
      setTrials(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddStage = async () => {
    if (!selectedTrial) return;
    try {
      await axios.post('/api/trials/addStage', { trialId: selectedTrial, title: newStageTitle, description: newStageDesc });
      setNewStageTitle('');
      setNewStageDesc('');
      // Refresh trials list
      const res = await axios.get(`/api/trials/research/${selectedResearch}`);
      setTrials(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddResult = async (trialId, stageId) => {
    try {
      await axios.post('/api/trials/addResult', { trialId, stageId, result });
      setResult('');
      // Refresh trials list
      const res = await axios.get(`/api/trials/research/${selectedResearch}`);
      setTrials(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCommunication = async () => {
    if (!selectedTrial) return;
    try {
      await axios.post('/api/trials/addCommunication', { trialId: selectedTrial, participantId: 'currentParticipantId', message });
      setMessage('');
      // Refresh trials list
      const res = await axios.get(`/api/trials/research/${selectedResearch}`);
      setTrials(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Manage Trials
      </Typography>
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

      <TextField
        fullWidth
        label="New Trial Description"
        value={newTrialDesc}
        onChange={(e) => setNewTrialDesc(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleCreateTrial}>
        Create Trial
      </Button>

      {trials.length > 0 && (
        <List>
          {trials.map((trial) => (
            <ListItem key={trial._id}>
              <Box flex={1} p={2} border={1} borderRadius={1} mb={2}>
                <Typography variant="h6">{trial.description}</Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setSelectedTrial(trial._id)}
                  sx={{ mt: 1 }}
                >
                  Manage
                </Button>
              </Box>

              {selectedTrial === trial._id && (
                <Box p={2} border={1} borderColor="grey.300" borderRadius={1} mt={2}>
                  <Typography variant="h6">Manage {trial.description}</Typography>
                  <Divider sx={{ my: 2 }} />

                  <TextField
                    fullWidth
                    label="New Stage Title"
                    value={newStageTitle}
                    onChange={(e) => setNewStageTitle(e.target.value)}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="New Stage Description"
                    value={newStageDesc}
                    onChange={(e) => setNewStageDesc(e.target.value)}
                    margin="normal"
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleAddStage}
                    sx={{ mt: 2 }}
                  >
                    Add Stage
                  </Button>

                  <Typography variant="h6" mt={4}>
                    Add Result to Stages
                  </Typography>
                  {trial.stages.map((stage) => (
                    <Box key={stage._id} p={2} border={1} borderColor="grey.300" borderRadius={1} mb={2}>
                      <Typography variant="subtitle1">{stage.title}</Typography>
                      <Typography variant="body2">{stage.description}</Typography>
                      <TextField
                        fullWidth
                        label="Add Result"
                        value={result}
                        onChange={(e) => setResult(e.target.value)}
                        margin="normal"
                      />
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleAddResult(trial._id, stage._id)}
                      >
                        Add Result
                      </Button>
                    </Box>
                  ))}

                  <TextField
                    fullWidth
                    label="New Communication"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    margin="normal"
                  />
                  <Button
                    variant="contained"
                    color="info"
                    onClick={handleAddCommunication}
                    sx={{ mt: 2 }}
                  >
                    Add Communication
                  </Button>
                </Box>
              )}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default ParticipantTrials;
