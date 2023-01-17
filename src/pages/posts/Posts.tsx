import { Typography } from "@material-ui/core";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import PostCard from "./components/PostCard";
import classes from "./styles/Posts.module.css";

export type Post = {
  id: string;
  total: number;
  title: string;
  ownerId: number;
  ownerUsername: string;
};

const Posts = () => {
  const userInfo: any = useContext(UserContext);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/posts", {
        auth: {
          ...userInfo.user,
        },
      })
      .then((res) => {
        if (res.data) {
            setPosts(res.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Welcome, {userInfo.user.username}, check out today's offers!
      </Typography>
      <div className={classes.postsContainer}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
