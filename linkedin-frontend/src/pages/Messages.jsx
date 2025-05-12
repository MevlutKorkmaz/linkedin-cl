import { useEffect, useRef, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import MessageItem from "../components/MessageItem";
import axios from "../api/axiosInstance";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Paper,
  Divider,
} from "@mui/material";

export default function Messages() {
  const senderId = localStorage.getItem("userId");
  const [receiverId, setReceiverId] = useState("");
  const [content, setContent] = useState("");
  const [chat, setChat] = useState([]);
  const chatBoxRef = useRef();

  const loadMessages = async () => {
    if (!receiverId.trim()) return;
    try {
      const res = await axios.get(`/messages/chat?user1=${senderId}&user2=${receiverId}`);
      setChat(res.data.data);
    } catch (err) {
      alert("❌ Failed to load messages");
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/messages", {
        senderId,
        receiverId,
        content,
      });
      alert("✅ Message sent");
      setContent("");
      loadMessages();
    } catch (err) {
      alert(err.response?.data?.message || "❌ Failed to send message.");
    }
  };

  useEffect(() => {
    if (receiverId) loadMessages();
  }, [receiverId]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <MainLayout>
      <Paper sx={{ p: 3, maxWidth: "800px", mx: "auto", borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>📨 Chat</Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
          <TextField
            label="Receiver ID"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
            fullWidth
            required
          />
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Box
          ref={chatBoxRef}
          sx={{
            maxHeight: "300px",
            overflowY: "auto",
            border: "1px solid #ccc",
            borderRadius: 2,
            p: 2,
            mb: 2,
            background: "#fafafa"
          }}
        >
          {chat.length === 0 ? (
            <Typography variant="body2" color="text.secondary">No messages yet.</Typography>
          ) : (
            chat.map((msg) => (
              <MessageItem key={msg.id} message={msg} currentUserId={senderId} />
            ))
          )}
        </Box>

        <form onSubmit={handleSend}>
          <TextField
            multiline
            rows={3}
            fullWidth
            label="Your message"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <Box textAlign="right">
            <Button variant="contained" type="submit">
              Send
            </Button>
          </Box>
        </form>
      </Paper>
    </MainLayout>
  );
}
