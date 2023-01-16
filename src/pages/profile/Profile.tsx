import { Avatar, Paper } from "@material-ui/core";
import { Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import classes from "./styles/Profile.module.css";

type UserInformation = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
};

const Profile = () => {
  const { user }: any = useContext(UserContext);
  const [userInformation, setUserInformation] =
    useState<UserInformation | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/profile", {
        auth: {
          ...user,
        },
      })
      .then((res) => {
        setUserInformation(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={classes.container}>
      <Typography variant="h4">My profile</Typography>
      <Paper elevation={3} className={classes.profilePaper}>
        {!userInformation ? (
          <Typography>No information available</Typography>
        ) : (
          <>
            <Avatar
              style={{ width: "100px", height: "100px" }}
            >
              {userInformation.username.toUpperCase().slice(0, 1)}
            </Avatar>
            <Typography fontSize={20} fontWeight={600}>
              Your name:{" "}
              {`${userInformation.firstName} ${userInformation.lastName}`}
            </Typography>
            <Typography fontSize={20} fontWeight={600}>
              Your username: {userInformation.username}
            </Typography>
            <Typography fontSize={20} fontWeight={600}>
              Your email address: {userInformation.email}
            </Typography>
            <Typography fontSize={20} fontWeight={600}>
              Your phone no.: {userInformation.phone}
            </Typography>
          </>
        )}
      </Paper>
    </div>
  );
};

export default Profile;
