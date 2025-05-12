import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import PostCard from "../components/PostCard";
import axios from "../api/axiosInstance";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  MenuItem,
  Paper,
  Divider,
} from "@mui/material";

export default function Search() {
  const [type, setType] = useState("users"); // users, posts, jobs
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (type === "users") {
        res = await axios.get(`/search/users?keyword=${keyword}`);
      } else if (type === "posts") {
        res = await axios.get(`/search/posts?keyword=${keyword}`);
      } else {
        const params = new URLSearchParams();
        if (category) params.append("category", category);
        if (location) params.append("location", location);
        res = await axios.get(`/search/jobs?${params.toString()}`);
      }
      setResults(res.data.data);
    } catch (err) {
      alert("❌ Search failed");
    }
  };

  return (
    <MainLayout>
      <Paper sx={{ p: 3, maxWidth: 800, mx: "auto", borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>🔎 Search</Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <TextField
            select
            label="Search Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            sx={{ width: 200 }}
          >
            <MenuItem value="users">Users</MenuItem>
            <MenuItem value="posts">Posts</MenuItem>
            <MenuItem value="jobs">Jobs</MenuItem>
          </TextField>
        </Stack>

        <Box component="form" onSubmit={handleSearch} sx={{ mb: 3 }}>
          {(type === "users" || type === "posts") && (
            <TextField
              label="Keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
          )}

          {type === "jobs" && (
            <Stack spacing={2}>
              <TextField
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <TextField
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Stack>
          )}

          <Box mt={2}>
            <Button type="submit" variant="contained">
              Search
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6">Results:</Typography>
        {results.length === 0 ? (
          <Typography>No results found.</Typography>
        ) : (
          results.map((item, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              {type === "users" && (
                <Typography variant="body1">
                  👤 {item.firstName} {item.lastName} — {item.email}
                </Typography>
              )}

              {type === "posts" && (
                <PostCard post={item} onLike={() => { }} onShare={() => { }} />
              )}

              {type === "jobs" && (
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    📍 {item.location} — 📂 {item.category}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {item.description}
                  </Typography>
                </Paper>
              )}
            </Box>
          ))
        )}
      </Paper>
    </MainLayout>
  );
}
