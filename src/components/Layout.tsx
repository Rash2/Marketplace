import { Route, Routes } from "react-router-dom";
import MyOffers from "../pages/my-offers/MyOffers";
import Post from "../pages/posts/Post";
import Posts from "../pages/posts/Posts";
import Profile from "../pages/profile/Profile";
import Menu from "./Menu";
import classes from "./styles/Layout.module.css";

const Layout = () => {
  return (
    <div className={classes.container}>
      <Menu />
      <Routes>
        <Route path="posts" element={<Posts />} />
        <Route path="post/:id" element={<Post />} />
        <Route path="profile" element={<Profile />} />
        <Route path="my-offers" element={<MyOffers />} />
      </Routes>
    </div>
  );
};

export default Layout;
