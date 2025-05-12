import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Box,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isAdmin, isCompany } from "../utils/roleUtils";

const drawerWidth = 240;

export default function Sidebar() {
  const { role } = useAuth();

  const links = [
    { label: "My Profile", to: "/profile" },
    { label: "News Feed", to: "/feed" },
    { label: "Connections", to: "/connections" },
    { label: "Messages", to: "/messages" },
    { label: "Search", to: "/search" },
    { label: "Job Listings", to: "/jobs" },
    ...(isCompany(role) ? [{ label: "Post Job", to: "/jobs/create" }] : []),
    ...(isAdmin(role) ? [{ label: "Admin Panel", to: "/admin" }] : []),
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {links.map(({ label, to }) => (
            <ListItem key={label} disablePadding>
              <ListItemButton component={Link} to={to}>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
