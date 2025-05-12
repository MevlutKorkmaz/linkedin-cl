import { useEffect, useState } from "react";
import { Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import PostCard from "../components/PostCard";
import { getPublicPosts, likePost, sharePost } from "../api/postApi";

export default function Home() {
  const isAuthenticated = !!localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const [posts, setPosts] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", error: false });

  const fetchPosts = async () => {
    try {
      const res = await getPublicPosts();
      setPosts(res.data.reverse());
    } catch (err) {
      setSnackbar({ open: true, message: err.message, error: true });
    }
  };

  const handleLike = async (postId) => {
    if (!isAuthenticated) {
      setSnackbar({ open: true, message: "Login to like posts", error: true });
      return;
    }
    try {
      await likePost(postId, userId);
      fetchPosts();
    } catch (err) {
      setSnackbar({ open: true, message: err.message, error: true });
    }
  };

  const handleShare = async (postId) => {
    if (!isAuthenticated) {
      setSnackbar({ open: true, message: "Login to share posts", error: true });
      return;
    }
    try {
      await sharePost(postId, userId);
      fetchPosts();
    } catch (err) {
      setSnackbar({ open: true, message: err.message, error: true });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <MainLayout>
      <Typography variant="h4" mb={2}>
        {isAuthenticated ? "👋 Welcome Back!" : "🌐 Explore the Public Feed"}
      </Typography>

      {!isAuthenticated && (
        <Box mb={3}>
          <Button component={Link} to="/login" variant="contained" sx={{ mr: 2 }}>
            Login
          </Button>
          <Button component={Link} to="/register" variant="outlined">
            Register
          </Button>
        </Box>
      )}

      {posts.length === 0 ? (
        <Typography>No public posts yet.</Typography>
      ) : (
        posts.map((post) => (
          <PostCard key={post.id} post={post} onLike={handleLike} onShare={handleShare} />
        ))
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.error ? "error" : "success"}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </MainLayout>
  );
}
