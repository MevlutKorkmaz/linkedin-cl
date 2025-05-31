import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Grid,
  Tooltip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CommentIcon from "@mui/icons-material/Comment";

const PostCard = ({ post, onLike, onShare, onEdit, onDelete }) => {
  const currentUserId = localStorage.getItem("userId");
  const hasLiked = post.likedByUserIds?.includes(currentUserId);
  const hasShared = post.sharedByUserIds?.includes(currentUserId);
  const isOwner = post.userId === currentUserId;

  const authorName = post.firstName && post.lastName
    ? `${post.firstName} ${post.lastName}`
    : `User: ${post.userId}`;

  const profilePhotoUrl = post.profilePhotoId
    ? `http://localhost:8080${post.profilePhotoId}`
    : "";

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        avatar={
          <Avatar src={profilePhotoUrl}>
            {!profilePhotoUrl && post.firstName?.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={authorName}
        subheader={new Date(post.createdAt).toLocaleString()}
        action={
          isOwner && (
            <>
              <Tooltip title="Edit">
                <IconButton onClick={() => onEdit(post)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton onClick={() => onDelete(post.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
          )
        }
      />
      <CardContent>
        <Typography variant="body1" sx={{ mb: 1 }}>
          {post.content}
        </Typography>
        {post.imageIds?.length > 0 && (
          <Grid container spacing={1}>
            {post.imageIds.map((path) => (
              <Grid item key={path}>
                <img
                  src={`http://localhost:8080${path}`}
                  alt="Post"
                  style={{
                    width: "300px",
                    height: "auto",
                    borderRadius: "6px",
                    maxWidth: "100%",
                  }}
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

        <IconButton aria-label="comment">
          <CommentIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PostCard;
