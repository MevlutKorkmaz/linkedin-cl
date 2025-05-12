import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  MenuItem,
  Paper,
} from "@mui/material";
import { registerUser } from "../api/authApi";

export default function RegisterUser() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "USER",
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: "", error: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);

      // ✅ Validate backend response structure
      if (!res.success || !res.data?.token) {
        throw new Error("Unexpected registration response");
      }

      // ✅ Store token info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("role", res.data.role);

      // ✅ Show success message
      setSnackbar({ open: true, message: res.message || "Registration successful!", error: false });

      // ✅ Redirect after short delay
      setTimeout(() => {
        navigate("/feed");
      }, 1500);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Registration failed";
      setSnackbar({ open: true, message: msg, error: true });
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" gutterBottom>
          📝 Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            name="firstName"
            label="First Name"
            value={form.firstName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="lastName"
            label="Last Name"
            value={form.lastName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="email"
            label="Email"
            value={form.email}
            onChange={handleChange}
            type="email"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="password"
            label="Password"
            value={form.password}
            onChange={handleChange}
            type="password"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            select
            name="role"
            label="Role"
            value={form.role}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="USER">User</MenuItem>
            <MenuItem value="COMPANY">Company</MenuItem>
          </TextField>

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
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
    </Box>
  );
}
