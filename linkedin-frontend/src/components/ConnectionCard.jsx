import { Box, Card, CardContent, Typography, Stack, Button } from "@mui/material";
import { useEffect } from "react";

const ConnectionCard = ({ connection, onAccept, onReject, onDelete }) => {
  const userId = localStorage.getItem("userId");
  const { id, status, requestedAt, respondedAt, requester, receiver } = connection;

  // 🔍 Debug log
  useEffect(() => {
    console.log("📡 Connection Loaded:", connection);
  }, [connection]);

  const isIncoming = status === "PENDING" && receiver?.id === userId;
  const isOutgoing = status === "PENDING" && requester?.id === userId;

  // 🧠 Display name fallback
  const getDisplayName = (user) =>
    user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.id || "Unknown User";

  const targetUser =
    requester?.id === userId ? receiver || {} : requester || {};

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold">
          {isIncoming
            ? `🔽 Request from: ${getDisplayName(requester)}`
            : isOutgoing
              ? `📤 You sent a request to: ${getDisplayName(receiver)}`
              : `🤝 Connected with: ${getDisplayName(targetUser)}`}
        </Typography>

        <Typography>Status: {status}</Typography>

        <Typography variant="body2" color="text.secondary">
          Requested At: {requestedAt ? new Date(requestedAt).toLocaleString() : "Unknown"}
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
