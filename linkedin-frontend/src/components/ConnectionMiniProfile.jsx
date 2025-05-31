import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { Avatar, Box, Typography, Paper, Skeleton } from "@mui/material";

export default function ConnectionMiniProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`/profile/${userId}`)
      .then(res => setUser(res.data.data))
      .catch(() => setUser(null));
  }, [userId]);

  if (!user) {
    return <Skeleton variant="rounded" height={50} />;
  }

  return (
    <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar
          src={user.profilePhotoId ? `http://localhost:8080${user.profilePhotoId}` : ""}
        >
          {user.firstName?.charAt(0)}
        </Avatar>
        <Box>
          <Typography fontWeight="bold">
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
