import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "../api/axiosInstance";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/forgot-password", { email });
      setMsg("📧 If your account exists, a reset link has been sent.");
      setError(false);
    } catch (err) {
      setMsg(err.response?.data?.message || "Something went wrong.");
      setError(true);
    }
    setOpen(true);
  };

  return (
    <Box sx={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" color="primary" align="center" gutterBottom>
          🔒 Forgot Password
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter your email"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button type="submit" fullWidth variant="contained">
            Send Reset Link
          </Button>
        </form>
      </Paper>

      <Snackbar open={open} autoHideDuration={5000} onClose={() => setOpen(false)}>
        <Alert severity={error ? "error" : "success"} onClose={() => setOpen(false)} variant="filled">
          {msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
