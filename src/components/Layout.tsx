import { useContext } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { UserContext } from "../App";
import Menu from "./Menu";
import Post from "../pages/posts/Post";
import Posts from "../pages/posts/Posts";
import Profile from "../pages/profile/Profile";
import classes from "./styles/Layout.module.css";

const Layout = () => {
  const user: any = useContext(UserContext);

  console.log("user", user);

  return (
    <div className={classes.container}>
      <Menu />
      <Routes>
        <Route path="posts" element={<Posts />} />
        <Route path="post/:id" element={<Post />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default Layout;
