import { memo, useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { ShieldCheck, Loader2, CloudUpload } from "lucide-react";


const API_URL = import.meta.env.VITE_API_URL;

const getUnitLabel = (u) => (u === "QB" ? "Question Bank" : `Unit ${u}`);

const Admin = () => {
  const isAuth = sessionStorage.getItem("adminToken");
  
  const [showModal, setShowModal] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [file, setFile] = useState(null);

  const [subject, setSubject] = useState("");
  const [existingNotes, setExistingNotes] = useState([]);
const [loadingSubjects, setLoadingSubjects] = useState(false);
const [subjectLoadError, setSubjectLoadError] = useState(false);
const [addingNewSubject, setAddingNewSubject] = useState(false);
  const [semester, setSemester] = useState("");
  const [unit, setUnit] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  

  const [statsData, setStatsData] = useState({
    totalNotes: 0,
    totalDownloads: 0,
    storageUsed: 0, 
    categoryBreakdown: {}
  });

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
  const checkSuperAdmin = async () => {
    try {
      const token = sessionStorage.getItem("adminToken");

      if (!token) return;

      await axios.get(`${API_URL}/api/super-admin/faculty`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsSuperAdmin(true);

    } catch{
      setIsSuperAdmin(false);
    }
  };

  checkSuperAdmin();
}, []);
// Fetch existing subjects when upload modal opens
useEffect(() => {
  if (!showModal) return;

  const fetchSubjects = async () => {
    setLoadingSubjects(true);
    setSubjectLoadError(false);
setExistingNotes([]);

    try {
      const res = await axios.get(`${API_URL}/api/notes`);
      setExistingNotes(res.data);
    } catch (error) {
      setSubjectLoadError(true);
      console.error("Failed to fetch subjects:", error);
      toast.error("Failed to load subjects");
    } finally {
      setLoadingSubjects(false);
    }
  };

  fetchSubjects();
}, [showModal]);

  // CHUNK 1: Function to fetch analytics from the backend
  const fetchStats = async () => {
    try {
    const token = sessionStorage.getItem("adminToken");

const res = await axios.get(
  `${API_URL}/api/notes/stats`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
      setStatsData(res.data);
    } catch (err) {
      console.error("Could not fetch stats", err);
    }
  };

  // Fetch stats when user enters Stats Mode
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const isStatsMode = params.get('view') === 'stats';

    setShowStats(isStatsMode);

    if (isStatsMode) {
      fetchStats();
    }
  }, [location.search]);

const availableSubjects = [
  ...new Map(
    existingNotes
      .filter((note) => Number(note.semester) === Number(semester))
      .filter((note) => note.subject?.trim())
      .map((note) => {
        const name = note.subject.trim().replace(/\s+/g, " ");
        return [name.toLowerCase(), name];
      })
  ).values(),
].sort((a, b) => a.localeCompare(b));
  
  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData();

    formData.append("title", subject);
    formData.append("subject", subject);
    formData.append("semester", semester);
    formData.append("unit", unit);
    formData.append("description", description);
    formData.append("file", file);

    try {

const token = sessionStorage.getItem("adminToken");

await axios.post(`${API_URL}/api/notes/upload`, formData, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

      
      toast.success("Note uploaded successfully!");
      
      // REFRESH STATS after upload so the dashboard is accurate
      fetchStats(); 
      
      setShowModal(false);
      setFile(null);
      setSubject("");
      setSemester("");
      setAddingNewSubject(false);
      setUnit("");
      setDescription("");
    } catch (err) {
      console.error(err);
      toast.error(
  err.response?.data?.message || "Error uploading file."
);
    } finally {
      setUploading(false);
    }
  };

  if (!isAuth) return <Navigate to="/admin-login" />;

  return (
    <>
      <Navbar />
      
      <div className=" font-[font1] min-h-screen bg-gradient-to-b from-black to-purple-900 text-white relative transition-colors duration-500">
        
        

        <div className="admin-content max-w-7xl mx-auto p-10 !pt-24 relative z-10">
          
          {!showStats && (
            <div className="relative pb-1 mb-4">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-2 font-[font1]">Admin Panel</h2>
                  <p className="text-gray-300 font-normal font-sans mb-2 md:mb-10 text-center">
                    Manage your notes and uploads. Add, view, and delete study materials from a single secure dashboard.
                </p>
              </div>
              
            </div>
          )}

          {!showStats ? (
  <div className="admin-card-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 !gap-10 !mt-6">
                <div className="bg-black/70 backdrop-blur-md p-10 min-h-[340px] w-full rounded-2xl flex flex-col items-center text-center gap-6 border border-white/5 shadow-2xl hover:scale-105 transition hover:bg-purple-900 group ">
                <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center text-4xl animate-pulse group-hover:animate-none">➕</div>
                <h2 className="text-2xl font-bold">Upload Notes</h2><p className="text-gray-400 text-center text-sm leading-relaxed">
            upload your PDF study materials and notes to the repository with few clicks.
          </p>
                <button onClick={() => setShowModal(true)} className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg font-bold w-full transition cursor-pointer">Start Upload</button>
              </div>

              <div className=" bg-black/70 backdrop-blur-md p-10 min-h-[340px] w-full rounded-2xl flex flex-col items-center text-center  border border-white/5 shadow-2xl hover:scale-105 transition hover:bg-blue-900 group gap-6">
                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center text-4xl animate-pulse group-hover:animate-none">📝</div>
                <h2 className="text-2xl font-bold">Manage Notes</h2>
                <p className="text-gray-400 text-center text-sm leading-relaxed">
            Manage your existing library. You can permanently delete outdated files.
          </p>
                <button onClick={() => navigate('/Admin/manage-notes')} className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-bold w-full transition cursor-pointer">View Library</button>

              </div>

              <div className="bg-black/70 backdrop-blur-md p-10 min-h-[340px] w-full rounded-2xl flex flex-col items-center text-center gap-6 border border-white/5 shadow-2xl hover:scale-105 transition hover:bg-green-900 group">
                <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center text-4xl animate-pulse group-hover:animate-none">📊</div>
                <h2 className="text-2xl font-bold">View Stats</h2>
                <p className="text-gray-400 text-center text-sm leading-relaxed">
            Track total storage and total number of active materials in your database.
          </p>
               <button 
  onClick={() => {
    navigate("?view=stats");
    
  }}
  
  className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg font-bold w-full transition cursor-pointer"
>
   View Analytics
</button>
</div>

{/* Super Admin Card */}
{isSuperAdmin && (
  <div className="bg-black/70 backdrop-blur-md p-10 min-h-[340px] w-full rounded-2xl flex flex-col items-center text-center gap-6 border border-white/5 shadow-2xl hover:scale-105 transition hover:bg-amber-900 group">

    <div className="w-16 h-16 bg-amber-600/20 rounded-full flex items-center justify-center animate-pulse group-hover:animate-none">
      <ShieldCheck className="w-9 h-9 text-amber-400" />
    </div>

    <h2 className="text-2xl font-bold">Manage Faculty</h2>

    <p className="text-gray-400 text-center text-sm leading-relaxed">
      Authorize faculty emails and manage their access permissions.
    </p>

    <button
      onClick={() => navigate("/admin/super-admin")}
      className="bg-amber-600 hover:bg-amber-700 px-8 py-3 rounded-lg font-bold w-full transition cursor-pointer"
    >
      Manage Access
    </button>

  </div>
)}

</div>

) : (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             
<div className="flex items-center gap-4 mb-1 justify-center">
  <h2 className="text-4xl font-bold">Platform Analytics</h2>
</div>
  <p className="text-gray-300 font-normal font-sans mb-10 text-center">Insights into your notes repository</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-black/60 backdrop-blur-md p-8 rounded-3xl border border-purple-500/20 shadow-2xl">
                  <p className="text-purple-400 text-sm font-bold uppercase tracking-widest mb-2">Total Notes</p>
                  <h3 className="text-5xl font-black">{statsData.totalNotes}</h3>
                </div>

              <div className="bg-black/60 backdrop-blur-md p-8 rounded-3xl border border-purple-500/20 shadow-2xl relative overflow-hidden group">
  <div className="flex justify-between items-center mb-2">
    <p className="text-purple-400 text-sm font-bold uppercase tracking-widest">Storage Status</p>
    <div className="flex h-2 w-2 relative">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${statsData.storageUsed > 400 ? 'bg-red-400' : 'bg-green-400'}`}></span>
      <span className={`relative inline-flex rounded-full h-2 w-2 ${statsData.storageUsed > 400 ? 'bg-red-500' : 'bg-green-500'}`}></span>
    </div>
  </div>

  <h3 className="text-4xl font-black text-white">
    {statsData.storageUsed > 450 ? "CRITICAL" : statsData.storageUsed > 250 ? "HEAVY" : "OPTIMAL"}
  </h3>
  
  <p className="text-gray-500 text-[10px] mt-2 font-mono uppercase tracking-tighter">
    {500 - statsData.storageUsed}MB Remaining Capacity
  </p>
</div>
                <div className="bg-black/60 backdrop-blur-md p-8 rounded-3xl border border-purple-500/20 shadow-2xl lg:col-span-2">
                  <div className="flex justify-between mb-4">
                    <p className="text-purple-400 text-sm font-bold uppercase tracking-widest">Storage Used</p>
                    <p className="text-xs text-gray-400">{statsData.storageUsed}MB / 500MB</p>
                  </div>
                  <div className="w-full bg-white/10 h-4 rounded-full overflow-hidden">
                    <div 
                      className="bg-purple-500 h-full transition-all duration-1000" 
                      style={{ width: `${Math.min((statsData.storageUsed / 500) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

<div className="mt-10 bg-black/60 backdrop-blur-md p-8 rounded-3xl border border-white/5">
  <h3 className="text-xl font-bold mb-6">Notes by Subject</h3>
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
    {Object.entries(statsData.categoryBreakdown || {}).length === 0 ? (
  <p className="text-gray-400 text-sm col-span-full text-center">
    No notes uploaded yet.
  </p>
) : (
  Object.entries(statsData.categoryBreakdown).map(([sub, count]) => (
    <div key={sub} className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
      <p className="text-[10px] text-gray-400 uppercase mb-1">{sub}</p>
      <p className="text-2xl font-bold text-purple-400">{count}</p>
    </div>
  ))
)}
  </div>
</div>
            </div>
          )}
        </div>
          
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-2">
            <div className="relative bg-[#121212] border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl">
              <h2 className="text-2xl font-bold mb-2 text-purple-400">Add New Note</h2>
              <form onSubmit={handleUpload}>
  <fieldset
    disabled={uploading}
    className="flex flex-col gap-3 disabled:cursor-not-allowed"
  >
            {/* Semester */}
<select
  required
  className="bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-purple-500 text-gray-400"
  value={semester}
  onChange={(e) => {
    setSemester(e.target.value);
    setSubject("");
    setAddingNewSubject(false);
  }}
>
  <option value="" className="bg-black">
    Select Semester
  </option>

  {[1, 2, 3, 4].map((sem) => (
    <option key={sem} value={sem} className="bg-black">
      Semester {sem}
    </option>
  ))}
</select>

{/* Subject */}
<select
  required
  disabled={!semester || loadingSubjects || uploading || subjectLoadError}
  className="bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-purple-500 text-gray-400 disabled:opacity-40 disabled:cursor-not-allowed"
  value={addingNewSubject ? "__new__" : subject}
  onChange={(e) => {
    if (e.target.value === "__new__") {
      setAddingNewSubject(true);
      setSubject("");
    } else {
      setAddingNewSubject(false);
      setSubject(e.target.value);
    }
  }}
>
  <option value="" className="bg-black">
    {loadingSubjects
      ? "Loading Subjects..."
      : !semester
      ? "Select Semester First"
      : "Select Subject"}
  </option>

  {availableSubjects.map((sub) => (
    <option key={sub} value={sub} className="bg-black">
      {sub}
    </option>
  ))}

  <option value="__new__" className="bg-black">
  + Add New Subject
</option>
</select>

{/* Subject Name Box */}
<input
  type="text"
  placeholder={
    addingNewSubject
      ? "Enter New Subject Name"
      : "Selected Subject Name"
  }
  required={addingNewSubject}
  disabled={!addingNewSubject || uploading}
  value={subject}
  onChange={(e) => setSubject(e.target.value)}
  className={`w-full min-w-0 h-[50px] p-3 rounded-xl outline-none transition-all duration-300 ${
    addingNewSubject
      ? "bg-white/5 border border-white/10 text-white focus:border-purple-500"
      : "bg-white/[0.02] border border-dashed border-white/10 text-gray-500 cursor-not-allowed"
  }`}
/>
             
                {/* Unit */}
                <select
                  required
                  className="bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-purple-500 text-gray-400"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                >
                  <option value="" className="bg-black">Select Unit</option>
                  {[1, 2, 3, 4, 5, "QB"].map((u) => (
                    <option key={u} value={u} className="bg-black">
                      {getUnitLabel(u)}
                    </option>
                  ))}
                </select>

                {/* About Notes */}
                <textarea
                  placeholder="About these notes (optional)"
                  rows="3"
                  className="bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-purple-500 text-white resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input 
                  type="file" accept="application/pdf" required
                  className="text-sm text-gray-400 file:bg-purple-600 file:text-white file:border-0 file:px-4 file:py-3 file:rounded-xl"
                 onChange={(e) => {
  const selectedFile = e.target.files[0];

  if (!selectedFile || selectedFile.type !== "application/pdf") {
    setFile(null);
    e.target.value = "";
    if (selectedFile) {
      toast.error("Please select a valid PDF file");
    }
    return;
  }

  setFile(selectedFile);
}}
                />
                <div className="flex gap-3 mt-4">
  <button
    type="button"
    disabled={!semester || loadingSubjects || uploading}
    onClick={() => {
  setShowModal(false);
  setSubject("");
  setSemester("");
  setUnit("");
  setDescription("");
  setFile(null);
  setAddingNewSubject(false);
}}
    className="flex-1 bg-white/10 py-3 rounded-xl hover:bg-white/20 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
  >
    Cancel
  </button>

  <button
    type="submit"
    disabled={
      uploading ||
      loadingSubjects ||
      !semester ||
      !subject.trim() ||
      !unit ||
      !file
    }
    className="flex-1 bg-purple-600 py-3 rounded-xl font-bold hover:bg-purple-700 transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {uploading ? (
      <>
        <Loader2 className="w-5 h-5 animate-spin" />
        Uploading...
      </>
    ) : (
      "Upload"
    )}
  </button>
</div>
                </fieldset>
</form>
{/* Uploading Animation Overlay */}
{uploading && (
  <div
    role="status"
    className="absolute inset-0 z-20 bg-[#121212] rounded-3xl flex flex-col items-center justify-center gap-5 px-6 text-center"
  >
    <div className="relative w-20 h-20 flex items-center justify-center">

      {/* Background Ring */}
      <div className="absolute inset-0 rounded-full border-[3px] border-purple-500/20" />

      {/* Rotating Ring */}
      <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-purple-500 animate-spin" />

      {/* Upload Icon */}
      <CloudUpload className="w-9 h-9 text-purple-400" />

    </div>

    <h2 className="font-[font1] text-2xl font-bold tracking-wide">
      Uploading Notes
    </h2>

    <p className="text-gray-400 text-sm">
      Securely uploading your PDF...
    </p>

    <p className="text-gray-500 text-xs">
      Please wait. Do not close this page.
    </p>
  </div>
)}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default memo(Admin);