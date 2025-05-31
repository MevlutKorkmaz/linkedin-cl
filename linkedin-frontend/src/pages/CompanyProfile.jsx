import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material";
import { getCompanyById, updateCompanyProfile } from "../api/companyApi";

export default function CompanyProfile() {
  const companyId = localStorage.getItem("userId");
  const [form, setForm] = useState({
    companyName: "",
    description: "",
    website: "",
    profilePhotoId: "",
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: "", error: false });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getCompanyById(companyId);
        setForm(res.data.data);
      } catch (err) {
        setSnackbar({
          open: true,
          message: err.message || "❌ Failed to fetch profile",
          error: true,
        });
      }
    };

    fetchProfile();
  }, [companyId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCompanyProfile(form);
      setSnackbar({ open: true, message: "✅ Profile updated", error: false });
    } catch (err) {
      setSnackbar({ open: true, message: err.message || "❌ Update failed", error: true });
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} sx={{ p: 4, width: 500 }}>
        <Typography variant="h5" gutterBottom>🏢 Company Profile</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Company Name"
            name="companyName"
            value={form.companyName}
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
            multiline
            rows={3}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Website"
            name="website"
            value={form.website}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Profile Photo ID"
            name="profilePhotoId"
            value={form.profilePhotoId}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Update Profile
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
