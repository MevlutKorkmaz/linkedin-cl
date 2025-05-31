import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
import ConnectionMiniProfile from "../components/ConnectionMiniProfile";
import { getUserConnections, sendConnectionRequest } from "../api/connectionApi";

export default function Profile() {
  const routeParams = useParams();
  const routeUserId = routeParams.userId;
  const loggedInUserId = localStorage.getItem("userId");

  const viewingUserId = routeUserId || loggedInUserId;
  const isOwnProfile = viewingUserId === loggedInUserId;

  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ userId: loggedInUserId, bio: "", profilePhotoId: "", skills: [] });
  const [skillInput, setSkillInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", error: false });
  const [showEditor, setShowEditor] = useState(false);
  const [showAddExperience, setShowAddExperience] = useState(false);
  const [newExp, setNewExp] = useState({
    title: "",
    companyName: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [showAddEducation, setShowAddEducation] = useState(false);
  const [newEdu, setNewEdu] = useState({
    school: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
  });
  const [posts, setPosts] = useState([]);


  const [connectionStatus, setConnectionStatus] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`/profile/${viewingUserId}`);
      const user = res.data.data;
      setProfile(user);
      if (isOwnProfile) {
        setForm({
          userId: loggedInUserId,
          bio: user.bio || "",
          profilePhotoId: user.profilePhotoId || "",
          skills: user.skills || [],
        });
      }

      // If viewing another user, load connection status
      if (!isOwnProfile) {
        const conRes = await getUserConnections(loggedInUserId);
        const match = conRes.data.find(
          (c) =>
            (c.requesterId === loggedInUserId && c.receiverId === viewingUserId) ||
            (c.requesterId === viewingUserId && c.receiverId === loggedInUserId)
        );
        setConnectionStatus(match?.status || "NONE");
      }
    } catch {
      setSnackbar({ open: true, message: "❌ Failed to load profile", error: true });
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchUserPosts();
  }, [viewingUserId]);


  const handleConnect = async () => {
    try {
      await sendConnectionRequest({
        requesterId: loggedInUserId,
        receiverId: viewingUserId,
      });
      setConnectionStatus("PENDING");
      setSnackbar({ open: true, message: "✅ Connection request sent!", error: false });
    } catch {
      setSnackbar({ open: true, message: "❌ Failed to send request", error: true });
    }
  };

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
  const handleSubmitNewExperience = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/profile/experience", {
        userId: loggedInUserId,
        ...newExp,
      });
      setSnackbar({ open: true, message: "✅ Experience added", error: false });
      setNewExp({ title: "", companyName: "", description: "", startDate: "", endDate: "" });
      setShowAddExperience(false);
      fetchProfile();
    } catch {
      setSnackbar({ open: true, message: "❌ Failed to add experience", error: true });
    }
  };
  const handleSubmitNewEducation = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/profile/education", {
        userId: loggedInUserId,
        ...newEdu,
      });
      setSnackbar({ open: true, message: "✅ Education added", error: false });
      setNewEdu({ school: "", degree: "", field: "", startDate: "", endDate: "" });
      setShowAddEducation(false);
      fetchProfile();
    } catch {
      setSnackbar({ open: true, message: "❌ Failed to add education", error: true });
    }
  };


  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(`/posts/user/${viewingUserId}`);
      setPosts(res.data.data);
    } catch {
      console.error("❌ Failed to load posts");
    }
  };

  const handleDeleteExperience = async (index) => {
    try {
      await axios.delete("/profile/experience", { data: { userId: loggedInUserId, index } });
      fetchProfile();
    } catch {
      setSnackbar({ open: true, message: "❌ Failed to delete experience", error: true });
    }
  };

  const handleDeleteEducation = async (index) => {
    try {
      await axios.delete("/profile/education", { data: { userId: loggedInUserId, index } });
      fetchProfile();
    } catch {
      setSnackbar({ open: true, message: "❌ Failed to delete education", error: true });
    }
  };

  if (!profile) return <MainLayout><Typography>Loading...</Typography></MainLayout>;

  return (
    <MainLayout>
      <Grid
        container
        spacing={4}
        sx={{
          px: { xs: 2, md: 4 },
          mt: 2,
          width: '100%',
        }}>



        <Grid item xs={12} md={7} lg={8}>




          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>


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
              </Box>
            </Stack>

            {isOwnProfile ? (
              <Button startIcon={<EditIcon />} sx={{ mt: 2 }} onClick={() => setShowEditor((prev) => !prev)}>
                {showEditor ? "Cancel" : "Edit Profile"}
              </Button>
            ) : (
              <Box mt={2}>
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
                ))
              }

              {isOwnProfile && (
                <Box mt={2}>
                  {!showAddExperience ? (
                    <Button onClick={() => setShowAddExperience(true)}>+ Add Experience</Button>
                  ) : (
                    <Box component="form" onSubmit={handleSubmitNewExperience} sx={{ mt: 2 }}>
                      <TextField
                        label="Title"
                        value={newExp.title}
                        onChange={(e) => setNewExp({ ...newExp, title: e.target.value })}
                        fullWidth margin="dense" required
                      />
                      <TextField
                        label="Company Name"
                        value={newExp.companyName}
                        onChange={(e) => setNewExp({ ...newExp, companyName: e.target.value })}
                        fullWidth margin="dense" required
                      />
                      <TextField
                        label="Description"
                        value={newExp.description}
                        onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
                        multiline rows={2}
                        fullWidth margin="dense"
                      />
                      <Stack direction="row" spacing={2} mt={1}>
                        <TextField
                          label="Start Date"
                          type="date"
                          value={newExp.startDate}
                          onChange={(e) => setNewExp({ ...newExp, startDate: e.target.value })}
                          InputLabelProps={{ shrink: true }}
                          fullWidth required
                        />
                        <TextField
                          label="End Date"
                          type="date"
                          value={newExp.endDate}
                          onChange={(e) => setNewExp({ ...newExp, endDate: e.target.value })}
                          InputLabelProps={{ shrink: true }}
                          fullWidth required
                        />
                      </Stack>
                      <Stack direction="row" spacing={2} mt={2}>
                        <Button type="submit" variant="contained">Save</Button>
                        <Button variant="outlined" onClick={() => setShowAddExperience(false)}>Cancel</Button>
                      </Stack>
                    </Box>
                  )}
                </Box>
              )}
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
                ))
              }

              {isOwnProfile && (
                <Box mt={2}>
                  {!showAddEducation ? (
                    <Button onClick={() => setShowAddEducation(true)}>+ Add Education</Button>
                  ) : (
                    <Box component="form" onSubmit={handleSubmitNewEducation} sx={{ mt: 2 }}>
                      <TextField
                        label="School"
                        value={newEdu.school}
                        onChange={(e) => setNewEdu({ ...newEdu, school: e.target.value })}
                        fullWidth margin="dense" required
                      />
                      <TextField
                        label="Degree"
                        value={newEdu.degree}
                        onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
                        fullWidth margin="dense" required
                      />
                      <TextField
                        label="Field"
                        value={newEdu.field}
                        onChange={(e) => setNewEdu({ ...newEdu, field: e.target.value })}
                        fullWidth margin="dense" required
                      />
                      <Stack direction="row" spacing={2} mt={1}>
                        <TextField
                          label="Start Date"
                          type="date"
                          value={newEdu.startDate}
                          onChange={(e) => setNewEdu({ ...newEdu, startDate: e.target.value })}
                          InputLabelProps={{ shrink: true }}
                          fullWidth required
                        />
                        <TextField
                          label="End Date"
                          type="date"
                          value={newEdu.endDate}
                          onChange={(e) => setNewEdu({ ...newEdu, endDate: e.target.value })}
                          InputLabelProps={{ shrink: true }}
                          fullWidth required
                        />
                      </Stack>
                      <Stack direction="row" spacing={2} mt={2}>
                        <Button type="submit" variant="contained">Save</Button>
                        <Button variant="outlined" onClick={() => setShowAddEducation(false)}>Cancel</Button>
                      </Stack>
                    </Box>
                  )}
                </Box>
              )}
            </Box>


            <Typography variant="subtitle1" fontWeight="bold">Connections</Typography>
            <Box>
              {isOwnProfile && (
                <Button
                  variant="outlined"
                  sx={{ mb: 2 }}
                  onClick={() => window.location.href = "/connections"}
                >
                  View All Connections
                </Button>
              )}

              {(profile.connectionIds || []).length === 0 ? (
                <Typography>No connections yet.</Typography>
              ) : (
                <Stack spacing={1} mt={1}>
                  {profile.connectionIds.map((id) => (
                    <Link key={id} to={`/profile/${id}`} style={{ textDecoration: "none" }}>
                      <ConnectionMiniProfile userId={id} />
                    </Link>

                  ))}
                </Stack>
              )}
            </Box>


            <Typography variant="subtitle1" fontWeight="bold" mt={4}>Posts</Typography>
            <Box>
              {posts.length === 0 ? (
                <Typography>This user has no posts yet.</Typography>
              ) : (
                posts.map((post) => (
                  <Paper key={post.id} sx={{ p: 2, mb: 2 }}>
                    <Typography variant="subtitle1">{post.content}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(post.createdAt).toLocaleString()}
                    </Typography>
                  </Paper>
                ))
              )}
            </Box>

          </Paper>
        </Grid>

        <Grid item xs={12} md={5} lg={4}>
          {isOwnProfile && showEditor ? (
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
          ) : (
            // Empty box just to preserve right column space
            <Box sx={{ height: "100%" }} />
          )}
        </Grid>

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
