import { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import PostCard from "../components/PostCard";
import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "../api/axiosInstance";
import { getEnrichedPublicPosts } from "../api/postApi"; // Add this import
import {
  likePost,
  sharePost,
  getPublicPosts,
  createPost,
} from "../api/postApi";

export default function Feed() {
  const [form, setForm] = useState({
    userId: localStorage.getItem("userId"),
    content: "",
    location: "",
    private: false,
  });

  const [posts, setPosts] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", error: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imagePaths = [];

      for (const file of imageFiles) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post("/images/upload", formData);
        imagePaths.push(res.data.filePath); // use path, not just id
      }

      const res = await createPost({
        ...form,
        imageIds: imagePaths,
      });

      setSnackbar({ open: true, message: "✅ Post created", error: false });
      setForm({ ...form, content: "", location: "", private: false });
      setImageFiles([]);
      setImagePreviews([]);
      loadFeed();
    } catch (err) {
      setSnackbar({ open: true, message: err.message || "Failed to create post.", error: true });
    }
  };



  const loadFeed = async () => {
    try {
      const res = await getEnrichedPublicPosts(); // Use enriched endpoint here
      setPosts(res.data.reverse());
    } catch {
      setSnackbar({ open: true, message: "Failed to load posts", error: true });
    }
  };
  const handleLike = async (postId) => {
    try {
      await likePost(postId, form.userId);
      loadFeed();
    } catch (err) {
      setSnackbar({ open: true, message: err.message, error: true });
    }
  };

  const handleShare = async (postId) => {
    try {
      await sharePost(postId, form.userId);
      loadFeed();
    } catch (err) {
      setSnackbar({ open: true, message: err.message, error: true });
    }
  };

  useEffect(() => {
    loadFeed();
  }, []);

  return (
    <MainLayout>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>🖊️ Create Post</Typography>

        <TextField
          name="content"
          label="What's on your mind?"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          value={form.content}
          onChange={handleChange}
          required
        />

        <TextField
          name="location"
          label="Location"
          fullWidth
          margin="normal"
          value={form.location}
          onChange={handleChange}
        />

        <Box mt={2}>
          <Button variant="outlined" component="label">
            Upload Images
            <input
              hidden
              accept="image/*"
              type="file"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files);
                setImageFiles(files);
                setImagePreviews(files.map(file => URL.createObjectURL(file)));
              }}
            />
          </Button>

          <Stack direction="row" spacing={2} mt={2} flexWrap="wrap">
            {imagePreviews.map((src, i) => (
              <img key={i} src={src} alt="preview" style={{ width: 100, borderRadius: 8 }} />
            ))}
          </Stack>
        </Box>

        <FormControlLabel
          control={
            <Checkbox
              name="private"
              checked={form.private}
              onChange={handleChange}
            />
          }
          label="Private Post"
        />

        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained">Post</Button>
        </Box>
      </Box>

      <Typography variant="h6" gutterBottom>📰 Your Feed</Typography>
      {posts.length === 0 ? (
        <Typography>No posts yet.</Typography>
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
          severity={snackbar.error ? "error" : "success"}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </MainLayout>
  );
}
