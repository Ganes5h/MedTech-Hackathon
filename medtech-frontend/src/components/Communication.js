import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

const CommunicationLogComponent = () => {
  const [communicationLogs, setCommunicationLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newLog, setNewLog] = useState({
    participantId: "",
    message: "",
    sentAt: "",
  });
  const [logId, setLogId] = useState("");
  const [selectedLog, setSelectedLog] = useState(null);

  // Fetch All Communication Logs
  useEffect(() => {
    fetchCommunicationLogs();
  }, []);

  const fetchCommunicationLogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/comminication/");
      setCommunicationLogs(response.data);
    } catch (error) {
      console.error("Error fetching communication logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLog = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/comminication", newLog);
      setCommunicationLogs([...communicationLogs, response.data]);
      setNewLog({ participantId: "", message: "", sentAt: "" });
    } catch (error) {
      console.error("Error creating communication log:", error);
    }
  };

  const handleGetLogById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/comminication/${logId}`);
      setSelectedLog(response.data);
    } catch (error) {
      console.error("Error fetching communication log by ID:", error);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4">Communication Log</Typography>

      {/* Create Communication Log */}
      <Box mt={3}>
        <Typography variant="h6">Create New Communication Log</Typography>
        <TextField
          label="Participant ID"
          value={newLog.participantId}
          onChange={(e) =>
            setNewLog({ ...newLog, participantId: e.target.value })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Message"
          value={newLog.message}
          onChange={(e) =>
            setNewLog({ ...newLog, message: e.target.value })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Sent At"
          type="datetime-local"
          value={newLog.sentAt}
          onChange={(e) => setNewLog({ ...newLog, sentAt: e.target.value })}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateLog}
        >
          Create Log
        </Button>
      </Box>

      {/* Get Communication Log by ID */}
      <Box mt={3}>
        <Typography variant="h6">Get Communication Log by ID</Typography>
        <TextField
          label="Log ID"
          value={logId}
          onChange={(e) => setLogId(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleGetLogById}
        >
          Fetch Log
        </Button>

        {selectedLog && (
          <Box mt={3} p={2} border={1} borderRadius={4}>
            <Typography variant="h6">Log Details</Typography>
            <Typography>Participant ID: {selectedLog.participantId?.name}</Typography>
            <Typography>Message: {selectedLog.message}</Typography>
            <Typography>Sent At: {new Date(selectedLog.sentAt).toLocaleString()}</Typography>
          </Box>
        )}
      </Box>

      {/* List All Communication Logs */}
      <Box mt={3}>
        <Typography variant="h6">All Communication Logs</Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          communicationLogs.map((log) => (
            <Box key={log._id} mt={2} p={2} border={1} borderRadius={4}>
              <Typography>
                Participant ID: {log.participantId?.name || "Unknown"}
              </Typography>
              <Typography>Message: {log.message}</Typography>
              <Typography>Sent At: {new Date(log.sentAt).toLocaleString()}</Typography>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default CommunicationLogComponent;
