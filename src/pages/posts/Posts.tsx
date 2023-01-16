import { Typography } from "@material-ui/core";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import PostCard from "./components/PostCard";
import classes from "./styles/Posts.module.css";

export type Post = {
  id: string;
  requestPrice: number;
  title: string;
  ownerId: number;
  ownerUsername: string;
  ownerMail: string;
  ownerPhone: string;
};

const Posts = () => {
  const userInfo: any = useContext(UserContext);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      ownerId: 2,
      ownerMail: "mail",
      ownerPhone: "07696969696",
      ownerUsername: "username",
      requestPrice: 200,
      title: "Cumpar bombe",
    },
    {
      id: "2",
      ownerId: 2,
      ownerMail: "mail2",
      ownerPhone: "07696969696",
      ownerUsername: "username",
      requestPrice: 300,
      title: "Cumpar tancuri",
    },
    {
      id: "3",
      ownerId: 2,
      ownerMail: "mail",
      ownerPhone: "07696969696",
      ownerUsername: "username",
      requestPrice: 200,
      title: "Cumpar bombe",
    },
    {
      id: "4",
      ownerId: 2,
      ownerMail: "mail2",
      ownerPhone: "07696969696",
      ownerUsername: "username",
      requestPrice: 300,
      title: "Cumpar tancuri",
    },
    
  ]);

  console.log("user", userInfo);

  useEffect(() => {
    axios
      .get("http://localhost:8080/my-offers", {
        auth: {
          ...userInfo.user,
        },
      })
      .then((res) => {
        if (res.data) {
          //   setPosts(res.data);
          console.log(res.data);
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
