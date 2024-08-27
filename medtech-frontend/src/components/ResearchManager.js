import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input, TextareaAutosize, Select, MenuItem, Modal, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/system';

const Container = styled('div')({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '20px',
});

const Header = styled('h1')({
  textAlign: 'center',
  marginBottom: '20px',
});

const FormSection = styled('div')({
  marginBottom: '20px',
});

const InputField = styled(Input)({
  width: '100%',
  marginBottom: '10px',
});

const TextAreaField = styled(TextareaAutosize)({
  width: '100%',
  marginBottom: '10px',
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ddd',
});

const ActionButton = styled(Button)({
  marginRight: '10px',
});

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

  useEffect(() => {
    // Fetch initial data (you can replace with actual API endpoints)
    fetchResearches();
    fetchParticipants();
  }, []);

  const fetchResearches = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/research');
      setResearch(data);
    } catch (error) {
      console.error('Error fetching research:', error);
    }
  };

  const fetchParticipants = async () => {
    try {
      const { data } = await axios.get('/api/participant/participants');
      setParticipants(data);
    } catch (error) {
      console.error('Error fetching participants:', error);
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
    } catch (error) {
      console.error('Error adding participant:', error);
    }
  };

  const handleRequest = async (researchId) => {
    try {
      await axios.post('/api/participants/request', { researchId });
      fetchResearches();
    } catch (error) {
      console.error('Error requesting to join research:', error);
    }
  };

  const handleAcceptRequest = async (participantId) => {
    try {
      await axios.post('/api/research/acceptRequest', { researchId: selectedResearch, participantId });
      fetchResearches();
    } catch (error) {
      console.error('Error accepting participant request:', error);
    }
  };

  const handleRejectRequest = async (participantId) => {
    try {
      await axios.post('/api/research/rejectRequest', { researchId: selectedResearch, participantId });
      fetchResearches();
    } catch (error) {
      console.error('Error rejecting participant request:', error);
    }
  };

  const handleCreateTrial = async () => {
    try {
      await axios.post('/api/trials/create', { researchId: selectedResearch, description: formData.description });
      fetchTrials();
    } catch (error) {
      console.error('Error creating trial:', error);
    }
  };

  const fetchTrials = async () => {
    try {
      const { data } = await axios.get(`/api/trials?researchId=${selectedResearch}`);
      setTrials(data);
    } catch (error) {
      console.error('Error fetching trials:', error);
    }
  };

  return (
    <Container>
      <Header>Research Manager</Header>

      <FormSection>
        <h2>Create or Update Research</h2>
        <InputField
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <TextAreaField
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          minRows={3}
        />
        {/* Media upload functionality can be added here */}
        <ActionButton variant="contained" color="primary" onClick={handleCreateTrial}>Create/Update Research</ActionButton>
      </FormSection>

      <FormSection>
        <h2>Add Participant</h2>
        <Select
          value={newParticipant}
          onChange={(e) => setNewParticipant(e.target.value)}
        >
          {participants.map((participant) => (
            <MenuItem key={participant._id} value={participant._id}>
              {participant.name}
            </MenuItem>
          ))}
        </Select>
        <ActionButton variant="contained" color="primary" onClick={handleAddParticipant}>Add Participant</ActionButton>
      </FormSection>

      <FormSection>
        <h2>Participant Requests</h2>
        <List>
          {participantRequests.map((request) => (
            <ListItem key={request._id}>
              <ListItemText primary={request.name} />
              <ActionButton variant="contained" color="success" onClick={() => handleAcceptRequest(request._id)}>Accept</ActionButton>
              <ActionButton variant="contained" color="error" onClick={() => handleRejectRequest(request._id)}>Reject</ActionButton>
            </ListItem>
          ))}
        </List>
      </FormSection>

      <FormSection>
        <h2>Create Trial</h2>
        <ActionButton variant="contained" color="primary" onClick={() => setModalOpen(true)}>Create Trial</ActionButton>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        >
          <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
            <h2>Create Trial</h2>
            <TextAreaField
              name="description"
              placeholder="Trial Description"
              value={formData.description}
              onChange={handleInputChange}
              minRows={3}
            />
            <ActionButton variant="contained" color="primary" onClick={handleCreateTrial}>Create Trial</ActionButton>
          </div>
        </Modal>
      </FormSection>

      <FormSection>
        <h2>Trials</h2>
        <List>
          {trials.map((trial) => (
            <ListItem key={trial._id}>
              <ListItemText primary={trial.description} />
              {/* Additional trial details and functionalities can be added here */}
            </ListItem>
          ))}
        </List>
      </FormSection>
    </Container>
  );
};

export default ResearchManager;
