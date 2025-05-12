// ✅ Updated Profile.jsx with Toggle Edit Section
import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import MainLayout from "../components/layout/MainLayout";
import {
  Avatar,
  Box,
  Typography,
  Chip,
  Stack,
  Divider,
  TextField,
  Button,
  Grid,
  Paper,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Profile() {
  const userId = localStorage.getItem("userId");

  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ userId, bio: "", profilePhotoId: "", skills: [] });
  const [skillInput, setSkillInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", error: false });
  const [showEditor, setShowEditor] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`/profile/${userId}`);
      const user = res.data.data;
      setProfile(user);
      setForm({
        userId,
        bio: user.bio || "",
        profilePhotoId: user.profilePhotoId || "",
        skills: user.skills || [],
      });
    } catch (err) {
      setSnackbar({ open: true, message: "❌ Failed to load profile", error: true });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const isOwnProfile = profile && profile.id === userId;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setForm((prev) => ({ ...prev, skills: [...prev.skills, skillInput.trim()] }));
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (i) => {
    setForm((prev) => ({ ...prev, skills: prev.skills.filter((_, idx) => idx !== i) }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      let filePath = form.profilePhotoId;
      if (selectedFile) {
        const imageForm = new FormData();
        imageForm.append("file", selectedFile);
        const res = await axios.post("/images/upload", imageForm);
        filePath = res.data.filePath;
      }
      const updatedForm = { ...form, profilePhotoId: filePath };
      await axios.put("/profile/update", updatedForm);
      setSnackbar({ open: true, message: "✅ Profile updated", error: false });
      fetchProfile();
      setShowEditor(false);
    } catch {
      setSnackbar({ open: true, message: "❌ Update failed", error: true });
    }
  };

  const handleDeleteExperience = async (index) => {
    try {
      await axios.delete("/profile/experience", { data: { userId, index } });
      fetchProfile();
    } catch {
      setSnackbar({ open: true, message: "❌ Failed to delete experience", error: true });
    }
  };

  const handleDeleteEducation = async (index) => {
    try {
      await axios.delete("/profile/education", { data: { userId, index } });
      fetchProfile();
    } catch {
      setSnackbar({ open: true, message: "❌ Failed to delete education", error: true });
    }
  };

  if (!profile) return <MainLayout><Typography>Loading...</Typography></MainLayout>;

  return (
    <MainLayout>
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                src={profile.profilePhotoId ? `http://localhost:8080${profile.profilePhotoId}` : ""}
                sx={{ width: 72, height: 72, fontSize: 28 }}
              >{profile.firstName?.charAt(0)}</Avatar>
              <Box>
                <Typography variant="h6">
                  {profile.firstName} {profile.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {profile.email}
                </Typography>
              </Box>
            </Stack>

            {isOwnProfile && (
              <Button
                startIcon={<EditIcon />}
                sx={{ mt: 2 }}
                onClick={() => setShowEditor((prev) => !prev)}
              >
                {showEditor ? "Cancel" : "Edit Profile"}
              </Button>
            )}

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" fontWeight="bold">Bio</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>{profile.bio || "No bio yet."}</Typography>

            <Typography variant="subtitle1" fontWeight="bold">Skills</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
              {(profile.skills || []).map((skill, i) => (
                <Chip key={i} label={skill} color="primary" variant="outlined" />
              ))}
            </Stack>

            <Typography variant="subtitle1" fontWeight="bold">Experience</Typography>
            <Box sx={{ mb: 2 }}>
              {(profile.experiences || []).length === 0 ? <Typography>No experience yet.</Typography> :
                profile.experiences.map((exp, i) => (
                  <Box key={i} sx={{ mb: 1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="start">
                      <Box>
                        <strong>{exp.title}</strong> at {exp.companyName}<br />
                        <small>{exp.startDate} → {exp.endDate}</small><br />
                        <Typography variant="body2">{exp.description}</Typography>
                      </Box>
                      {isOwnProfile && (
                        <IconButton onClick={() => handleDeleteExperience(i)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Stack>
                  </Box>
                ))}
            </Box>

            <Typography variant="subtitle1" fontWeight="bold">Education</Typography>
            <Box>
              {(profile.education || []).length === 0 ? <Typography>No education added.</Typography> :
                profile.education.map((edu, i) => (
                  <Box key={i} sx={{ mb: 1 }}>
                    <Stack direction="row" justifyContent="space-between">
                      <Box>
                        <strong>{edu.school}</strong> — {edu.degree} in {edu.field}<br />
                        <small>{edu.startDate} → {edu.endDate}</small>
                      </Box>
                      {isOwnProfile && (
                        <IconButton onClick={() => handleDeleteEducation(i)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Stack>
                  </Box>
                ))}
            </Box>
          </Paper>
        </Grid>

        {/* RIGHT: Update Form (conditionally shown) */}
        {isOwnProfile && showEditor && (
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
              <Typography variant="h6" mb={2}>🛠 Update Profile</Typography>
              <Box component="form" onSubmit={handleUpdate}>
                <TextField
                  name="bio"
                  label="Bio"
                  multiline
                  rows={3}
                  fullWidth
                  value={form.bio}
                  onChange={handleChange}
                  margin="normal"
                />

                <Button variant="outlined" component="label" sx={{ mt: 2 }}>
                  Upload Profile Image
                  <input type="file" hidden onChange={handleFileSelect} accept="image/*" />
                </Button>

                {preview && (
                  <Box mt={2}>
                    <Typography variant="body2" color="text.secondary">Preview:</Typography>
                    <img src={preview} alt="Preview" width={100} style={{ borderRadius: 8 }} />
                  </Box>
                )}

                <Stack direction="row" spacing={2} alignItems="center" mt={2}>
                  <TextField
                    label="Add Skill"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    size="small"
                  />
                  <Button onClick={handleAddSkill} variant="outlined">Add</Button>
                </Stack>

                <Stack direction="row" spacing={1} flexWrap="wrap" mt={2}>
                  {form.skills.map((skill, idx) => (
                    <Chip
                      key={idx}
                      label={skill}
                      onDelete={() => handleRemoveSkill(idx)}
                      color="secondary"
                      variant="outlined"
                    />
                  ))}
                </Stack>

                <Box mt={4} textAlign="right">
                  <Button type="submit" variant="contained">Save Changes</Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.error ? "error" : "success"}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </MainLayout>
  );
}
