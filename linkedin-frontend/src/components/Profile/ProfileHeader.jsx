import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function ProfileHeader({ profile, isOwnProfile, showEditor, setShowEditor, connectionStatus, handleConnect }) {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar
        src={profile.profilePhotoId ? `http://localhost:8080${profile.profilePhotoId}` : ""}
        sx={{ width: 72, height: 72, fontSize: 28 }}
      >
        {profile.firstName?.charAt(0)}
      </Avatar>
      <Box>
        <Typography variant="h6">
          {profile.firstName} {profile.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {profile.email}
        </Typography>

        {isOwnProfile ? (
          <Button startIcon={<EditIcon />} sx={{ mt: 1 }} onClick={() => setShowEditor((prev) => !prev)}>
            {showEditor ? "Cancel" : "Edit Profile"}
          </Button>
        ) : (
          <Box mt={1}>
            {connectionStatus === "ACCEPTED" && (
              <Button disabled color="success" variant="outlined">Connected</Button>
            )}
            {connectionStatus === "PENDING" && (
              <Button disabled color="warning" variant="outlined">Request Sent</Button>
            )}
            {connectionStatus === "NONE" && (
              <Button onClick={handleConnect} variant="contained">Connect</Button>
            )}
          </Box>
        )}
      </Box>
    </Stack>
  );
}
