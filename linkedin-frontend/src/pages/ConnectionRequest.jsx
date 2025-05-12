import { useState } from "react";
import axios from "../api/axiosInstance";
import MainLayout from "../components/layout/MainLayout";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
} from "@mui/material";

export default function ConnectionRequest() {
  const [receiverId, setReceiverId] = useState("");
  const requesterId = localStorage.getItem("userId");

  const handleSendRequest = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/connections", {
        requesterId,
        receiverId,
      });
      alert("✅ Connection request sent: " + res.data.message);
      setReceiverId("");
    } catch (err) {
      alert(err.response?.data?.message || "❌ Failed to send connection request.");
    }
  };

  return (
    <MainLayout>
      <Paper sx={{ p: 4, maxWidth: 600, mx: "auto", borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>🔗 Send Connection Request</Typography>
        <form onSubmit={handleSendRequest}>
          <Stack spacing={2} mt={2}>
            <TextField
              label="Receiver User ID"
              value={receiverId}
              onChange={(e) => setReceiverId(e.target.value)}
              required
              fullWidth
            />
            <Button variant="contained" type="submit">
              Connect
            </Button>
          </Stack>
        </form>
      </Paper>
    </MainLayout>
  );
}
