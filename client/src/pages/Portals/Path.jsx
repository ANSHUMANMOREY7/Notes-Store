import { memo, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Buttons/Button"
import StarsBackground from "../../components/StarBackground";

const Path = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 relative overflow-hidden">
      

      <Navbar />
<StarsBackground />
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