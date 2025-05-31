// src/pages/JobList.jsx

import { useEffect, useState } from "react";
import { getAllJobs } from "../api/jobApi";
import JobCard from "../components/JobCard";
import MainLayout from "../components/layout/MainLayout";
import {
  Typography,
  CircularProgress,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", error: false });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getAllJobs();
        setJobs(res.data);
      } catch (err) {
        setSnackbar({
          open: true,
          message: err.message || "❌ Failed to load jobs",
          error: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <MainLayout>
      <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          💼 Job Listings
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : jobs.length === 0 ? (
          <Typography>No jobs found.</Typography>
        ) : (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        )}

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
    </MainLayout>
  );
}
