import { memo, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Navigate } from "react-router-dom";
import axios from 'axios';

const Admin = () => {
  const isAuth = localStorage.getItem("adminAuth");

 
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    window.location.href = "/";
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subject", subject);
    formData.append("file", file); // 

    try {
      await axios.post("http://localhost:5000/api/notes/upload", formData, {
  headers: { "Content-Type": "multipart/form-data" },
});
      alert("Note uploaded successfully!");
      setShowModal(false);
      setFile(null); setTitle(""); setSubject("");
    } catch (err) {
      console.error(err);
      alert("Error uploading file. Make sure backend is running on port 5000");
    } finally {
      setUploading(false);
    }
  };

  if (!isAuth) return <Navigate to="/admin-login" />;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 text-white font-[font1] relative">
        
        
        <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
           <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"5%",left:"10%"}}></div>
           <div className="absolute w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{top:"12%",left:"65%"}}></div>
         
        </div>

        <div className="max-w-7xl mx-auto p-10 pt-24 relative z-10">
          <div className="flex justify-between items-center border-b border-white/20 pb-6 mb-10">
            <div>
              <h1 className="text-4xl font-bold">Admin Panel</h1>
              <p className="text-purple-300 mt-1">Manage your notes and uploads</p>
            </div>
            <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-bold transition cursor-pointer">
              Logout
            </button>
          </div>

          {/* THE THREE CARDS */}
          <div className="flex flex-wrap justify-center gap-10 mt-10">
            
            {/* Card 1: Upload */}
            <div className="bg-black/70 backdrop-blur-md w-80 p-8 rounded-2xl flex flex-col items-center text-center gap-6 border border-white/5 hover:scale-105 transition hover:bg-purple-900 group">
              <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center text-4xl animate-pulse group-hover:animate-none">➕</div>
              <h2 className="text-2xl font-bold">Upload Notes</h2>
              <p className="text-gray-300 text-sm">Upload new PDFs and categorize them by subject.</p>
              <button onClick={() => setShowModal(true)} className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg font-bold w-full transition cursor-pointer">
                Start Upload
              </button>
            </div>

            {/* Card 2: Manage */}
            <div className="bg-black/70 backdrop-blur-md w-80 p-8 rounded-2xl flex flex-col items-center text-center gap-6 border border-white/5 hover:scale-105 transition hover:bg-blue-900 group">
              <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center text-4xl animate-pulse group-hover:animate-none">📝</div>
              <h2 className="text-2xl font-bold">Manage Notes</h2>
              <p className="text-gray-300 text-sm">Edit details or delete outdated study materials.</p>
              <button onClick={() => alert("Manage logic coming soon!")} className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-bold w-full transition cursor-pointer">
                View Library
              </button>
            </div>

            {/* Card 3: Stats */}
            <div className="bg-black/70 backdrop-blur-md w-80 p-8 rounded-2xl flex flex-col items-center text-center gap-6 border border-white/5 hover:scale-105 transition hover:bg-green-900 group">
              <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center text-4xl animate-pulse group-hover:animate-none">📊</div>
              <h2 className="text-2xl font-bold">View Stats</h2>
              <p className="text-gray-300 text-sm">Monitor total downloads and student activity.</p>
              <button onClick={() => alert("Stats logic coming soon!")} className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg font-bold w-full transition cursor-pointer">
                View Analytics
              </button>
            </div>

          </div>
        </div>

        {/* UPLOAD MODAL */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
            <div className="bg-[#121212] border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-purple-400">Add New Note</h2>
              <form onSubmit={handleUpload} className="flex flex-col gap-4">
                <input 
                  type="text" placeholder="Note Title" required
                  className="bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-purple-500"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <select 
                  required className="bg-white/5 border border-white/10 p-3 rounded-xl outline-none"
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
                  className="text-sm text-gray-400 file:bg-purple-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-full file:mr-4"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <div className="flex gap-3 mt-4">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-white/10 py-3 rounded-xl hover:bg-white/20 transition">Cancel</button>
                  <button type="submit" disabled={uploading} className="flex-1 bg-purple-600 py-3 rounded-xl font-bold hover:bg-purple-700 transition">
                    {uploading ? "Uploading..." : "Publish"}
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