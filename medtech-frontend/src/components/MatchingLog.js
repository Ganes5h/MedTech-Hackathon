import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Card, Typography, MenuItem } from "@mui/material";

const MatchingLogManager = () => {
  const [matchingLogs, setMatchingLogs] = useState([]);
  const [participantId, setParticipantId] = useState("");
  const [trialId, setTrialId] = useState("");
  const [matchDate, setMatchDate] = useState("");
  const [matchingLogId, setMatchingLogId] = useState("");
  const [singleLog, setSingleLog] = useState(null);

  useEffect(() => {
    // Fetch all matching logs
    const fetchMatchingLogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/matching/");
        setMatchingLogs(response.data);
      } catch (error) {
        console.error("Error fetching matching logs:", error);
      }
    };

    fetchMatchingLogs();
  }, []);

  // Create matching log
  const handleCreateMatchingLog = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/matching/", {
        participantId,
        trialId,
        matchDate,
      });
      alert("Matching Log created successfully.");
      setMatchingLogs([...matchingLogs, response.data]);
    } catch (error) {
      console.error("Error creating matching log:", error);
    }
  };

  // Get matching log by ID
  const handleGetMatchingLogById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/matching/${matchingLogId}`);
      setSingleLog(response.data);
    } catch (error) {
      console.error("Error fetching matching log by ID:", error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Matching Log Management
      </Typography>

      <Card style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h5">Create Matching Log</Typography>
        <TextField
          label="Participant ID"
          variant="outlined"
          value={participantId}
          onChange={(e) => setParticipantId(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Trial ID"
          variant="outlined"
          value={trialId}
          onChange={(e) => setTrialId(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Match Date"
          variant="outlined"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={matchDate}
          onChange={(e) => setMatchDate(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleCreateMatchingLog}>
          Create Log
        </Button>
      </Card>

      <Card style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h5">Get Matching Log by ID</Typography>
        <TextField
          label="Matching Log ID"
          variant="outlined"
          value={matchingLogId}
          onChange={(e) => setMatchingLogId(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="secondary" onClick={handleGetMatchingLogById}>
          Get Log
        </Button>
        {singleLog && (
          <div style={{ marginTop: "20px" }}>
            <Typography variant="h6">Log Details:</Typography>
            <Typography>Participant: {singleLog.participantId.name}</Typography>
            <Typography>Trial: {singleLog.trialId.title}</Typography>
            <Typography>Match Date: {singleLog.matchDate}</Typography>
          </div>
        )}
      </Card>

      <Card style={{ padding: "20px" }}>
        <Typography variant="h5">All Matching Logs</Typography>
        <ul>
          {matchingLogs.map((log) => (
            <li key={log._id}>
              {log.participantId.name} - {log.trialId.title} (Matched on {log.matchDate})
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default MatchingLogManager;
