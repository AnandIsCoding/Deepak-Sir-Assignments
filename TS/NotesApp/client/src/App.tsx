import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import api from "./api";

import Home from "./pages/Home";
import Notes from "./pages/Notes";
import Auth from "./pages/Auth";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/user/getprofile");
        const data = res.data;

        if (data.success && data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/notes");
        }
      } catch (err) {
        console.log("Not authenticated");
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
