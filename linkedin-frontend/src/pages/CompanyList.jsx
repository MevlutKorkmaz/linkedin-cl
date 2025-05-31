import { useEffect, useState } from "react";
import { getAllCompanies } from "../api/companyApi";
import CompanyCard from "../components/CompanyCard";
import MainLayout from "../components/layout/MainLayout";
import {
  Typography,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

export default function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", error: false });

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await getAllCompanies();
        setCompanies(res.data.data);
      } catch (err) {
        setSnackbar({
          open: true,
          message: err.message || "❌ Failed to fetch companies",
          error: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <MainLayout>
      <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          🏢 Registered Companies
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : companies.length === 0 ? (
          <Typography>No companies found.</Typography>
        ) : (
          companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))
        )}

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
    </MainLayout>
  );
}
