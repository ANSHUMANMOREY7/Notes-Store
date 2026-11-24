import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Navbar from "../../components/Navbar/Navbar";

const API_URL = import.meta.env.VITE_API_URL;

const SuperAdmin = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("adminToken");

  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const [fetchError, setFetchError] = useState(false);
const [email, setEmail] = useState("");
const [authorizing, setAuthorizing] = useState(false);
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

          <button
            onClick={() => navigate("/admin")}
            className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl cursor-pointer mb-8"
          >
            Back to Admin
          </button>
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
            <p>Loading faculty...</p>
          ) : fetchError ? (
            <p>Unable to load faculty. Please refresh the page.</p>
          ) : faculty.length === 0 ? (
            <p>No authorized faculty found.</p>
          ) : (
            faculty.map((staff) => (
              <div key={staff._id} className="mb-4">
                <p>{staff.email}</p>

                <p className="text-gray-400">
                  {staff.registered ? "Registered" : "Pending"}
                </p>
              </div>
            ))
          )}

        </div>
      </div>
    </>
  );
};

export default SuperAdmin;