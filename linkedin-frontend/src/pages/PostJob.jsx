// src/pages/PostJob.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Paper,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { createJob } from "../api/jobApi";

export default function PostJob() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const companyId = localStorage.getItem("userId");

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    isRemote: false,
    companyId,
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: "", error: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e) => {
    setForm((prev) => ({ ...prev, isRemote: e.target.checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createJob(form);
      setSnackbar({ open: true, message: "✅ Job posted successfully!", error: false });
      setTimeout(() => navigate("/jobs"), 1500);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || "❌ Failed to post job",
        error: true,
      });
    }
  };

  if (role !== "COMPANY") {
    return (
      <Box p={4}>
        <Typography variant="h6">⛔ Only company accounts can post jobs.</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} sx={{ p: 4, width: 500 }}>
        <Typography variant="h5" gutterBottom>📢 Post a Job</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            required
            margin="normal"
          />
          <TextField
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={form.isRemote}
                onChange={handleCheckbox}
                name="isRemote"
              />
            }
            label="Remote Job"
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Post Job
          </Button>
        </form>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.error ? "error" : "success"}
          variant="filled"
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
