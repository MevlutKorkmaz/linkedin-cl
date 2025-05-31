import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axiosInstance";
import MainLayout from "../components/layout/MainLayout";
import {
  Snackbar,
  Alert,
  Typography,
  Box,
} from "@mui/material";

import {
  getUserConnections,
  sendConnectionRequest,
} from "../api/connectionApi";

// Modular Components
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileEditor from "../components/Profile/ProfileEditor";
import ExperienceSection from "../components/Profile/ExperienceSection";
import EducationSection from "../components/Profile/EducationSection";
import ConnectionSection from "../components/Profile/ConnectionSection";
import PostSection from "../components/Profile/PostSection";

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

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(`/posts/user/${viewingUserId}`);
      setPosts(res.data.data);
    } catch {
      console.error("❌ Failed to load posts");
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
      <Box sx={{ maxWidth: 900, mx: "auto", px: 2, py: 4 }}>
        <ProfileHeader
          profile={profile}
          isOwnProfile={isOwnProfile}
          showEditor={showEditor}
          setShowEditor={setShowEditor}
          connectionStatus={connectionStatus}
          handleConnect={handleConnect}
        />

        {isOwnProfile && showEditor && (
          <ProfileEditor
            form={form}
            setForm={setForm}
            preview={preview}
            selectedFile={selectedFile}
            handleChange={handleChange}
            handleFileSelect={handleFileSelect}
            skillInput={skillInput}
            setSkillInput={setSkillInput}
            handleAddSkill={handleAddSkill}
            handleRemoveSkill={handleRemoveSkill}
            handleUpdate={handleUpdate}
          />
        )}

        <Box mt={4}>
          <Typography variant="subtitle1" fontWeight="bold">Bio</Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>{profile.bio || "No bio yet."}</Typography>

          <Typography variant="subtitle1" fontWeight="bold">Skills</Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            {profile.skills.map((skill, i) => (
              <Box key={i} sx={{ px: 1.5, py: 0.5, border: '1px solid gray', borderRadius: 1 }}>{skill}</Box>
            ))}
          </Box>
        </Box>

        <ExperienceSection
          experiences={profile.experiences}
          isOwnProfile={isOwnProfile}
          showAddExperience={showAddExperience}
          setShowAddExperience={setShowAddExperience}
          newExp={newExp}
          setNewExp={setNewExp}
          handleSubmitNewExperience={handleSubmitNewExperience}
          handleDeleteExperience={handleDeleteExperience}
        />

        <EducationSection
          education={profile.education}
          isOwnProfile={isOwnProfile}
          showAddEducation={showAddEducation}
          setShowAddEducation={setShowAddEducation}
          newEdu={newEdu}
          setNewEdu={setNewEdu}
          handleSubmitNewEducation={handleSubmitNewEducation}
          handleDeleteEducation={handleDeleteEducation}
        />

        <ConnectionSection
          connectionIds={profile.connectionIds}
          isOwnProfile={isOwnProfile}
        />

        <PostSection posts={posts} />
      </Box>

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
