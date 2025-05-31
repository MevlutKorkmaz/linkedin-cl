import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ExperienceSection({
  experiences,
  isOwnProfile,
  showAddExperience,
  setShowAddExperience,
  newExp,
  setNewExp,
  handleSubmitNewExperience,
  handleDeleteExperience
}) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="subtitle1" fontWeight="bold">Experience</Typography>
      {(experiences || []).length === 0 ? <Typography>No experience yet.</Typography> :
        experiences.map((exp, i) => (
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
              <TextField label="Title" value={newExp.title} onChange={(e) => setNewExp({ ...newExp, title: e.target.value })} fullWidth margin="dense" required />
              <TextField label="Company Name" value={newExp.companyName} onChange={(e) => setNewExp({ ...newExp, companyName: e.target.value })} fullWidth margin="dense" required />
              <TextField label="Description" value={newExp.description} onChange={(e) => setNewExp({ ...newExp, description: e.target.value })} multiline rows={2} fullWidth margin="dense" />
              <Stack direction="row" spacing={2} mt={1}>
                <TextField label="Start Date" type="date" value={newExp.startDate} onChange={(e) => setNewExp({ ...newExp, startDate: e.target.value })} InputLabelProps={{ shrink: true }} fullWidth required />
                <TextField label="End Date" type="date" value={newExp.endDate} onChange={(e) => setNewExp({ ...newExp, endDate: e.target.value })} InputLabelProps={{ shrink: true }} fullWidth required />
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
  );
}
