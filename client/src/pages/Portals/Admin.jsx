import { memo, useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';

const Admin = () => {
  const isAuth = sessionStorage.getItem("adminAuth");
  
  const [showModal, setShowModal] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [uploading, setUploading] = useState(false);
  
  const [statsData, setStatsData] = useState({
    totalNotes: 0,
    totalDownloads: 0,
    storageUsed: 0, 
    categoryBreakdown: {}
  });
const allSubjects = [
  "SYSTEM Analysis and Design",
  "Data Structures",
  "C#.NET",
  "Cloud Computing",
  "ORACLE AND PL/SQL"
];
  const navigate = useNavigate();

  // CHUNK 1: Function to fetch analytics from the backend
  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notes/stats");
      setStatsData(res.data);
    } catch (err) {
      console.error("Could not fetch stats", err);
    }
  };

  // Fetch stats when user enters Stats Mode
  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const isStatsMode = params.get("view") === "stats";
  
  setShowStats(isStatsMode);

  if (isStatsMode) {
    fetchStats();
  }
}, [window.location.search]);


  
  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subject", subject);
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/api/notes/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      alert("Note uploaded successfully!");
      
      // REFRESH STATS after upload so the dashboard is accurate
      fetchStats(); 
      
      setShowModal(false);
      setFile(null); 
      setTitle(""); 
      setSubject("");
    } catch (err) {
      console.error(err);
      alert("Error uploading file.");
    } finally {
      setUploading(false);
    }
  };

  if (!isAuth) return <Navigate to="/admin-login" />;

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 text-white relative transition-colors duration-500">
        
        <div className="absolute inset-0 z-0">
          <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"5%",left:"10%"}}></div>
          <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"15%",left:"50%"}}></div>
          <div className="absolute w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{top:"12%",left:"65%"}}></div>
          <div className="absolute w-2 h-2 bg-purple-300 rounded-full animate-pulse" style={{top:"22%",left:"45%"}}></div>
          <div className="absolute w-32 h-32 bg-purple-600/10 rounded-full blur-[100px]" style={{bottom:"10%",right:"10%"}}></div>
        </div>

        <div className="max-w-7xl mx-auto p-10 pt-24 relative z-10">
          
          {!showStats && (
            <div className="relative pb-6 mb-10">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-2">Admin Panel</h2>
                <p className="text-gray-300 font-normal font-sans mb-10 text-center">
                  Manage your notes and uploads. Add, view, and delete study materials from a single secure dashboard.
                </p>
              </div>
              
            </div>
          )}

          {!showStats ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
              <div className="bg-black/70 backdrop-blur-md p-10 rounded-2xl flex flex-col items-center text-center gap-6 border border-white/5 shadow-2xl hover:scale-105 transition hover:bg-purple-900 group">
                <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center text-4xl animate-pulse group-hover:animate-none">➕</div>
                <h2 className="text-2xl font-bold">Upload Notes</h2><p className="text-gray-400 text-center text-sm leading-relaxed">
            Quickly upload your PDF study materials and notes to the repository with just a few clicks.
          </p>
                <button onClick={() => setShowModal(true)} className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg font-bold w-full transition cursor-pointer">Start Upload</button>
              </div>

              <div className="bg-black/70 backdrop-blur-md p-10 rounded-2xl flex flex-col items-center text-center gap-6 border border-white/5 shadow-2xl hover:scale-105 transition hover:bg-blue-900 group">
                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center text-4xl animate-pulse group-hover:animate-none">📝</div>
                <h2 className="text-2xl font-bold">Manage Notes</h2>
                <p className="text-gray-400 text-center text-sm leading-relaxed">
            Manage your existing library. You can permanently delete outdated files.
          </p>
                <button onClick={() => navigate('/Admin/manage-notes')} className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-bold w-full transition cursor-pointer">View Library</button>

              </div>

              <div className="bg-black/70 backdrop-blur-md p-10 rounded-2xl flex flex-col items-center text-center gap-6 border border-white/5 shadow-2xl hover:scale-105 transition hover:bg-green-900 group">
                <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center text-4xl animate-pulse group-hover:animate-none">📊</div>
                <h2 className="text-2xl font-bold">View Stats</h2>
                <p className="text-gray-400 text-center text-sm leading-relaxed">
            Track total storage and total number of active materials in your database.
          </p>
                <button 
  onClick={() => navigate("?view=stats")} 
  className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg font-bold w-full transition cursor-pointer"
>
  View Analytics
</button>
                
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             
<div className="flex items-center gap-4 mb-12 justify-center">
  <h2 className="text-4xl font-bold">Platform Analytics</h2>
</div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-black/60 backdrop-blur-md p-8 rounded-3xl border border-purple-500/20 shadow-2xl">
                  <p className="text-purple-400 text-sm font-bold uppercase tracking-widest mb-2">Total Notes</p>
                  <h3 className="text-5xl font-black">{statsData.totalNotes}</h3>
                </div>

                <div className="bg-black/60 backdrop-blur-md p-8 rounded-3xl border border-purple-500/20 shadow-2xl">
                  <p className="text-purple-400 text-sm font-bold uppercase tracking-widest mb-2">Total Downloads</p>
                  <h3 className="text-5xl font-black">{statsData.totalDownloads}</h3>
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
    {allSubjects.map((sub) => {
     
      const count = statsData.categoryBreakdown[sub] || 0;

      return (
        <div key={sub} className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
          <p className="text-[10px] text-gray-400 uppercase mb-1">{sub}</p>
          <p className="text-2xl font-bold text-purple-400">{count}</p>
        </div>
      );
    })}
  </div>
</div>
            </div>
          )}
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
            <div className="bg-[#121212] border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-purple-400">Add New Note</h2>
              <form onSubmit={handleUpload} className="flex flex-col gap-4">
                <input 
                  type="text" placeholder="Note Title" required
                  className="bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-purple-500"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <select 
                  required className="bg-white/5 border border-white/10 p-3 rounded-xl outline-none"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option value="" className="bg-black">Select Subject</option>
                  <option value="SYSTEM Analysis and Design" className="bg-black">SYSTEM Analysis and Design</option>
                  <option value="Data Structures" className="bg-black">Data Structures</option>
                  <option value="C#.NET" className="bg-black">C#.NET</option>
                  <option value="Cloud Computing" className="bg-black">Cloud Computing</option>
                  <option value="ORACLE AND PL/SQL" className="bg-black">ORACLE AND PL/SQL</option>
                </select>
                <input 
                  type="file" accept="application/pdf" required
                  className="text-sm text-gray-400 file:bg-purple-600 file:text-white file:border-0 file:px-4 file:py-3 file:rounded-xl"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <div className="flex gap-3 mt-4">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-white/10 py-3 rounded-xl hover:bg-white/20 transition">Cancel</button>
                  <button type="submit" disabled={uploading} className="flex-1 bg-purple-600 py-3 rounded-xl font-bold hover:bg-purple-700 transition">
                    {uploading ? "Uploading..." : "Upload"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default memo(Admin);