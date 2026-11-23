import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Buttons/Button";
import { toast } from 'react-hot-toast';
import { ShieldCheck } from "lucide-react";

const AdminLogin = () => {

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

useEffect(() => {
  const token = sessionStorage.getItem("adminToken");

  if (token) {
    navigate("/admin", { replace: true });
  }
}, [navigate]);

  
const handleSendOtp = async () => {
  if (!email.trim()) {
    return toast.error("Please enter your email");
  }

  setLoading(true);

  try {
    const response = await fetch(
      "http://localhost:5000/api/auth/request-login-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send OTP");
    }

    toast.success("OTP sent to your email!");
    setOtpSent(true);

  } catch (error) {
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
};


const handleVerifyOtp = async () => {
  if (!/^\d{6}$/.test(otp)) {
    return toast.error("Enter a valid 6-digit OTP");
  }

  setLoading(true);

  try {
    const response = await fetch(
      "http://localhost:5000/api/auth/verify-login-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          otp,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Invalid OTP");
    }

    // Store JWT after successful verification
    sessionStorage.setItem("adminToken", data.token);

    toast.success("Login successful!");
    navigate("/admin", { replace: true });

  } catch (error) {
    toast.error(error.message);
  } finally {
    setLoading(false);
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
  type="email"
  placeholder="Enter registered email"
  className="p-3 h-12 rounded bg-gray-800 outline-none w-full border border-transparent focus:border-purple-500 transition-all text-white"
  value={email}
  disabled={otpSent || loading}
  onChange={(e) => setEmail(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter" && !otpSent && !loading) {
      handleSendOtp();
    }
  }}
/>


{/* OTP Input - appears after OTP is sent */}
{otpSent && (
  <input
    type="text"
    inputMode="numeric"
    maxLength={6}
    placeholder="Enter 6-digit OTP"
    className="p-3 h-12 rounded bg-gray-800 outline-none w-full border border-transparent focus:border-purple-500 transition-all text-white"
    value={otp}
    onChange={(e) =>
      setOtp(e.target.value.replace(/\D/g, ""))
    }
    onKeyDown={(e) => {
      if (e.key === "Enter" && !loading) {
        handleVerifyOtp();
      }
    }}
  />
)}


          
<Button
  label={
    loading
      ? "Please wait..."
      : otpSent
      ? "Verify & Login"
      : "Send OTP"
  }
  onClick={
    loading
      ? () => {}
      : otpSent
      ? handleVerifyOtp
      : handleSendOtp
  }
  className="full-width"
/>

{otpSent && (
  <button
    type="button"
    className="text-sm text-purple-300 hover:text-white"
    onClick={() => {
      setOtpSent(false);
      setOtp("");
    }}
  >
    Change Email
  </button>
)}

        </div>

      </div>
    </div>
  </>
);
};

export default AdminLogin;