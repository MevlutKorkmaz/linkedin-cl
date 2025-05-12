// src/pages/Logout.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";

export default function Logout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    const timer = setTimeout(() => {
      navigate("/login");
    }, 2000); // wait 2s to show snackbar

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)}>
      <Alert
        severity="success"
        variant="filled"
        onClose={() => setOpen(false)}
      >
        ✅ You have been logged out.
      </Alert>
    </Snackbar>
  );
}
