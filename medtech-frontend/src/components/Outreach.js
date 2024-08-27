import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Card, Typography } from "@mui/material";

const OutreachManager = () => {
  const [outreachCampaigns, setOutreachCampaigns] = useState([]);
  const [campaignName, setCampaignName] = useState("");
  const [targetDemographics, setTargetDemographics] = useState("");
  const [outreachId, setOutreachId] = useState("");
  const [singleOutreach, setSingleOutreach] = useState(null);
  const [updatedCampaignName, setUpdatedCampaignName] = useState("");
  const [updatedTargetDemographics, setUpdatedTargetDemographics] = useState("");

  useEffect(() => {
    // Fetch all outreach campaigns
    const fetchOutreachCampaigns = async () => {
      try {
        const response = await axios.get("/api/outreach");
        setOutreachCampaigns(response.data);
      } catch (error) {
        console.error("Error fetching outreach campaigns:", error);
      }
    };

    fetchOutreachCampaigns();
  }, []);

  // Create an outreach campaign
  const handleCreateOutreach = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/outreach/", {
        campaignName,
        targetDemographics,
      });
      alert("Outreach campaign created successfully.");
      setOutreachCampaigns([...outreachCampaigns, response.data]);
    } catch (error) {
      console.error("Error creating outreach campaign:", error);
    }
  };

  // Get outreach by ID
  const handleGetOutreachById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/outreach/${outreachId}`);
      setSingleOutreach(response.data);
    } catch (error) {
      console.error("Error fetching outreach by ID:", error);
    }
  };

  // Update outreach campaign
  const handleUpdateOutreach = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/outreach/${outreachId}`, {
        campaignName: updatedCampaignName,
        targetDemographics: updatedTargetDemographics,
      });
      alert("Outreach campaign updated successfully.");
      setOutreachCampaigns(
        outreachCampaigns.map((campaign) =>
          campaign._id === outreachId ? response.data : campaign
        )
      );
    } catch (error) {
      console.error("Error updating outreach campaign:", error);
    }
  };

  // Delete outreach campaign
  const handleDeleteOutreach = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/outreach/${id}`);
      alert("Outreach campaign deleted successfully.");
      setOutreachCampaigns(outreachCampaigns.filter((campaign) => campaign._id !== id));
    } catch (error) {
      console.error("Error deleting outreach campaign:", error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Outreach Campaign Management
      </Typography>

      <Card style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h5">Create Outreach Campaign</Typography>
        <TextField
          label="Campaign Name"
          variant="outlined"
          value={campaignName}
          onChange={(e) => setCampaignName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Target Demographics"
          variant="outlined"
          value={targetDemographics}
          onChange={(e) => setTargetDemographics(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleCreateOutreach}>
          Create Outreach
        </Button>
      </Card>

      <Card style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h5">Get Outreach by ID</Typography>
        <TextField
          label="Outreach ID"
          variant="outlined"
          value={outreachId}
          onChange={(e) => setOutreachId(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="secondary" onClick={handleGetOutreachById}>
          Get Outreach
        </Button>
        {singleOutreach && (
          <div style={{ marginTop: "20px" }}>
            <Typography variant="h6">Outreach Details:</Typography>
            <Typography>Coordinator: {singleOutreach.coordinator.name}</Typography>
            <Typography>Campaign Name: {singleOutreach.campaignName}</Typography>
            <Typography>Target Demographics: {singleOutreach.targetDemographics}</Typography>
          </div>
        )}
      </Card>

      <Card style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h5">Update Outreach Campaign</Typography>
        <TextField
          label="New Campaign Name"
          variant="outlined"
          value={updatedCampaignName}
          onChange={(e) => setUpdatedCampaignName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="New Target Demographics"
          variant="outlined"
          value={updatedTargetDemographics}
          onChange={(e) => setUpdatedTargetDemographics(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleUpdateOutreach}>
          Update Outreach
        </Button>
      </Card>

      <Card style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h5">All Outreach Campaigns</Typography>
        <ul>
          {outreachCampaigns.map((campaign) => (
            <li key={campaign._id}>
              {campaign.campaignName} - {campaign.targetDemographics}
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteOutreach(campaign._id)}
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

export default OutreachManager;
