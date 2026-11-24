import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ShieldCheck } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = sessionStorage.getItem("adminToken");

  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();

    const validateSession = async () => {
      if (!token) {
        setStatus("unauthorized");
        return;
      }

      setStatus("loading");

      try {
        await axios.get(`${API_URL}/api/auth/session`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });

        setStatus("authorized");

      } catch (error) {
        if (axios.isCancel(error)) return;

        if (
          error.response?.status === 401 ||
          error.response?.status === 403
        ) {
          sessionStorage.removeItem("adminToken");
          setStatus("unauthorized");

          toast.error("Session expired or access revoked");
        } else {
          setStatus("error");
        }
      }
    };

    validateSession();

    return () => controller.abort();

  }, [token, location.pathname]);

  if (!token || status === "unauthorized") {
    return <Navigate to="/admin-login" replace />;
  }
if (status === "loading") {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950 text-white flex flex-col items-center justify-center gap-5 px-6">

      {/* Animated Security Loader */}
      <div className="relative w-20 h-20 flex items-center justify-center">

        <div className="absolute inset-0 rounded-full border-[3px] border-purple-500/20" />

        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-purple-500 animate-spin" />

        <ShieldCheck className="w-9 h-9 text-purple-400" />

      </div>

      {/* Loading Text */}
      <h2 className="font-[font1] text-2xl font-bold tracking-wide">
        Verifying Session
      </h2>

      <p className="text-gray-400 text-sm text-center">
        Securely validating your access...
      </p>

    </div>
  );
}
  if (status === "error") {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <p>Unable to verify your session.</p>

        <button
          onClick={() => window.location.reload()}
          className="bg-purple-600 px-6 py-3 rounded-xl cursor-pointer"
        >
          Try Again
        </button>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;