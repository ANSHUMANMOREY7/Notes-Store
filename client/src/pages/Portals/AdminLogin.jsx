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
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-purple-900 text-white relative overflow-hidden">
    <div className="absolute inset-0 z-0">

  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"10%",left:"20%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"15%",left:"50%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"20%",left:"80%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"30%",left:"10%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"40%",left:"70%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"50%",left:"30%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"60%",left:"90%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"70%",left:"40%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"80%",left:"60%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"90%",left:"15%"}}></div>

  <div className="absolute w-2 h-2 bg-purple-300 rounded-full animate-pulse" style={{top:"25%",left:"45%"}}></div>
  <div className="absolute w-2 h-2 bg-blue-200 rounded-full animate-pulse" style={{top:"55%",left:"75%"}}></div>

</div>

      <div className="bg-black/70 backdrop-blur-md p-10 rounded-2xl w-96 flex flex-col gap-6 transition duration-300  hover:scale-105 transition duration-300">

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