import classes from "./styles/Menu.module.css";
import Button from "@mui/material/Button";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";

const Menu = () => {
  const navigate = useNavigate();

  const userInfo: any = useContext(UserContext);

  const onLogout = () => {
    userInfo.setUser({ username: "", password: "" });
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className={classes.container}>
      <div className={classes.leftButtons}>
        <Button variant="contained" onClick={() => navigate("/app/posts")}>
          Posts
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("/app/my-offers")}
          style={{ marginLeft: "16px" }}
        >
          My offers
        </Button>
      </div>
      <div className={classes.rightButtons}>
        <Button variant="contained" onClick={() => navigate("/app/profile")}>Profile</Button>
        <Button
          variant="outlined"
          color="warning"
          style={{ marginLeft: "16px" }}
          onClick={onLogout}
        >
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default Menu;
