import { Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Post } from "../Posts";
import classes from "../styles/PostCard.module.css";

type PostCardProps = {
  post: Post;
};

const PostCard = ({ post }: PostCardProps) => {

    const navigate = useNavigate();

    const goToPostPage = () => {
        navigate(`/app/post/${post.id}`)
    }

  return (
    <Paper className={classes.postCardContainer}>
      <img
        className={classes.image}
        src="https://barbqvillage.com/wp-content/uploads/woocommerce-placeholder.png"
      />
      <div className={classes.infoContainer}>
        <div className={classes.descriptionContainer}>
          <Typography variant="h6">{post.title}</Typography>
          <Typography> Sold by {post.ownerUsername}</Typography>
          <Typography fontWeight={600}>{post.total} lei</Typography>
        </div>
        <div className={classes.viewMore}><Button onClick={goToPostPage}>View</Button></div>
      </div>
    </Paper>
  );
};

export default PostCard;
