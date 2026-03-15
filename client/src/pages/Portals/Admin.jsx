import { memo } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Navigate } from "react-router-dom";
import Footer from '../../components/Footer';

const Admin = () => {
  const isAuth = localStorage.getItem("adminAuth");

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    window.location.href = "/";
  };

  if (!isAuth) {
    return <Navigate to="/admin-login" />;
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 text-white font-[font1]">
<div className="absolute inset-0 z-0">

  {/* Small stars */}
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"5%",left:"10%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"10%",left:"20%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"15%",left:"50%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"20%",left:"80%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"25%",left:"35%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"30%",left:"10%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"35%",left:"60%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"40%",left:"70%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"45%",left:"15%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"50%",left:"30%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"55%",left:"75%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"60%",left:"90%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"65%",left:"40%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"70%",left:"55%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"75%",left:"25%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"80%",left:"60%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"85%",left:"45%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"90%",left:"15%"}}></div>

  {/* Medium stars */}
  <div className="absolute w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{top:"12%",left:"65%"}}></div>
  <div className="absolute w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{top:"38%",left:"82%"}}></div>
  <div className="absolute w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{top:"58%",left:"18%"}}></div>
  <div className="absolute w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{top:"72%",left:"72%"}}></div>

  {/* Colored stars */}
  <div className="absolute w-2 h-2 bg-purple-300 rounded-full animate-pulse" style={{top:"22%",left:"45%"}}></div>
  <div className="absolute w-2 h-2 bg-blue-200 rounded-full animate-pulse" style={{top:"55%",left:"75%"}}></div>
  <div className="absolute w-2 h-2 bg-yellow-200 rounded-full animate-pulse" style={{top:"33%",left:"85%"}}></div>

</div>

        <div className="max-w-7xl mx-auto p-10 pt-24 relative z-10">
          <div className="flex justify-between items-center border-b border-white/20 pb-6 mb-10">
            <div>
              <h1 className="text-4xl font-bold font-[font1]">Admin Panel</h1>
              <p className="text-purple-300 mt-1">Manage your notes and uploads</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-bold transition duration-300  shadow-red-500/20 font-[font1] cursor-pointer "
            >
              Logout
            </button>
          </div>

          <div className="flex  justify-center gap-10 mt-10">
            <div className="bg-black/70 backdrop-blur-md text-white w-96 p-10 rounded-2xl flex flex-col items-center text-center gap-6 shadow-xl hover:scale-105 transition duration-300 hover:bg-purple-900 group border border-white/5">
              <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center text-4xl animate-pulse group-hover:animate-none group-hover:scale-110 transition-transform">
                ➕
              </div>
              <h2 className="text-3xl font-bold tracking-tight font-[font1]">Upload Notes</h2>
              <p className="text-gray-300 font-[font1]">Upload new PDFs and categorize them by subject for students.</p>
              <button
                onClick={() => alert("start upload")}
                className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg font-bold transition duration-300 shadow-lg shadow-purple-500/20 font-[font1] w-full cursor-pointer "
              >
                Start Upload
              </button>
            </div>

            <div className="bg-black/70 backdrop-blur-md text-white w-96 p-10 rounded-2xl flex flex-col items-center text-center gap-6 shadow-xl hover:scale-105 transition duration-300 hover:bg-blue-900 group border border-white/5">
              <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center text-4xl animate-pulse group-hover:animate-none group-hover:scale-110 transition-transform">
                📝
              </div>
              <h2 className="text-3xl font-bold tracking-tight font-[font1]">Manage Notes</h2>
              <p className="text-gray-300 font-[font1]">Edit details or delete outdated study materials from the library.</p>
              <button
                onClick={() => alert("Manage Notes")}
                className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-bold transition duration-300 shadow-lg shadow-blue-500/20 font-[font1] w-full cursor-pointer "
              >
                View Library
              </button>
            </div>
            <div className="bg-black/70 backdrop-blur-md text-white w-96 p-10 rounded-2xl flex flex-col items-center text-center gap-6 shadow-xl hover:scale-105 transition duration-300 hover:bg-green-900 group  border border-white/5">
              <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center text-4xl animate-pulse group-hover:animate-none group-hover:scale-110 transition-transform">
                📊
              </div>
              <h2 className="text-3xl font-bold tracking-tight font-[font1]">View Stats</h2>
              <p className="text-gray-300 font-[font1]">Monitor total downloads and see what students are studying most.</p>
              <button
                onClick={() => alert("view stats ")}
                className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg font-bold transition duration-300 shadow-lg shadow-green-500/20 font-[font1] w-full cursor-pointer "
              >
                View Analytics
              </button>
            </div>


          </div>
        </div>
      </div>
    <Footer />
    </>
  );
};
export default Admin;