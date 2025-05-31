import { useState } from "react";
import { sendConnectionRequest } from "../api/connectionApi";
import MainLayout from "../components/layout/MainLayout";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";

export default function ConnectionRequest() {
  const [receiverId, setReceiverId] = useState("");
  const requesterId = localStorage.getItem("userId");

  const [snackbar, setSnackbar] = useState({ open: false, message: "", error: false });

  const handleSendRequest = async (e) => {
    e.preventDefault();
    try {
      const res = await sendConnectionRequest({ requesterId, receiverId });

      console.log("✅ Connection response:", res);

      setSnackbar({ open: true, message: res.message || "Request sent!", error: false });
      setReceiverId("");
    } catch (err) {
      console.error("❌ Connection request failed:", err);
      setSnackbar({
        open: true,
        message: err.message || "Failed to send connection request.",
        error: true,
      });
    }
  };

  return (
    <MainLayout>
      <Paper sx={{ p: 4, maxWidth: 600, mx: "auto", borderRadius: 3, mt: 4 }}>
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

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.error ? "error" : "success"} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </MainLayout>
  );
}
