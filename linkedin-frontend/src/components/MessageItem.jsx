import { Box, Paper, Typography } from "@mui/material";

const MessageItem = ({ message, currentUserId }) => {
  const isSentByCurrentUser = message.senderId === currentUserId;

  return (
    <Box sx={{ display: 'flex', justifyContent: isSentByCurrentUser ? 'flex-end' : 'flex-start', mb: 1 }}>
      <Paper
        elevation={1}
        sx={{
          px: 2,
          py: 1,
          maxWidth: '75%',
          backgroundColor: isSentByCurrentUser ? '#daf1da' : '#f1f1f1',
        }}
      >
        <Typography variant="body2">{message.content}</Typography>
        <Typography variant="caption" sx={{ display: 'block', textAlign: 'right' }}>
          {new Date(message.sentAt).toLocaleTimeString()}
        </Typography>
      </Paper>
    </Box>
  );
};

export default MessageItem;
