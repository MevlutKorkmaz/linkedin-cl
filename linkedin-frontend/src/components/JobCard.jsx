// src/components/JobCard.jsx

import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { applyToJob } from "../api/jobApi";

export default function JobCard({ job, showApply = true }) {
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  const [applied, setApplied] = useState(job.applicants?.includes(userId));
  const [snackbar, setSnackbar] = useState({ open: false, message: "", error: false });

  const handleApply = async () => {
    try {
      await applyToJob(job.id, userId);
      setApplied(true);
      setSnackbar({ open: true, message: "✅ Successfully applied!", error: false });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || "❌ Failed to apply",
        error: true,
      });
    }
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6">{job.title}</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {job.location} • {job.isRemote ? "Remote" : "On-Site"}
        </Typography>
        <Typography variant="body2" mt={1}>
          {job.description}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Category: {job.category}
        </Typography>

        {showApply && role === "USER" && !applied && (
          <Box mt={2}>
            <Button variant="contained" onClick={handleApply}>Apply</Button>
          </Box>
        )}

        {applied && (
          <Box mt={2}>
            <Typography color="success.main">✅ Applied</Typography>
          </Box>
        )}
      </CardContent>

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
    </Card>
  );
}
