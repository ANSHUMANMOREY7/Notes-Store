import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/Layout/PageLayout";
import PageHeader from "../../components/Layout/PageHeader";
import Button from "../../components/Buttons/Button";
import { toast } from 'react-hot-toast';
import { ShieldCheck } from "lucide-react";
const API_URL = import.meta.env.VITE_API_URL;

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
      `${API_URL}/api/auth/request-login-otp`,
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
      `${API_URL}/api/auth/verify-login-otp`,
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
  <PageLayout>

    <PageHeader
      title="Admin Portal"
      description="Sign in to securely upload, organize, and manage study materials."
    />

      {/* Admin Login Card */}
  <div className="admin-login-card bg-black/70 text-white backdrop-blur-md p-6 sm:p-8 rounded-2xl w-full max-w-sm flex flex-col gap-4 shadow-xl transition duration-300 hover:scale-[1.02] hover:bg-purple-900 z-10">

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

<input
  type="text"
  inputMode="numeric"
  maxLength={6}
  placeholder="Enter 6-digit OTP"
  className={`p-3 h-12 rounded bg-gray-800 outline-none w-full border border-transparent focus:border-purple-500 transition-all text-white ${
    !otpSent
      ? "opacity-40 cursor-not-allowed"
      : "opacity-100"
  }`}
  value={otp}
  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
  disabled={!otpSent || loading}
/>



          
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

<p className="text-center text-sm text-gray-400 mt-1">
  New faculty member?{" "}
  <span
    onClick={() => navigate("/staff-register")}
    className="text-white hover:text-purple-300 cursor-pointer font-semibold transition-colors"
  >
    Register here
  </span>
</p>

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
    </PageLayout>
  );
};

export default AdminLogin;