import { Box, Paper, Typography, Stack } from "@mui/material";

export default function PostSection({ posts }) {
  return (
    <Box mt={4}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Posts
      </Typography>

      {posts.length === 0 ? (
        <Typography>This user has no posts yet.</Typography>
      ) : (
        posts.map((post) => (
          <Paper
            key={post.id}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 3,
              boxShadow: 2,
              backgroundColor: "#fefefe",
            }}
          >
            <Stack spacing={1}>
              {/* ✅ Display author name if available */}
              {post.user?.firstName && post.user?.lastName && (
                <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">
                  {post.user.firstName} {post.user.lastName}
                </Typography>
              )}

              <Typography variant="subtitle1" fontWeight="medium">
                {post.content}
              </Typography>

              {/* Render post images if present */}
              {post.imageIds && post.imageIds.length > 0 && (
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  {post.imageIds.map((imgPath, i) => (
                    <img
                      key={i}
                      src={`http://localhost:8080${imgPath}`}
                      alt={`post-img-${i}`}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        borderRadius: 8,
                        marginTop: 8,
                      }}
                    />
                  ))}
                </Stack>
              )}

              <Typography variant="caption" color="text.secondary">
                {new Date(post.createdAt).toLocaleString()}
              </Typography>
            </Stack>
          </Paper>
        ))
      )}
    </Box>
  );
}
