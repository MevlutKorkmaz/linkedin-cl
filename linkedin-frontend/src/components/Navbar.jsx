import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const isAuthenticated = !!localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          LinkedIn Clone
        </Typography>

        {isAuthenticated ? (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" component={Link} to="/feed">Feed</Button>
            <Button color="inherit" component={Link} to="/messages">Messages</Button>
            <Button color="inherit" component={Link} to="/connections">Connections</Button> {/* ✅ NEW LINK */}
            <Button color="inherit" component={Link} to="/search">Search</Button>
            {role === "ADMIN" && (
              <Button color="inherit" component={Link} to="/admin">Admin</Button>
            )}
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
