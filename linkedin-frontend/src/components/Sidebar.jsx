import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isAdmin, isCompany, isUser } from "../utils/roleUtils";

const drawerWidth = 240;

export default function Sidebar() {
  const { role } = useAuth();
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap>
          LinkedIn Clone
        </Typography>
      </Toolbar>
      <Divider />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {/* 🔁 Common navigation */}
          {isAuthenticated && (
            <>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/profile">
                  <ListItemText primary="My Profile" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component={Link} to="/messages">
                  <ListItemText primary="Messages" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component={Link} to="/search">
                  <ListItemText primary="Search" />
                </ListItemButton>
              </ListItem>
            </>
          )}

          {/* 👤 Normal User only */}
          {isUser(role) && (
            <>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/feed">
                  <ListItemText primary="News Feed" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component={Link} to="/connections">
                  <ListItemText primary="Connections" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component={Link} to="/jobs">
                  <ListItemText primary="Job Listings" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component={Link} to="/companies">
                  <ListItemText primary="Browse Companies" />
                </ListItemButton>
              </ListItem>
            </>
          )}

          {/* 🏢 Company only */}
          {isCompany(role) && (
            <>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/jobs/create">
                  <ListItemText primary="Post Job" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component={Link} to="/company/profile">
                  <ListItemText primary="My Company Profile" />
                </ListItemButton>
              </ListItem>
            </>
          )}

          {/* 🛠 Admin only */}
          {isAdmin(role) && (
            <>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/admin">
                  <ListItemText primary="Admin Panel" />
                </ListItemButton>
              </ListItem>
            </>
          )}

          <Divider sx={{ my: 1 }} />

          {/* 🔐 Auth-based navigation */}
          {isAuthenticated ? (
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          ) : (
            <>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/login">
                  <ListItemText primary="Login" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component={Link} to="/register">
                  <ListItemText primary="Register" />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </Drawer>
  );
}
