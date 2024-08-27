import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Typography, TextField, MenuItem } from "@mui/material";

const TrialManager = () => {
  const [trials, setTrials] = useState([]);
  const [participantId, setParticipantId] = useState("");
  const [status, setStatus] = useState("");
  const [reportMessage, setReportMessage] = useState("");

  useEffect(() => {
    // Fetch all trials
    const fetchTrials = async () => {
      try {
        const response = await axios.get("/api/trials");
        setTrials(response.data);
      } catch (error) {
        console.error("Error fetching trials:", error);
      }
    };

    fetchTrials();
  }, []);

  // Update participant status
  const handleStatusUpdate = async () => {
    try {
      const response = await axios.put("/api/participants/update-status", {
        participantId,
        status,
      });
      alert("Participant status updated successfully.");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Generate report
  const handleGenerateReport = async () => {
    try {
      const response = await axios.post("/api/reports/generate");
      setReportMessage(response.data.msg);
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Trial Management
      </Typography>
      
      <Card style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h5">All Trials</Typography>
        <ul>
          {trials.map((trial) => (
            <li key={trial._id}>{trial.name}</li>
          ))}
        </ul>
      </Card>

      <Card style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h5">Update Participant Status</Typography>
        <TextField
          label="Participant ID"
          variant="outlined"
          value={participantId}
          onChange={(e) => setParticipantId(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Status"
          variant="outlined"
          select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          fullWidth
          margin="normal"
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </TextField>
        <Button variant="contained" color="primary" onClick={handleStatusUpdate}>
          Update Status
        </Button>
      </Card>

      <Card style={{ padding: "20px" }}>
        <Typography variant="h5">Generate Report</Typography>
        <Button variant="contained" color="secondary" onClick={handleGenerateReport}>
          Generate Report
        </Button>
        {reportMessage && (
          <Typography style={{ marginTop: "20px" }}>
            {reportMessage}
          </Typography>
        )}
      </Card>
    </div>
  );
};

export default TrialManager;
