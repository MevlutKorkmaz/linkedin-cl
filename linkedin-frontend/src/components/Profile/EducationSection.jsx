import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function EducationSection({
  education,
  isOwnProfile,
  showAddEducation,
  setShowAddEducation,
  newEdu,
  setNewEdu,
  handleSubmitNewEducation,
  handleDeleteEducation,
}) {
  return (
    <Box mt={4}>
      <Typography variant="subtitle1" fontWeight="bold">Education</Typography>
      {(education || []).length === 0 ? (
        <Typography>No education added.</Typography>
      ) : (
        education.map((edu, i) => (
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
      )}

      {isOwnProfile && (
        <Box mt={2}>
          {!showAddEducation ? (
            <Button onClick={() => setShowAddEducation(true)}>+ Add Education</Button>
          ) : (
            <Box component="form" onSubmit={handleSubmitNewEducation} sx={{ mt: 2 }}>
              <TextField label="School" value={newEdu.school} onChange={(e) => setNewEdu({ ...newEdu, school: e.target.value })} fullWidth margin="dense" required />
              <TextField label="Degree" value={newEdu.degree} onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })} fullWidth margin="dense" required />
              <TextField label="Field" value={newEdu.field} onChange={(e) => setNewEdu({ ...newEdu, field: e.target.value })} fullWidth margin="dense" required />
              <Stack direction="row" spacing={2} mt={1}>
                <TextField label="Start Date" type="date" value={newEdu.startDate} onChange={(e) => setNewEdu({ ...newEdu, startDate: e.target.value })} InputLabelProps={{ shrink: true }} fullWidth required />
                <TextField label="End Date" type="date" value={newEdu.endDate} onChange={(e) => setNewEdu({ ...newEdu, endDate: e.target.value })} InputLabelProps={{ shrink: true }} fullWidth required />
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
  );
}
