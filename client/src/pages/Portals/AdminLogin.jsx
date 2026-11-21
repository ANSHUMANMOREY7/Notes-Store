import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Buttons/Button";
import { toast } from 'react-hot-toast';
import { ShieldCheck } from "lucide-react";

const AdminLogin = () => {

  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 useEffect(() => {
    const isAuth = sessionStorage.getItem("adminAuth");
    if (isAuth === "true") {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogin = () => {
    if (password === "admin123") {
      toast.success("Login successful!");
      sessionStorage.setItem("adminAuth", "true");
      navigate("/admin");
    } else {
      toast.error("Wrong password!");
    }
  };
  return (
  <>
    <Navbar />

    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-black to-purple-900 text-white relative overflow-hidden px-5 pt-24 pb-12">

      {/* Page Heading */}
<div className="text-center px-4 mb-24 md:mb-10 -mt-20 md:mt-0">
  <h1 className="text-white font-[font1] font-bold text-4xl sm:text-4xl md:text-4xl">
    Admin Portal
  </h1>

  <p className="text-gray-300 mt-3 px-4 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto">
  Sign in to securely upload, organize, and manage study materials.
</p>
</div>

      {/* Admin Login Card */}
      <div className="admin-login-card bg-black/70 backdrop-blur-md p-8 sm:p-10 rounded-2xl w-full max-w-sm flex flex-col gap-5 shadow-xl transition duration-300 hover:scale-[1.02] hover:bg-purple-900 z-10">

        <ShieldCheck
          size={49}
          strokeWidth={1.5}
          className="text-purple-300 self-center"
        />

        <h2 className="text-2xl font-bold text-center">
          Admin Login
        </h2>

        <div className="flex flex-col gap-2">
          <input
            type="password"
            placeholder="Enter admin password"
            className="p-3 h-12 rounded bg-gray-800 outline-none w-full border border-transparent focus:border-purple-500 transition-all text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />

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