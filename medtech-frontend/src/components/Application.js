import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";

const ApplicationComponent = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newApplication, setNewApplication] = useState({
    participantId: "",
    trialId: "",
  });
  const [selectedTrialId, setSelectedTrialId] = useState("");
  const [statusUpdate, setStatusUpdate] = useState({
    id: "",
    status: "",
    decisionAt: "",
  });

  // Fetch Applications by Trial ID
  useEffect(() => {
    if (selectedTrialId) {
      fetchApplicationsByTrial(selectedTrialId);
    }
  }, [selectedTrialId]);

  const fetchApplicationsByTrial = async (trialId) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/applications/trial/${trialId}`);
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateApplication = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/applications/", newApplication);
      setApplications([...applications, response.data]);
      setNewApplication({ participantId: "", trialId: "" });
    } catch (error) {
      console.error("Error creating application:", error);
    }
  };

  const handleUpdateApplicationStatus = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/applications/${statusUpdate.id}`, {
        status: statusUpdate.status,
        decisionAt: statusUpdate.decisionAt,
      });
      const updatedApplications = applications.map((app) =>
        app._id === statusUpdate.id ? response.data : app
      );
      setApplications(updatedApplications);
      setStatusUpdate({ id: "", status: "", decisionAt: "" });
    } catch (error) {
      console.error("Error updating application:", error);
    }
  };

  const handleDeleteApplication = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/applications/${id}`);
      setApplications(applications.filter((app) => app._id !== id));
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4">Manage Applications</Typography>

      {/* Create Application */}
      <Box mt={3}>
        <Typography variant="h6">Create New Application</Typography>
        <TextField
          label="Participant ID"
          value={newApplication.participantId}
          onChange={(e) =>
            setNewApplication({ ...newApplication, participantId: e.target.value })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Trial ID"
          value={newApplication.trialId}
          onChange={(e) =>
            setNewApplication({ ...newApplication, trialId: e.target.value })
          }
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleCreateApplication}>
          Create Application
        </Button>
      </Box>

      {/* Update Application Status */}
      <Box mt={3}>
        <Typography variant="h6">Update Application Status</Typography>
        <TextField
          label="Application ID"
          value={statusUpdate.id}
          onChange={(e) => setStatusUpdate({ ...statusUpdate, id: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Status"
          value={statusUpdate.status}
          onChange={(e) =>
            setStatusUpdate({ ...statusUpdate, status: e.target.value })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Decision At"
          value={statusUpdate.decisionAt}
          onChange={(e) =>
            setStatusUpdate({ ...statusUpdate, decisionAt: e.target.value })
          }
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleUpdateApplicationStatus}
        >
          Update Status
        </Button>
      </Box>

      {/* Select Trial and Fetch Applications */}
      <Box mt={3}>
        <Typography variant="h6">Fetch Applications by Trial</Typography>
        <TextField
          label="Trial ID"
          value={selectedTrialId}
          onChange={(e) => setSelectedTrialId(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={() => fetchApplicationsByTrial(selectedTrialId)}>
          Fetch Applications
        </Button>
      </Box>

      {/* Display Applications */}
      <Box mt={3}>
        <Typography variant="h6">Applications</Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          applications.map((app) => (
            <Box key={app._id} mt={2} p={2} border={1} borderRadius={4}>
              <Typography>Participant ID: {app.participantId}</Typography>
              <Typography>Trial ID: {app.trialId}</Typography>
              <Typography>Status: {app.status || "Pending"}</Typography>
              <Typography>Decision At: {app.decisionAt || "N/A"}</Typography>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDeleteApplication(app._id)}
                sx={{ mt: 2 }}
              >
                Delete
              </Button>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default ApplicationComponent;
