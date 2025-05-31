import { Box, Button, Chip, Stack, TextField, Typography } from "@mui/material";

export default function ProfileEditor({
  form,
  setForm,
  preview,
  selectedFile,
  handleChange,
  handleFileSelect,
  skillInput,
  setSkillInput,
  handleAddSkill,
  handleRemoveSkill,
  handleUpdate
}) {
  return (
    <Box component="form" onSubmit={handleUpdate} sx={{ mt: 4 }}>
      <Typography variant="h6" mb={2}>🛠 Update Profile</Typography>
      <TextField name="bio" label="Bio" multiline rows={3} fullWidth value={form.bio} onChange={handleChange} margin="normal" />
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
        <TextField label="Add Skill" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} size="small" />
        <Button onClick={handleAddSkill} variant="outlined">Add</Button>
      </Stack>

      <Stack direction="row" spacing={1} flexWrap="wrap" mt={2}>
        {form.skills.map((skill, idx) => (
          <Chip key={idx} label={skill} onDelete={() => handleRemoveSkill(idx)} color="secondary" variant="outlined" />
        ))}
      </Stack>

      <Box mt={4} textAlign="right">
        <Button type="submit" variant="contained">Save Changes</Button>
      </Box>
    </Box>
  );
}
