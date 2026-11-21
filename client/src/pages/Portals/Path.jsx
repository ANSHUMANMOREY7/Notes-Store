import { GraduationCap, ShieldCheck } from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Buttons/Button";
import StarsBackground from "../../components/StarBackground";

const Path = () => {

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 relative overflow-hidden">
      

      <Navbar />

  <div className="portal-options relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-5 pt-24 pb-12 gap-8">
    
{/* Page Heading */}
<div className="text-center mb-4 md:mb-8 px-4">
  <h1 className="text-white font-[font1] font-bold text-3xl sm:text-4xl md:text-4xl leading-tight">
    Welcome to Notes Store
  </h1>

  <p className="text-gray-300 mt-2 text-sm sm:text-base md:text-lg">
    Choose how you want to continue.
  </p>
</div>
<div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 w-full">
  {/* Student Card */}
  <div className="portal-option bg-black/70 text-white w-96 p-10 rounded-2xl flex flex-col items-center text-center gap-4 shadow-xl hover:scale-105 transition duration-300 hover:bg-purple-900 transition duration-300 ">
<GraduationCap
  size={48}
  strokeWidth={1.5}
  className="text-purple-300"
/>
    <h2 className="text-3xl font-bold">Student</h2>

    <p className="text-gray-300">
      Access and download verified study materials uploaded by administrators.
    </p>

    <Button
  label="Browse Study Materials"
  to="/student"
  param={{ role: "student" }}
/>

  </div>


  {/* Admin Card */}
  <div className="portal-option bg-black/70 text-white w-96 p-10 rounded-2xl flex flex-col items-center text-center gap-4 shadow-xl hover:scale-105 transition duration-300 hover:bg-purple-900 transition duration-300">
<ShieldCheck
  size={48}
  strokeWidth={1.5}
  className="text-purple-300"
/>

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


    </div>
  );
};

export default Path;