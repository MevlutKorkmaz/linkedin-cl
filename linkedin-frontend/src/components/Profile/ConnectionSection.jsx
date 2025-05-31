import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ConnectionMiniProfile from "../ConnectionMiniProfile";

export default function ConnectionSection({ connectionIds, isOwnProfile }) {
  return (
    <Box mt={4}>
      <Typography variant="subtitle1" fontWeight="bold">Connections</Typography>

      {isOwnProfile && (
        <Button
          variant="outlined"
          sx={{ mb: 2 }}
          onClick={() => window.location.href = "/connections"}
        >
          View All Connections
        </Button>
      )}

      {(connectionIds || []).length === 0 ? (
        <Typography>No connections yet.</Typography>
      ) : (
        <Stack spacing={1}>
          {connectionIds.map((id) => (
            <Link key={id} to={`/profile/${id}`} style={{ textDecoration: "none" }}>
              <ConnectionMiniProfile userId={id} />
            </Link>
          ))}
        </Stack>
      )}
    </Box>
  );
}
