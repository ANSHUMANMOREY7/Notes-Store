import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Navbar from "../../components/Navbar/Navbar";
import { ShieldCheck, ShieldAlert } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const SuperAdmin = () => {
  const token = sessionStorage.getItem("adminToken");
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const [fetchError, setFetchError] = useState(false);
const [email, setEmail] = useState("");
const [authorizing, setAuthorizing] = useState(false);
const [revokingId, setRevokingId] = useState(null);
  // Fetch authorized faculty
  useEffect(() => {
    const fetchFaculty = async () => {
      if (!token) return;

      try {
        const res = await axios.get(
          `${API_URL}/api/super-admin/faculty`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFaculty(res.data);

      } catch (error) {
        if (
          error.response?.status === 403 ||
          error.response?.status === 401
        ) {
          setAccessDenied(true);
          toast.error("Access denied");
        } else {
          setFetchError(true);
          toast.error("Failed to fetch faculty");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFaculty();
  }, [token]);

  // Authorize new faculty
const handleAuthorize = async (e) => {
  e.preventDefault();

  if (authorizing) return;

  setAuthorizing(true);

  try {
    const res = await axios.post(
      `${API_URL}/api/super-admin/faculty`,
      {
        email: email.trim().toLowerCase(),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setFaculty((prev) => [res.data.faculty, ...prev]);

    toast.success("Faculty authorized successfully!");

    setEmail("");

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to authorize faculty"
    );
  } finally {
    setAuthorizing(false);
  }
};

  if (!token) return <Navigate to="/admin-login" replace />;

  const confirmRevoke = (id) => {
  toast.custom(
    (t) => (
      <div className="bg-[#1a1717] text-white border border-white/10 rounded-2xl p-5 shadow-2xl w-[360px] max-w-[90vw]">

        <div className="flex items-start gap-3 mb-5">

          <div className="bg-red-500/10 p-3 rounded-full">
            <ShieldAlert className="w-6 h-6 text-red-400" />
          </div>

          <div>
            <h3 className="font-bold text-base mb-1">
              Revoke Faculty Access?
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed">
              This faculty member will no longer be able
              to access the Admin Portal.
            </p>
          </div>

        </div>

        <div className="flex gap-3">

          <button
            onClick={() => toast.remove(t.id)}
            className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl font-bold text-sm cursor-pointer transition"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              toast.remove(t.id);
              handleRevoke(id);
            }}
            className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-xl font-bold text-sm cursor-pointer transition"
          >
            Revoke Access
          </button>

        </div>

      </div>
    ),
    {
      id: "revoke-confirmation",
      duration: Infinity,
      position: "top-center",
    }
  );
};
  // Revoke faculty access
const handleRevoke = async (id) => {
  if (revokingId) return;

  setRevokingId(id);

  try {
    await axios.delete(
      `${API_URL}/api/super-admin/faculty/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setFaculty((prev) =>
      prev.filter((staff) => staff._id !== id)
    );

    toast.success("Faculty access revoked successfully!");

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to revoke faculty access"
    );
  } finally {
    setRevokingId(null);
  }
};

  if (accessDenied) return <Navigate to="/admin" replace />;

  return (
    <>
      <Navbar />

      <div className="font-[font1] min-h-screen bg-gradient-to-b from-black to-purple-900 text-white">

        <div className="max-w-7xl mx-auto px-6 pt-24 pb-20">

          <h2 className="text-4xl font-bold text-center mb-2">
            Super Admin Panel
          </h2>

          <p className="text-gray-300 font-sans text-center mb-10">
            Manage faculty authorization and access permissions.
          </p>

            {/* Faculty Statistics */}
{!loading && !fetchError && !accessDenied && (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

    {/* Total Faculty */}
    <div className="bg-black/60 backdrop-blur-md p-8 rounded-3xl border border-purple-500/20 shadow-2xl">
      <p className="text-purple-400 text-sm font-bold uppercase tracking-widest mb-2">
        Total Faculty
      </p>

      <h3 className="text-5xl font-black">
        {faculty.length}
      </h3>
    </div>

    {/* Registered Faculty */}
    <div className="bg-black/60 backdrop-blur-md p-8 rounded-3xl border border-green-500/20 shadow-2xl">
      <p className="text-green-400 text-sm font-bold uppercase tracking-widest mb-2">
        Registered Faculty
      </p>

      <h3 className="text-5xl font-black">
        {faculty.filter((staff) => staff.registered).length}
      </h3>
    </div>

    {/* Pending Faculty */}
    <div className="bg-black/60 backdrop-blur-md p-8 rounded-3xl border border-amber-500/20 shadow-2xl">
      <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-2">
        Pending Faculty
      </p>

      <h3 className="text-5xl font-black">
        {faculty.filter((staff) => !staff.registered).length}
      </h3>
    </div>

  </div>
)}
{/* Authorize Faculty */}
{!loading && !fetchError && !accessDenied && (
  <div className="bg-black/70 backdrop-blur-md p-8 rounded-2xl border border-white/10 mb-10">

    <h2 className="text-2xl font-bold mb-2">
      Authorize Faculty
    </h2>

    <p className="text-gray-400 text-sm mb-6">
      Add a faculty email address to grant registration access.
    </p>

    <form
      onSubmit={handleAuthorize}
      className="flex flex-col md:flex-row gap-4"
    >
      <input
        type="email"
        placeholder="Enter faculty email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 min-w-0 bg-white/5 border border-white/10 px-5 py-3 rounded-xl outline-none focus:border-amber-500 transition"
      />

      <button
        type="submit"
        disabled={authorizing}
        className="bg-amber-600 hover:bg-amber-700 px-8 py-3 rounded-xl font-bold transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {authorizing ? "Authorizing..." : "Authorize Faculty"}
      </button>

    </form>
  </div>
)}
         {loading ? (
  <div className="animate-pulse">

    {/* Statistics Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="bg-black/60 p-8 rounded-3xl border border-white/10"
        >
          <div className="h-4 w-36 bg-white/10 rounded mb-4" />
          <div className="h-12 w-16 bg-white/10 rounded-lg" />
        </div>
      ))}
    </div>

    {/* Authorization Form Skeleton */}
    <div className="bg-black/70 p-8 rounded-2xl border border-white/10 mb-10">
      <div className="h-7 w-48 bg-white/10 rounded mb-3" />
      <div className="h-4 w-3/4 bg-white/10 rounded mb-6" />

      <div className="flex flex-col md:flex-row gap-4">
        <div className="h-12 flex-1 bg-white/10 rounded-xl" />
        <div className="h-12 w-full md:w-48 bg-white/10 rounded-xl" />
      </div>
    </div>

    {/* Faculty List Skeleton */}
    {[1, 2].map((item) => (
      <div
        key={item}
        className="bg-black/70 border border-white/10 rounded-2xl p-6 mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div className="flex-1">
          <div className="h-5 w-full max-w-xs bg-white/10 rounded mb-3" />
          <div className="h-6 w-24 bg-white/10 rounded-full" />
        </div>

        <div className="h-12 w-full md:w-40 bg-white/10 rounded-xl" />
      </div>
    ))}

  </div>
) : fetchError ? (
            <p>Unable to load faculty. Please refresh the page.</p>
          ) : faculty.length === 0 ? (
            <p>No authorized faculty found.</p>
          ) : (
           faculty.map((staff) => (
  <div
    key={staff._id}
    className="bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
  >
    <div className="min-w-0">
      <p className="text-lg font-bold break-all">
        {staff.email}
      </p>

      <span
        className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${
          staff.registered
            ? "bg-green-500/15 text-green-400"
            : "bg-amber-500/15 text-amber-400"
        }`}
      >
        {staff.registered ? "Registered" : "Pending"}
      </span>
      {staff.isSuperAdmin && (
  <span className="inline-block ml-2 mt-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400">
    Super Admin
  </span>
)}
    </div>

    {staff.isSuperAdmin ? (
  <div className="flex items-center justify-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-6 py-3 rounded-xl font-bold">
    <ShieldCheck className="w-5 h-5" />
    Protected
  </div>
) : (
  <button
    onClick={() => confirmRevoke(staff._id)}
    disabled={revokingId !== null}
    className="border border-red-500/50 text-red-400 hover:bg-red-500/10 px-6 py-3 rounded-xl font-bold transition cursor-pointer disabled:opacity-50"
  >
    {revokingId === staff._id
      ? "Revoking..."
      : "Revoke Access"}
  </button>
)}
  </div>
))
          )}

        </div>
      </div>
    </>
  );
};

export default SuperAdmin;