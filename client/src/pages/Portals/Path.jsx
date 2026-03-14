import { memo } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Navbar/Buttons/Button"
const Path = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 relative overflow-hidden">
      

      <Navbar />
<div className="absolute inset-0 z-0">

  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"10%",left:"20%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"20%",left:"80%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"40%",left:"50%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"60%",left:"30%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"75%",left:"70%"}}></div>

</div>
   <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-40px)] gap-26">

  {/* Student Card */}
  <div className="bg-black/70 backdrop-blur-md text-white w-96 p-10 rounded-2xl flex flex-col items-center text-center gap-6 shadow-xl hover:scale-105 transition duration-300">

    <h2 className="text-3xl font-bold">Student</h2>

    <p className="text-gray-300">
      Access and download verified study materials uploaded by administrators.
    </p>

    <Button
  label="Continue"
  to="/student"
  param={{ role: "student" }}
/>

  </div>


  {/* Admin Card */}
  <div className="bg-black/70 backdrop-blur-md text-white w-96 p-10 rounded-2xl flex flex-col items-center text-center gap-6 shadow-xl hover:scale-105 transition duration-300">

    <h2 className="text-3xl font-bold">Admin</h2>

    <p className="text-gray-300">
      Upload and manage study materials for students in a secure repository.
    </p>

   <Button
  label="Continue"
  to="/admin"
  param={{ role: "admin" }}
/>

  </div>

</div>

    </div>
  );
};

export default memo(Path);