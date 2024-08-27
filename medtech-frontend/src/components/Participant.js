import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Card, Typography } from "@mui/material";

const ParticipantManager = () => {
  const [participants, setParticipants] = useState([]);
  const [participantId, setParticipantId] = useState("");
  const [participantDetails, setParticipantDetails] = useState(null);
  const [demographics, setDemographics] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [preferences, setPreferences] = useState("");
  const [updatedDemographics, setUpdatedDemographics] = useState("");
  const [updatedMedicalHistory, setUpdatedMedicalHistory] = useState("");
  const [updatedPreferences, setUpdatedPreferences] = useState("");

  // Fetch all participants
  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/participants");
        setParticipants(response.data);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };
    fetchParticipants();
  }, []);

  // Create a participant
  const handleCreateParticipant = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/participants", {
        demographics,
        medicalHistory,
        preferences,
      });
      alert("Participant created successfully.");
      setParticipants([...participants, response.data]);
    } catch (error) {
      console.error("Error creating participant:", error);
    }
  };

  // Get participant by ID
  const handleGetParticipantById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/participants/${participantId}`);
      setParticipantDetails(response.data);
    } catch (error) {
      console.error("Error fetching participant by ID:", error);
    }
  };

  // Update participant
  const handleUpdateParticipant = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/participants/${participantId}`, {
        demographics: updatedDemographics,
        medicalHistory: updatedMedicalHistory,
        preferences: updatedPreferences,
      });
      alert("Participant updated successfully.");
      setParticipants(
        participants.map((participant) =>
          participant._id === participantId ? response.data : participant
        )
      );
    } catch (error) {
      console.error("Error updating participant:", error);
    }
  };

  // Delete participant
  const handleDeleteParticipant = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/participants/${id}`);
      alert("Participant deleted successfully.");
      setParticipants(participants.filter((participant) => participant._id !== id));
    } catch (error) {
      console.error("Error deleting participant:", error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Participant Management
      </Typography>

      <Card style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h5">Create Participant</Typography>
        <TextField
          label="Demographics"
          variant="outlined"
          value={demographics}
          onChange={(e) => setDemographics(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Medical History"
          variant="outlined"
          value={medicalHistory}
          onChange={(e) => setMedicalHistory(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Preferences"
          variant="outlined"
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleCreateParticipant}>
          Create Participant
        </Button>
      </Card>

      <Card style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h5">Get Participant by ID</Typography>
        <TextField
          label="Participant ID"
          variant="outlined"
          value={participantId}
          onChange={(e) => setParticipantId(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="secondary" onClick={handleGetParticipantById}>
          Get Participant
        </Button>
        {participantDetails && (
          <div style={{ marginTop: "20px" }}>
            <Typography variant="h6">Participant Details:</Typography>
            <Typography>Name: {participantDetails.userId.name}</Typography>
            <Typography>Email: {participantDetails.userId.email}</Typography>
            <Typography>Demographics: {participantDetails.demographics}</Typography>
            <Typography>Medical History: {participantDetails.medicalHistory}</Typography>
            <Typography>Preferences: {participantDetails.preferences}</Typography>
          </div>
        )}
      </Card>

      <Card style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h5">Update Participant</Typography>
        <TextField
          label="Updated Demographics"
          variant="outlined"
          value={updatedDemographics}
          onChange={(e) => setUpdatedDemographics(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Updated Medical History"
          variant="outlined"
          value={updatedMedicalHistory}
          onChange={(e) => setUpdatedMedicalHistory(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Updated Preferences"
          variant="outlined"
          value={updatedPreferences}
          onChange={(e) => setUpdatedPreferences(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleUpdateParticipant}>
          Update Participant
        </Button>
      </Card>

      <Card style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h5">All Participants</Typography>
        <ul>
          {participants.map((participant) => (
            <li key={participant._id}>
              {participant.userId.name} - {participant.demographics}
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteParticipant(participant._id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default ParticipantManager;
