import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Posts from "./pages/posts/Posts";
import { useNavigate } from "react-router-dom";
import Layout from "./components/Layout";

export type User = {
  username: string;
  password: string;
}

export const UserContext = createContext({});

const App = () => {

  const [user, setUser] = useState<User>({username: "", password: ""});
  const navigate = useNavigate();

  console.log("user", user)

  useEffect(() => {
    if(localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")!))
      navigate("/app/posts");
    }
  }, [])

  return (
    <Routes>
      <Route path="login" element={<Login setUser={setUser} />} />
      <Route path="register" element={<Register />} />
      <Route path="app/*" element={<UserContext.Provider value={{user, setUser}}><Layout /></UserContext.Provider>} />
      <Route path="" element={<Login setUser={setUser} />} />
    </Routes>
  );
};

export default App;
