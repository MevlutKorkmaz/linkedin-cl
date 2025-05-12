// src/pages/Connections.jsx

import { useEffect, useState } from "react";
import { getUserConnections, respondToConnectionRequest } from "../api/connectionApi";
import ConnectionCard from "../components/ConnectionCard";
import MainLayout from "../components/layout/MainLayout";
import { Typography, Box, CircularProgress, Snackbar, Alert } from "@mui/material";

export default function Connections() {
  const userId = localStorage.getItem("userId");
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", error: false });

  const loadConnections = async () => {
    try {
      const res = await getUserConnections(userId);
      setConnections(res.data);
    } catch (err) {
      setSnackbar({ open: true, message: err.message || "Failed to load connections", error: true });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConnections();
  }, []);

  const handleAccept = async (id) => {
    try {
      await respondToConnectionRequest(id, true);
      setConnections(prev => prev.map(c => c.id === id ? { ...c, status: "ACCEPTED" } : c));
      setSnackbar({ open: true, message: "Connection accepted", error: false });
    } catch (err) {
      setSnackbar({ open: true, message: err.message || "Failed to accept", error: true });
    }
  };

  const handleReject = async (id) => {
    try {
      await respondToConnectionRequest(id, false);
      setConnections(prev => prev.map(c => c.id === id ? { ...c, status: "REJECTED" } : c));
      setSnackbar({ open: true, message: "Connection rejected", error: false });
    } catch (err) {
      setSnackbar({ open: true, message: err.message || "Failed to reject", error: true });
    }
  };

  return (
    <MainLayout>
      <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          🔗 My Connections
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : connections.length === 0 ? (
          <Typography>No connections found.</Typography>
        ) : (
          connections.map(conn => (
            <ConnectionCard
              key={conn.id}
              connection={conn}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          ))
        )}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.error ? "error" : "success"} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </MainLayout>
  );
}
