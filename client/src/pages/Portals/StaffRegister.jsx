import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Buttons/Button";
import { toast } from "react-hot-toast";
import { ShieldCheck } from "lucide-react";
const API_URL = import.meta.env.VITE_API_URL;

const StaffRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

const navigate = useNavigate();

const handleSendOtp = async () => {

  if (!name.trim() || !email.trim()) {
    return toast.error("Please enter your name and email");
  }

  setLoading(true);

  try {
    const response = await fetch(
      "`${API_URL}/api/auth/register`",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send OTP");
    }

    toast.success(data.message);
    setOtpSent(true);

  } catch (error) {
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
};

const handleVerifyOtp = async () => {
  if (!/^\d{6}$/.test(otp)) {
    return toast.error("Please enter a valid 6-digit OTP");
  }

  setLoading(true);

  try {
    const response = await fetch(
      `${API_URL}/api/auth/verify-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          otp: otp.trim(),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "OTP verification failed");
    }

    toast.success(data.message || "Registration successful!");

    navigate("/admin-login");

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
<div className="text-center px-4 mb-10 mt-0">
        <h1 className="text-white font-[font1] font-bold text-4xl sm:text-4xl md:text-4xl">
          Staff Registration
        </h1>

        <p className="text-gray-300 mt-3 px-4 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto">
          Create your staff account to securely manage study materials.
        </p>
      </div>

      {/* Registration Card */}
      <div className="admin-login-card bg-black/70 backdrop-blur-md p-8 sm:p-10 rounded-2xl w-full max-w-sm flex flex-col gap-5 shadow-xl transition duration-300 hover:scale-[1.02] hover:bg-purple-900 z-10">

        <ShieldCheck
          size={49}
          strokeWidth={1.5}
          className="text-purple-300 self-center"
        />

        <h2 className="text-2xl font-bold text-center">
          Create Staff Account
        </h2>

        <div className="flex flex-col gap-2">

          {/* Name */}
          <input
            type="text"
            placeholder="Enter full name"
            className="p-3 h-12 rounded bg-gray-800 outline-none w-full border border-transparent focus:border-purple-500 transition-all text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Enter approved email"
            className="p-3 h-12 rounded bg-gray-800 outline-none w-full border border-transparent focus:border-purple-500 transition-all text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* OTP - shown after requesting registration */}
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
            />
          )}

          
<Button
  label={
    loading
      ? "Please wait..."
      : otpSent
      ? "Verify & Register"
      : "Send OTP"
  }
  onClick={otpSent ? handleVerifyOtp : handleSendOtp}
  disabled={loading}
  className="full-width"
/>


        </div>
      </div>
    </div>
  </>
);

};

export default StaffRegister;
