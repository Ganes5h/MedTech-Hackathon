import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Card, Typography } from "@mui/material";

const TrialManager = () => {
  const [trials, setTrials] = useState([]);
  const [trialId, setTrialId] = useState("");
  const [trialDetails, setTrialDetails] = useState(null);
  const [newTrialData, setNewTrialData] = useState({
    title: "",
    description: "",
    inclusionCriteria: "",
    exclusionCriteria: "",
    startDate: "",
    endDate: "",
    location: "",
  });
  const [updatedTrialData, setUpdatedTrialData] = useState({});

  // Fetch all trials
  useEffect(() => {
    const fetchTrials = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/trials");
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
      const response = await axios.post("http://localhost:5000/api/trials", newTrialData);
      alert("Trial created successfully.");
      setTrials([...trials, response.data]);
      setNewTrialData({
        title: "",
        description: "",
        inclusionCriteria: "",
        exclusionCriteria: "",
        startDate: "",
        endDate: "",
        location: "",
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

  // Delete trial
  const handleDeleteTrial = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/trials/${trialId}`);
      alert("Trial deleted successfully.");
      setTrials(trials.filter((trial) => trial._id !== trialId));
      setTrialDetails(null);
    } catch (error) {
      console.error("Error deleting trial:", error);
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
          label="Title"
          variant="outlined"
          value={newTrialData.title}
          onChange={(e) => setNewTrialData({ ...newTrialData, title: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          variant="outlined"
          value={newTrialData.description}
          onChange={(e) => setNewTrialData({ ...newTrialData, description: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Inclusion Criteria"
          variant="outlined"
          value={newTrialData.inclusionCriteria}
          onChange={(e) => setNewTrialData({ ...newTrialData, inclusionCriteria: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Exclusion Criteria"
          variant="outlined"
          value={newTrialData.exclusionCriteria}
          onChange={(e) => setNewTrialData({ ...newTrialData, exclusionCriteria: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Start Date"
          variant="outlined"
          value={newTrialData.startDate}
          onChange={(e) => setNewTrialData({ ...newTrialData, startDate: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="End Date"
          variant="outlined"
          value={newTrialData.endDate}
          onChange={(e) => setNewTrialData({ ...newTrialData, endDate: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Location"
          variant="outlined"
          value={newTrialData.location}
          onChange={(e) => setNewTrialData({ ...newTrialData, location: e.target.value })}
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
            <Typography>Title: {trialDetails.title}</Typography>
            <Typography>Description: {trialDetails.description}</Typography>
            <Typography>Inclusion Criteria: {trialDetails.inclusionCriteria}</Typography>
            <Typography>Exclusion Criteria: {trialDetails.exclusionCriteria}</Typography>
            <Typography>Start Date: {trialDetails.startDate}</Typography>
            <Typography>End Date: {trialDetails.endDate}</Typography>
            <Typography>Location: {trialDetails.location}</Typography>
            <Typography>Researchers: {trialDetails.researchers.map(r => r.name).join(", ")}</Typography>
          </div>
        )}
      </Card>

      <Card style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h5">Update Trial</Typography>
        <TextField
          label="Updated Title"
          variant="outlined"
          value={updatedTrialData.title || ""}
          onChange={(e) => setUpdatedTrialData({ ...updatedTrialData, title: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Updated Description"
          variant="outlined"
          value={updatedTrialData.description || ""}
          onChange={(e) => setUpdatedTrialData({ ...updatedTrialData, description: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Updated Inclusion Criteria"
          variant="outlined"
          value={updatedTrialData.inclusionCriteria || ""}
          onChange={(e) => setUpdatedTrialData({ ...updatedTrialData, inclusionCriteria: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Updated Exclusion Criteria"
          variant="outlined"
          value={updatedTrialData.exclusionCriteria || ""}
          onChange={(e) => setUpdatedTrialData({ ...updatedTrialData, exclusionCriteria: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Updated Start Date"
          variant="outlined"
          value={updatedTrialData.startDate || ""}
          onChange={(e) => setUpdatedTrialData({ ...updatedTrialData, startDate: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Updated End Date"
          variant="outlined"
          value={updatedTrialData.endDate || ""}
          onChange={(e) => setUpdatedTrialData({ ...updatedTrialData, endDate: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Updated Location"
          variant="outlined"
          value={updatedTrialData.location || ""}
          onChange={(e) => setUpdatedTrialData({ ...updatedTrialData, location: e.target.value })}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleUpdateTrial}>
          Update Trial
        </Button>
      </Card>

      <Card style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h5">Delete Trial</Typography>
        <Button variant="contained" color="secondary" onClick={handleDeleteTrial}>
          Delete Trial
        </Button>
      </Card>

      <Card style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h5">All Trials</Typography>
        <ul>
          {trials.map((trial) => (
            <li key={trial._id}>
              {trial.title} - {trial.researchers.map(r => r.name).join(", ")}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default TrialManager;
