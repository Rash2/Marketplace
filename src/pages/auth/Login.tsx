import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../App";

const theme = createTheme();

type LoginInfo = {
  username: string;
  password: string;
};

type LoginProps = {
    setUser: (user: User) => void;
}

const Login = ({setUser}: LoginProps) => {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChange = (
    key: string,
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const newVal = e.target.value;

    setLoginInfo({ ...loginInfo, [key]: newVal });
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  const navigateToPosts = () => {
    navigate("/app/posts");
  }

  const isDisabled = loginInfo.password === "" || loginInfo.username === "";

  const handleSubmit = () => {
    if (isDisabled) {
      return;
    }

    axios
      .post("http://localhost:8080/login", { ...loginInfo })
      .then((res) => {
        setUser(loginInfo)
        localStorage.setItem("user", JSON.stringify(loginInfo));
        navigateToPosts();
      })
      .catch((err) => console.error(err));
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://www.eneblur.com/blog/wp-content/uploads/2020/04/digitalmarketing.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={() => {}} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={(e) => onChange("username", e)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => onChange("password", e)}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isDisabled}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link onClick={navigateToRegister} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
