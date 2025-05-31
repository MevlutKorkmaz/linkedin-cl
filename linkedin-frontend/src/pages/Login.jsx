import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../api/authApi";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(form);
      login(data.data); // from context

      const userRole = data.data.role;
      if (userRole === "ADMIN") {
        navigate("/admin");
      } else if (userRole === "COMPANY") {
        navigate("/jobs/create");
      } else {
        navigate("/feed");
      }
    } catch (err) {
      setErrorMsg(err.message || "Login failed.");
      setOpen(true);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f3f2ef",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: 400,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >


        <form onSubmit={handleSubmit}>
          <TextField
            name="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>

        <Typography variant="body2" align="center" mt={2}>
          Don’t have an account? <Link to="/register">Register</Link>
        </Typography>
        <Typography variant="body2" align="center">
          Forgot your password? <Link to="/forgot-password">Reset Password</Link>
        </Typography>

      </Paper>

      <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
        <Alert severity="error" variant="filled" onClose={() => setOpen(false)}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
