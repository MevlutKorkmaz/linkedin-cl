import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import MainLayout from "../components/layout/MainLayout";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Paper,
  Divider,
  Stack,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

export default function AdminPanel() {
  const navigate = useNavigate();
  const { role } = useAuth();

  const [userId, setUserId] = useState("");
  const [postId, setPostId] = useState("");
  const [commentId, setCommentId] = useState("");
  const [block, setBlock] = useState(true);

  useEffect(() => {
    if (role !== "ADMIN") {
      alert("Access denied. Admins only.");
      navigate("/");
    }
  }, [role, navigate]);

  const handleBlockUser = async () => {
    try {
      await axios.put("/admin/block-user", { userId, block });
      alert(`✅ User ${block ? "blocked" : "unblocked"}`);
    } catch (err) {
      alert("❌ Failed to block/unblock user.");
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`/admin/delete-post/${postId}`);
      alert("✅ Post deleted.");
    } catch (err) {
      alert("❌ Failed to delete post.");
    }
  };

  const handleDeleteComment = async () => {
    try {
      await axios.delete(`/admin/delete-comment/${commentId}`);
      alert("✅ Comment deleted.");
    } catch (err) {
      alert("❌ Failed to delete comment.");
    }
  };

  return (
    <MainLayout>
      <Paper sx={{ p: 4, maxWidth: 800, mx: "auto", borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>🛡 Admin Panel</Typography>
        <Divider sx={{ mb: 3 }} />

        {/* Block/Unblock User */}
        <Box mb={4}>
          <Typography variant="h6" gutterBottom>🚫 Block / Unblock User</Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center" mb={2}>
            <TextField
              label="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              fullWidth
            />
            <Select
              value={block}
              onChange={(e) => setBlock(e.target.value === "true")}
              size="small"
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="true">Block</MenuItem>
              <MenuItem value="false">Unblock</MenuItem>
            </Select>
            <Button variant="contained" onClick={handleBlockUser}>
              Apply
            </Button>
          </Stack>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Delete Post */}
        <Box mb={4}>
          <Typography variant="h6" gutterBottom>❌ Delete Post</Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
            <TextField
              label="Post ID"
              value={postId}
              onChange={(e) => setPostId(e.target.value)}
              fullWidth
            />
            <Button variant="contained" color="error" onClick={handleDeletePost}>
              Delete Post
            </Button>
          </Stack>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Delete Comment */}
        <Box>
          <Typography variant="h6" gutterBottom>❌ Delete Comment</Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
            <TextField
              label="Comment ID"
              value={commentId}
              onChange={(e) => setCommentId(e.target.value)}
              fullWidth
            />
            <Button variant="contained" color="error" onClick={handleDeleteComment}>
              Delete Comment
            </Button>
          </Stack>
        </Box>
      </Paper>
    </MainLayout>
  );
}
