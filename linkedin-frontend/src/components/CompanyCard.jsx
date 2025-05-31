import { Box, Card, CardContent, Typography, Stack, Button } from "@mui/material";
import ConnectionMiniProfile from "./ConnectionMiniProfile";

const ConnectionCard = ({ connection, onAccept, onReject, onDelete }) => {
  const { id, requesterId, receiverId, status, requestedAt, respondedAt } = connection;
  const userId = localStorage.getItem("userId");
  const isIncoming = status === "PENDING" && receiverId === userId;
  const isOutgoing = status === "PENDING" && requesterId === userId;
  const otherUserId = userId === requesterId ? receiverId : requesterId;

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <ConnectionMiniProfile userId={otherUserId} />

        <Typography>Status: {status}</Typography>
        <Typography variant="body2" color="text.secondary">
          Requested At: {new Date(requestedAt).toLocaleString()}
        </Typography>

        {respondedAt && (
          <Typography variant="body2" color="text.secondary">
            Responded At: {new Date(respondedAt).toLocaleString()}
          </Typography>
        )}

        <Stack direction="row" spacing={2} mt={2}>
          {isIncoming && (
            <>
              <Button variant="contained" color="success" onClick={() => onAccept?.(id)}>
                Accept
              </Button>
              <Button variant="outlined" color="error" onClick={() => onReject?.(id)}>
                Reject
              </Button>
            </>
          )}
          {(status !== "PENDING" || isOutgoing) && onDelete && (
            <Button variant="outlined" color="error" onClick={() => onDelete(id)}>
              {status === "ACCEPTED" ? "Remove" : "Cancel"}
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ConnectionCard;
