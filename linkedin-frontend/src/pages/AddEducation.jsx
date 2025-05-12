import { useState } from "react";
import { TextField, Button, Box, Snackbar, Alert, Typography } from "@mui/material";
import axios from "../api/axiosInstance";
import MainLayout from "../components/layout/MainLayout";

export default function AddEducation() {
  const [form, setForm] = useState({
    userId: localStorage.getItem("userId"),
    school: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: "", error: false });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/profile/education", form);
      setSnackbar({ open: true, message: "✅ Education added", error: false });
      setForm({ ...form, school: "", degree: "", field: "", startDate: "", endDate: "" });
    } catch (err) {
      setSnackbar({ open: true, message: "❌ Failed to add education", error: true });
    }
  };

  return (
    <MainLayout>
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: "auto" }}>
        <Typography variant="h6" gutterBottom>Add Education</Typography>
        <TextField fullWidth name="school" label="School" value={form.school} onChange={handleChange} margin="normal" required />
        <TextField fullWidth name="degree" label="Degree" value={form.degree} onChange={handleChange} margin="normal" required />
        <TextField fullWidth name="field" label="Field of Study" value={form.field} onChange={handleChange} margin="normal" />
        <TextField fullWidth name="startDate" label="Start Date" type="date" InputLabelProps={{ shrink: true }} value={form.startDate} onChange={handleChange} margin="normal" />
        <TextField fullWidth name="endDate" label="End Date" type="date" InputLabelProps={{ shrink: true }} value={form.endDate} onChange={handleChange} margin="normal" />
        <Box mt={2} textAlign="right">
          <Button variant="contained" type="submit">Save</Button>
        </Box>
      </Box>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.error ? "error" : "success"} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </MainLayout>
  );
}
