import { Box, Card, CardContent, Typography, Stack, Button } from "@mui/material";

const ConnectionCard = ({ connection, onAccept, onReject }) => {
  const { id, requesterId, status, requestedAt } = connection;

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold">From: {requesterId}</Typography>
        <Typography>Status: {status}</Typography>
        <Typography variant="body2" color="text.secondary">
          Requested At: {new Date(requestedAt).toLocaleString()}
        </Typography>

        {status === "PENDING" && (
          <Stack direction="row" spacing={2} mt={2}>
            <Button variant="contained" color="success" onClick={() => onAccept(id)}>
              Accept
            </Button>
            <Button variant="outlined" color="error" onClick={() => onReject(id)}>
              Reject
            </Button>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default ConnectionCard;
