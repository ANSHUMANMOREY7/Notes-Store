import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Buttons/Button";


const AdminLogin = () => {

  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");
    if (isAuth === "true") {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogin = () => {
    if (password === "admin123") {
      localStorage.setItem("adminAuth", "true");
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

      <div className="bg-black/70 backdrop-blur-md p-10 rounded-2xl w-96 flex flex-col gap-4 shadow-xl transition duration-300 hover:scale-105 hover:bg-purple-900 z-10">
          <h2 className="text-2xl font-bold text-center">
            Admin Login
          </h2>

          <div className="flex flex-col gap-2">
            <input
              type="password"
              placeholder="Enter admin password"
              className="p-3 h-14 rounded bg-gray-800 outline-none w-full border border-transparent focus:border-purple-500 transition-all text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />

            {/* Using your custom Button component */}
            <Button 
              label="Login" 
              onClick={handleLogin} 
              className="full-width" 
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;