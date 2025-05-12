import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

const PostCard = ({ post, onLike, onShare }) => {
  const currentUserId = localStorage.getItem("userId");
  const hasLiked = post.likedByUserIds?.includes(currentUserId);
  const hasShared = post.sharedByUserIds?.includes(currentUserId);

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        avatar={<Avatar>{post.userId?.charAt(0).toUpperCase()}</Avatar>}
        title={`User: ${post.userId}`}
        subheader={new Date(post.createdAt).toLocaleString()}
      />
      <CardContent>
        <Typography variant="body1">{post.content}</Typography>
        {post.imageIds?.length > 0 && (
          <Grid container spacing={1} sx={{ mt: 1 }}>
            {post.imageIds.map((path) => (
              <Grid item key={path}>
                <img
                  src={`http://localhost:8080${path}`} // ✅ now uses full filePath
                  alt="Post"
                  style={{ width: "300px", height: "auto", borderRadius: "6px" }}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          onClick={() => onLike(post.id)}
          aria-label="like"
          color={hasLiked ? "error" : "default"}
        >
          <FavoriteIcon />
        </IconButton>
        <Typography>{post.likedByUserIds?.length || 0}</Typography>

        <IconButton
          onClick={() => onShare(post.id)}
          aria-label="share"
          color={hasShared ? "primary" : "default"}
        >
          <ShareIcon />
        </IconButton>
        <Typography>{post.sharedByUserIds?.length || 0}</Typography>
      </CardActions>
    </Card>
  );
};

export default PostCard;
