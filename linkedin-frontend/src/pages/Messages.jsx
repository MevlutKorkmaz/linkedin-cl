import { useEffect, useRef, useState, useCallback } from "react";
import MainLayout from "../components/layout/MainLayout";
import MessageItem from "../components/MessageItem";
import { getUserConnections } from "../api/connectionApi";
import { sendMessage as sendMessageApi, getChatBetweenUsers } from "../api/messageApi";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { connectWebSocket, disconnectWebSocket } from "../utils/websocket";

export default function Messages() {
  const senderId = localStorage.getItem("userId");
  const [receiverId, setReceiverId] = useState("");
  const [content, setContent] = useState("");
  const [chat, setChat] = useState([]);
  const [connections, setConnections] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef();

  const generateMessageKey = (msg) => {
    if (msg.id) return msg.id;
    if (msg.senderId && msg.receiverId && msg.sentAt)
      return `${msg.senderId}-${msg.receiverId}-${new Date(msg.sentAt).getTime()}`;
    return `fallback-${msg.senderId}-${msg.sentAt || Math.random().toString(36)}`;
  };

  const loadMessages = useCallback(async () => {
    if (!receiverId) return;
    setLoading(true);
    setChat([]);
    try {
      const res = await getChatBetweenUsers(senderId, receiverId);
      const chatData = Array.isArray(res?.data?.data) ? res.data.data : [];
      setChat(chatData);
    } catch (err) {
      console.error("❌ Failed to load messages:", err);
      setSnackbar({ open: true, message: "❌ Failed to load messages", severity: "error" });
    } finally {
      setLoading(false);
    }
  }, [senderId, receiverId]);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!receiverId) {
      setSnackbar({ open: true, message: "❗ Please select a user first", severity: "warning" });
      return;
    }

    if (!content.trim()) {
      setSnackbar({ open: true, message: "❗ Message cannot be empty", severity: "warning" });
      return;
    }

    try {
      const res = await sendMessageApi({ senderId, receiverId, content });
      const newMessage = res.data.data;
      setChat((prev) => [...prev, newMessage]);
      setContent("");
    } catch (err) {
      console.error("❌ Failed to send message:", err);
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "❌ Failed to send message.",
        severity: "error",
      });
    }
  };

  const handleNewMessage = useCallback(
    (msg) => {
      const isRelevant =
        (msg.senderId === senderId && msg.receiverId === receiverId) ||
        (msg.senderId === receiverId && msg.receiverId === senderId);
      if (isRelevant) {
        setChat((prev) => {
          const exists = prev.some((m) => m.id === msg.id);
          return exists ? prev : [...prev, msg];
        });
      }
    },
    [senderId, receiverId]
  );

  useEffect(() => {
    if (!senderId) return;
    connectWebSocket(senderId, handleNewMessage);
    return () => disconnectWebSocket();
  }, [senderId, handleNewMessage]);

  useEffect(() => {
    if (receiverId) {
      loadMessages();
    }
  }, [receiverId, loadMessages]);

  useEffect(() => {
    let mounted = true;
    const fetchConnections = async () => {
      try {
        const data = await getUserConnections(senderId);
        const filtered = data.filter((conn) => {
          const otherUser =
            conn.requester?.id === senderId ? conn.receiver : conn.requester;
          return otherUser?.id && otherUser?.firstName;
        });

        if (mounted) {
          setConnections(filtered);
          if (!receiverId && filtered.length > 0) {
            const defaultUser =
              filtered[0].requester?.id === senderId
                ? filtered[0].receiver
                : filtered[0].requester;
            setReceiverId(defaultUser?.id);
          }
        }
      } catch (err) {
        console.error("❌ Failed to fetch connections:", err);
        setSnackbar({
          open: true,
          message: "❌ Failed to load your connections",
          severity: "error",
        });
      }
    };
    fetchConnections();
    return () => {
      mounted = false;
    };
  }, [senderId]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <MainLayout>
      <Box sx={{ display: "flex", gap: 2 }}>
        {/* Chat List */}
        <Box sx={{ width: 250, borderRight: "1px solid #ccc", p: 2 }}>
          <Typography variant="h6" gutterBottom>💬 Chats</Typography>
          {connections.length === 0 ? (
            <Typography variant="body2" color="text.secondary">No connections found</Typography>
          ) : (
            connections.map((conn) => {
              const otherUser =
                conn.requester?.id === senderId ? conn.receiver : conn.requester;
              const id = otherUser?.id;

              return (
                <Button
                  key={id}
                  variant={receiverId === id ? "contained" : "text"}
                  onClick={() => setReceiverId(id)}
                  fullWidth
                  sx={{ justifyContent: "flex-start", mb: 1 }}
                >
                  {otherUser?.firstName} {otherUser?.lastName}
                </Button>
              );
            })
          )}
        </Box>

        {/* Chat Window */}
        <Paper sx={{ p: 3, flex: 1, borderRadius: 3 }}>
          <Typography variant="h5" gutterBottom>📨 Chat</Typography>

          <Box
            ref={chatBoxRef}
            sx={{
              maxHeight: "300px",
              overflowY: "auto",
              border: "1px solid #ccc",
              borderRadius: 2,
              p: 2,
              mb: 2,
              background: "#fafafa",
            }}
          >
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress />
              </Box>
            ) : chat.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                {receiverId ? "Start the conversation 👋" : "Select a user to chat"}
              </Typography>
            ) : (
              chat.map((msg) => (
                <MessageItem
                  key={generateMessageKey(msg)}
                  message={msg}
                  currentUserId={senderId}
                />
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
              <Button variant="contained" type="submit" disabled={!receiverId}>
                Send
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </MainLayout>
  );
}
