import { Box, Typography, Paper } from "@mui/material";

const MessageItem = ({ message, currentUserId }) => {
  const isSentByCurrentUser = message.senderId === currentUserId;

  // Debug log
  console.log("📦 Rendering MessageItem:", message);

  return (
    <Box display="flex" justifyContent={isSentByCurrentUser ? "flex-end" : "flex-start"} mb={1}>
      <Box maxWidth="70%">
        {/* Show sender label only for received messages */}
        {!isSentByCurrentUser && (
          <Typography variant="caption" color="text.secondary">
            {message.senderName || message.senderId || "Them"}
          </Typography>
        )}
        <Paper
          elevation={2}
          sx={{
            p: 1,
            backgroundColor: isSentByCurrentUser ? "#d4edda" : "#f1f1f1",
          }}
        >
          <Typography variant="body2">
            {message.content || <em>⚠️ No content</em>}
          </Typography>
          <Typography variant="caption" sx={{ display: "block", textAlign: "right" }}>
            {message.sentAt
              ? new Date(message.sentAt).toLocaleTimeString()
              : "Unknown time"}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default MessageItem;
