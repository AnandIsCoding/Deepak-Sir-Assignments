import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async () => {
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // LOGIN REQUEST
        const res = await api.post("/user/login", { email, password });
        const data = res.data;

        if (data.success) {
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/notes");
        }
      } else {
        // SIGNUP REQUEST
        const res = await api.post("/user/signup", { name, email, password });
        const data = res.data;

        if (data.success) {
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/notes");
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-6">
      <div className=" p-1 rounded-2xl shadow-xl  max-w-md w-full text-center">

        <h1 className="text-3xl font-semibold text-white mb-6">
          {isLogin ? "Welcome Back 👋" : "Create an Account ✨"}
        </h1>

        {/* NAME (Only for Signup) */}
        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-3 px-4 py-3 rounded-xl bg-white/20 text-white outline-none border border-white/20 placeholder-gray-300 focus:border-white"
          />
        )}

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-4 py-3 rounded-xl bg-white/20 text-white outline-none border border-white/20 placeholder-gray-300 focus:border-white"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-xl bg-white/20 text-white outline-none border border-white/20 placeholder-gray-300 focus:border-white"
        />

        {/* ERROR MESSAGE */}
        {error && <p className="text-red-300 mb-3">{error}</p>}

        {/* SUBMIT BUTTON */}
        <button
          onClick={handleAuth}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-white text-gray-900 font-medium hover:bg-gray-200 transition-all duration-200 disabled:opacity-50"
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
        </button>

        {/* SWITCH MODE */}
        <p className="text-gray-300 mt-5">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-white underline ml-1 hover:text-gray-200"
          >
            {isLogin ? "Create one" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Auth;
