import { useEffect, useState } from "react";
import {
  getUserConnections,
  respondToConnectionRequest,
  deleteConnection,
  sendConnectionRequest,
  searchUsers
} from "../api/connectionApi";
import ConnectionCard from "../components/ConnectionCard";
import ConnectionMiniProfile from "../components/ConnectionMiniProfile";
import MainLayout from "../components/layout/MainLayout";
import {
  Typography,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  Button,
  Stack,
  Tooltip,
  Divider,
} from "@mui/material";

export default function Connections() {
  const userId = localStorage.getItem("userId");
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", error: false });
  const [filter, setFilter] = useState("ALL");

  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [connectionMap, setConnectionMap] = useState({});

  const loadConnections = async () => {
    try {
      const res = await getUserConnections(userId);
      const connList = res || [];


      console.log("📡 Enriched connections from backend:", connList);
      console.table(connList.map(c => ({
        id: c.connectionId,
        status: c.status,
        requester: c.requester?.firstName + " " + c.requester?.lastName,
        receiver: c.receiver?.firstName + " " + c.receiver?.lastName,
        requestedAt: c.requestedAt
      })));

      setConnections(connList);

      const map = {};
      connList.forEach((conn) => {
        const otherId = conn.requester?.id === userId ? conn.receiver?.id : conn.requester?.id;
        if (otherId) map[otherId] = conn;
      });
      setConnectionMap(map);
    } catch (err) {
      console.error("❌ Failed to fetch connections:", err);
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
      await loadConnections();
      setSnackbar({ open: true, message: "Connection accepted", error: false });
    } catch (err) {
      console.error("❌ Accept error:", err);
      setSnackbar({ open: true, message: err.message || "Failed to accept", error: true });
    }
  };

  const handleReject = async (id) => {
    try {
      await respondToConnectionRequest(id, false);
      await loadConnections();
      setSnackbar({ open: true, message: "Connection rejected", error: false });
    } catch (err) {
      console.error("❌ Reject error:", err);
      setSnackbar({ open: true, message: err.message || "Failed to reject", error: true });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteConnection(id);
      await loadConnections();
      setSnackbar({ open: true, message: "Connection removed", error: false });
    } catch (err) {
      console.error("❌ Delete error:", err);
      setSnackbar({ open: true, message: err.message || "Failed to delete", error: true });
    }
  };

  const filtered = connections.filter((c) => {
    if (filter === "ALL") return true;
    if (filter === "ACCEPTED") return c.status === "ACCEPTED";
    if (filter === "PENDING") return c.status === "PENDING";
    if (filter === "INCOMING") return c.status === "PENDING" && c.receiver?.id === userId;
    if (filter === "OUTGOING") return c.status === "PENDING" && c.requester?.id === userId;
    return false;
  });

  const handleUserSearch = async () => {
    try {
      const results = await searchUsers(searchKeyword);
      setSearchResults(results.filter(u => u.id !== userId));
    } catch (err) {
      console.error("❌ User search error:", err);
      setSnackbar({ open: true, message: "User search failed", error: true });
    }
  };

  const handleSendRequest = async (receiverId) => {
    try {
      await sendConnectionRequest({ requesterId: userId, receiverId });
      await loadConnections();
      setSnackbar({ open: true, message: "Request sent", error: false });
    } catch (err) {
      console.error("❌ Send request error:", err);
      setSnackbar({ open: true, message: "Failed to send request", error: true });
    }
  };

  return (
    <MainLayout>
      <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
        <Typography variant="h4" gutterBottom>🔗 My Connections</Typography>

        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={(e, val) => val && setFilter(val)}
          sx={{ mb: 3 }}
        >
          <ToggleButton value="ALL">All</ToggleButton>
          <ToggleButton value="ACCEPTED">Accepted</ToggleButton>
          <ToggleButton value="PENDING">Pending</ToggleButton>
          <ToggleButton value="INCOMING">Incoming</ToggleButton>
          <ToggleButton value="OUTGOING">Outgoing</ToggleButton>
        </ToggleButtonGroup>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : filtered.length === 0 ? (
          <Typography>No connections found.</Typography>
        ) : (
          filtered.map(conn => (
            <ConnectionCard
              key={conn.id}
              connection={conn}
              onAccept={conn.status === "PENDING" && conn.receiver?.id === userId ? () => handleAccept(conn.id) : null}
              onReject={conn.status === "PENDING" && conn.receiver?.id === userId ? () => handleReject(conn.id) : null}
              onDelete={() => handleDelete(conn.id)}
            />

          ))
        )}

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" gutterBottom>🔍 Search Users</Typography>
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <TextField
            label="Enter name or email"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={handleUserSearch}>
            Search
          </Button>
        </Stack>

        {searchResults.length > 0 && (
          <Stack spacing={2}>
            {searchResults.map(user => (
              <Box key={user.id} display="flex" alignItems="center" justifyContent="space-between">
                <ConnectionMiniProfile userId={user.id} />
                <Box>
                  {connectionMap[user.id]?.status === "ACCEPTED" && (
                    <Tooltip title="Already connected">
                      <Button disabled color="success">Connected</Button>
                    </Tooltip>
                  )}
                  {connectionMap[user.id]?.status === "PENDING" && (
                    <Tooltip title="Pending">
                      <Button disabled color="warning">Pending</Button>
                    </Tooltip>
                  )}
                  {!connectionMap[user.id] && (
                    <Button variant="outlined" onClick={() => handleSendRequest(user.id)}>
                      Connect
                    </Button>
                  )}
                </Box>
              </Box>
            ))}
          </Stack>
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
