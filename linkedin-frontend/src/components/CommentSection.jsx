import { useState, useEffect } from 'react';
import axios from '../api/axiosInstance';
import { Box, Typography, TextField, Button, Paper, Stack } from '@mui/material';

const CommentSection = ({ postId, userId }) => {
  const [comments, setComments] = useState([]);
  const [newContent, setNewContent] = useState('');

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/comments/post/${postId}`);
      setComments(response.data.data || []);
    } catch (error) {
      console.error('Error loading comments:', error.message);
    }
  };

  const addComment = async () => {
    if (!newContent.trim()) return;
    try {
      await axios.post('/comments', {
        content: newContent,
        userId,
        postId,
      });
      setNewContent('');
      fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <Box mt={2}>
      <Typography variant="subtitle1" fontWeight="bold">Comments</Typography>
      <Stack spacing={2} mt={1}>
        {comments.map((comment) => (
          <Paper key={comment.id} sx={{ p: 2 }}>
            <Typography variant="body2">
              <strong>{comment.userId}</strong>: {comment.content}
            </Typography>
          </Paper>
        ))}
      </Stack>

      <Stack direction="row" spacing={2} mt={2}>
        <TextField
          placeholder="Add a comment..."
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          fullWidth
          size="small"
        />
        <Button variant="contained" onClick={addComment}>
          Post
        </Button>
      </Stack>
    </Box>
  );
};

export default CommentSection;
