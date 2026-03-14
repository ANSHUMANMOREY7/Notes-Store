import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const AdminLogin = () => {

  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "admin123") {
      navigate("/admin");
    } else {
      alert("Wrong password");
    }
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-purple-900 text-white">

      <div className="bg-black/70 backdrop-blur-md p-10 rounded-2xl w-96 flex flex-col gap-6">

        <h2 className="text-2xl font-bold text-center">
          Admin Login
        </h2>

        <input
          type="password"
          placeholder="Enter admin password"
          className="p-3 rounded bg-gray-800 outline-none w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-black p-3 rounded w-full hover:bg-gray-900 transition cursor-pointer"
        >
          Login
        </button>

      </div>

    </div>
    </>
  );
};

export default AdminLogin;