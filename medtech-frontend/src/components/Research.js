import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Card, Typography } from "@mui/material";

const TrialManager = () => {
  const [trials, setTrials] = useState([]);
  const [trialId, setTrialId] = useState("");
  const [trialDetails, setTrialDetails] = useState(null);
  const [newTrialData, setNewTrialData] = useState({
    trialName: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [updatedTrialData, setUpdatedTrialData] = useState({});
  const [participants, setParticipants] = useState([]);

  // Fetch all trials
  useEffect(() => {
    const fetchTrials = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/trials/");
        setTrials(response.data);
      } catch (error) {
        console.error("Error fetching trials:", error);
      }
    };
    fetchTrials();
  }, []);

  // Create a new trial
  const handleCreateTrial = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/trials/", newTrialData);
      alert("Trial created successfully.");
      setTrials([...trials, response.data]);
      setNewTrialData({
        trialName: "",
        description: "",
        startDate: "",
        endDate: "",
      });
    } catch (error) {
      console.error("Error creating trial:", error);
    }
  };

  // Get trial by ID
  const handleGetTrialById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/trials/${trialId}`);
      setTrialDetails(response.data);
    } catch (error) {
      console.error("Error fetching trial by ID:", error);
    }
  };

  // Update trial
  const handleUpdateTrial = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/trials/${trialId}`, updatedTrialData);
      alert("Trial updated successfully.");
      setTrials(
        trials.map((trial) => (trial._id === trialId ? response.data : trial))
      );
    } catch (error) {
      console.error("Error updating trial:", error);
    }
  };

  // Get participants by trial ID
  const handleGetParticipantsByTrial = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/trials/${trialId}/participants`);
      setParticipants(response.data);
    } catch (error) {
      console.error("Error fetching participants for trial:", error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Trial Management
      </Typography>

      <Card style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h5">Create New Trial</Typography>
        <TextField
          label="Trial Name"
          variant="outlined"
          value={newTrialData.trialName}
          onChange={(e) =>
            setNewTrialData({ ...newTrialData, trialName: e.target.value })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          variant="outlined"
          value={newTrialData.description}
          onChange={(e) =>
            setNewTrialData({ ...newTrialData, description: e.target.value })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Start Date"
          variant="outlined"
          value={newTrialData.startDate}
          onChange={(e) =>
            setNewTrialData({ ...newTrialData, startDate: e.target.value })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="End Date"
          variant="outlined"
          value={newTrialData.endDate}
          onChange={(e) =>
            setNewTrialData({ ...newTrialData, endDate: e.target.value })
          }
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleCreateTrial}>
          Create Trial
        </Button>
      </Card>

      <Card style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h5">Get Trial by ID</Typography>
        <TextField
          label="Trial ID"
          variant="outlined"
          value={trialId}
          onChange={(e) => setTrialId(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="secondary" onClick={handleGetTrialById}>
          Get Trial
        </Button>
        {trialDetails && (
          <div style={{ marginTop: "20px" }}>
            <Typography variant="h6">Trial Details:</Typography>
            <Typography>Name: {trialDetails.trialName}</Typography>
            <Typography>Description: {trialDetails.description}</Typography>
            <Typography>Researcher: {trialDetails.researcher.name}</Typography>
            <Typography>Start Date: {trialDetails.startDate}</Typography>
            <Typography>End Date: {trialDetails.endDate}</Typography>
          </div>
        )}
      </Card>

      <Card style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h5">Update Trial</Typography>
        <TextField
          label="Updated Trial Name"
          variant="outlined"
          value={updatedTrialData.trialName}
          onChange={(e) =>
            setUpdatedTrialData({ ...updatedTrialData, trialName: e.target.value })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Updated Description"
          variant="outlined"
          value={updatedTrialData.description}
          onChange={(e) =>
            setUpdatedTrialData({ ...updatedTrialData, description: e.target.value })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Updated Start Date"
          variant="outlined"
          value={updatedTrialData.startDate}
          onChange={(e) =>
            setUpdatedTrialData({ ...updatedTrialData, startDate: e.target.value })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Updated End Date"
          variant="outlined"
          value={updatedTrialData.endDate}
          onChange={(e) =>
            setUpdatedTrialData({ ...updatedTrialData, endDate: e.target.value })
          }
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleUpdateTrial}>
          Update Trial
        </Button>
      </Card>

      <Card style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h5">Get Participants by Trial</Typography>
        <Button variant="contained" color="secondary" onClick={handleGetParticipantsByTrial}>
          Get Participants
        </Button>
        {participants.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <Typography variant="h6">Participants:</Typography>
            <ul>
              {participants.map((participant) => (
                <li key={participant._id}>{participant.demographics}</li>
              ))}
            </ul>
          </div>
        )}
      </Card>

      <Card style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h5">All Trials</Typography>
        <ul>
          {trials.map((trial) => (
            <li key={trial._id}>
              {trial.trialName} - {trial.researcher.name}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default TrialManager;
