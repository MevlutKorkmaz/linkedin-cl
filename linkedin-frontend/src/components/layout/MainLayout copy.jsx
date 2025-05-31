import { Box, CssBaseline } from "@mui/material";
import Sidebar from "../Sidebar";

export default function MainLayout({ children }) {
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex", backgroundColor: "#f3f2ef", minHeight: "100vh" }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3, md: 5 },
            pt: 3, // optional spacing from top (can be adjusted)
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
}
