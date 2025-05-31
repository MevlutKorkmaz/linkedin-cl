import { Box, CssBaseline, Container } from "@mui/material";
import Sidebar from "../Sidebar";
import { useAuth } from "../../context/AuthContext";
import { isAdmin, isCompany, isUser } from "../../utils/roleUtils";

export default function MainLayout({ children }) {
  const { role } = useAuth();

  const getBackgroundColor = () => {
    if (isAdmin(role)) return "#fff8e1";        // Light yellow for admin
    if (isCompany(role)) return "#e3f2fd";      // Light blue for company
    if (isUser(role)) return "#f3f2ef";         // Default for user
    return "#f3f2ef";                           // Fallback
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex", bgcolor: getBackgroundColor(), minHeight: "100vh" }}>
        <Sidebar />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3, md: 4 },
            mt: 2,
            width: "100%",
          }}
        >
          <Container maxWidth="lg">{children}</Container>
        </Box>
      </Box>
    </>
  );
}
