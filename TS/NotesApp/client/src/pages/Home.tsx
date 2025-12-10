import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/user/profile");
        const data = res.data;

        if (data.success && data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          setIsLoggedIn(true);  // <-- mark as logged in
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.log("User not logged in");
        setIsLoggedIn(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-6">
      <div className="p-1 text-center max-w-md w-full">

        <h1 className="text-3xl font-semibold text-white mb-4 tracking-wide">
          Welcome ✨
        </h1>

        <p className="text-gray-300 mb-8 leading-relaxed">
          A simple, clean notes app. <br />
          If you're logged in, you'll see the button to create notes.
        </p>

        {isLoggedIn ? (
          <button
            onClick={() => navigate("/notes")}
            className="w-full cursor-pointer py-3 mt-2 text-lg font-medium rounded-xl bg-white text-gray-900 hover:bg-gray-200 transition-all duration-200"
          >
            Go to Notes
          </button>
        ) : (
          <button
            onClick={() => navigate("/auth")}
            className="w-full cursor-pointer py-3 mt-2 text-lg font-medium rounded-xl bg-white text-gray-900 hover:bg-gray-200 transition-all duration-200"
          >
            Get Started
          </button>
        )}

      </div>
    </div>
  );
}

export default Home;
