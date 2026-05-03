import { memo, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Buttons/Button"

const Path = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 relative overflow-hidden">
      

      <Navbar />
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
   <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-10px)] gap-26">

  {/* Student Card */}
  <div className="bg-black/70 text-white w-96 p-10 rounded-2xl flex flex-col items-center text-center gap-6 shadow-xl hover:scale-105 transition duration-300 hover:bg-purple-900 transition duration-300 ">

    <h2 className="text-3xl font-bold">Student</h2>

    <p className="text-gray-300">
      Access and download verified study materials uploaded by administrators.
    </p>

    <Button
  label="Login as Student"
  to="/student"
  param={{ role: "student" }}
/>

  </div>


  {/* Admin Card */}
  <div className="bg-black/70 text-white w-96 p-10 rounded-2xl flex flex-col items-center text-center gap-6 shadow-xl hover:scale-105 transition duration-300 hover:bg-purple-900 transition duration-300">

    <h2 className="text-3xl font-bold">Admin</h2>

    <p className="text-gray-300">
      Upload and manage study materials for students in a secure repository.
    </p>

   <Button
  label="Login as Admin"
  to="/admin-login"
  param={{ role: "admin" }}
/>

  </div>

</div>


    </div>
  );
};

export default memo(Path);