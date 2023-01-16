import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type RegisterInfo = {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
};

const theme = createTheme();

const Register = () => {
  const navigate = useNavigate();

  const [registerInfo, setRegisterInfo] = useState<RegisterInfo>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    phone: "",
    username: "",
  });

  const onChange = (
    key: string,
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const newVal = e.target.value;

    setRegisterInfo({ ...registerInfo, [key]: newVal });
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const isDisabled =
    registerInfo.email === "" ||
    registerInfo.firstName === "" ||
    registerInfo.lastName === "" ||
    registerInfo.password === "" ||
    registerInfo.phone === "" ||
    registerInfo.username === "";

  const handleSubmit = () => {
    if (isDisabled) {
      return;
    }

    axios.post("http://localhost:8080/register", {...registerInfo}).then((res) => {
        navigateToLogin();
    }).catch(err => console.error(err));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={() => {}} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => onChange("firstName", e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => onChange("lastName", e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => onChange("email", e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  onChange={(e) => onChange("username", e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => onChange("password", e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="phone"
                  required
                  fullWidth
                  id="phone"
                  label="Phone number"
                  autoFocus
                  onChange={(e) => onChange("phone", e)}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isDisabled}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={navigateToLogin} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
