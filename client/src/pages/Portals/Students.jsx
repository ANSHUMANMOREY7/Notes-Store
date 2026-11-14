import { memo, useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import StarsBackground from '../../components/StarBackground';
import { toast } from 'react-hot-toast';

const Students = () => {
  const handleDownload = async (fileUrl, fileName) => {
  try {
    const response = await fetch(fileUrl);

    if (!response.ok) {
      throw new Error("File download failed");
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName || "download.pdf";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast.success("Download successful!");
  } catch (error) {
    console.error("Download Error:", error);
    toast.error("Could not download the file. Please try again.");
  }
};
  const [notes, setNotes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    window.scrollTo(0, 0);
    toast.success("Student login successfull!");
    axios.get("https://notes-store-backend.onrender.com/api/notes")
      .then(res => {
       
        setNotes(res.data);
        
      })
      .catch(err => {
      console.error(err);
      toast.error("Unable to load notes. Please check your connection.");
    })
    .finally(() => {
      setLoading(false);
    });

}, []);

 const filteredNotes = notes;
 const visibleNotes = filteredNotes.slice(0, visibleCount);
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 relative overflow-x-hidden font-[font1]">
      <Navbar />
      
      <StarsBackground />
      <div className="relative z-10 flex flex-col items-center pt-24 px-4 w-full">
        <h2 className="text-4xl font-bold text-white mb-2 font-[font1]">Study Resources</h2>
        <p className="text-gray-300 font-normal font-sans mb-10 text-center">Find verified materials by subject or title</p>

      

        {/* Grid Container */}
        <div className="study-resource-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl px-6 pb-24 min-h-[400px] content-start">
          {/* Note Cards */}
         
{loading ? (
  <>
    {[1, 2, 3].map((item) => (
      <div
        key={item}
        className="bg-black/70 p-10 rounded-2xl flex flex-col items-center gap-6 shadow-2xl border border-white/5 animate-pulse min-h-[300px]"
      >
        {/* Subject placeholder */}
        <div className="w-28 h-5 bg-purple-400/20 rounded-full"></div>

        {/* Title placeholder */}
        <div className="w-3/4 h-7 bg-white/10 rounded-lg"></div>

        {/* Description placeholder */}
        <div className="w-full flex flex-col items-center gap-3">
          <div className="w-full h-3 bg-white/10 rounded"></div>
          <div className="w-4/5 h-3 bg-white/10 rounded"></div>
        </div>

        {/* Button placeholders */}
        <div className="flex gap-4 w-full mt-auto pt-4">
          <div className="flex-1 h-12 bg-white/10 rounded-xl"></div>
          <div className="flex-1 h-12 bg-purple-400/20 rounded-xl"></div>
        </div>
      </div>
    ))}
  </>
) : (

  <>
    {/* Note Cards */}
    
{visibleNotes.map((note, index) => (
  <div
    key={note._id || index}
    className="bg-black/70 text-white p-10 rounded-2xl flex flex-col items-center text-center gap-6 shadow-2xl border border-white/5 hover:scale-105 hover:bg-purple-900/50 transition duration-300"
  >
    {/* Unit Badge */}
    <span className="text-sm font-bold text-purple-400 uppercase tracking-widest bg-purple-400/10 px-5 py-2 rounded-full w-fit mx-auto">
      UNIT-{note.unit || "N/A"}
    </span>

    {/* Subject */}
    <h3 className="text-2xl font-bold tracking-tight">
      {note.subject || "General"}
    </h3>

    {/* Description */}
    <p className="text-gray-400 text-sm leading-relaxed">
      {note.description?.trim() ||
        "Access and download this verified study material for your preparation."}
    </p>

    {/* Existing Buttons */}
    <div className="flex gap-4 w-full mt-auto pt-4">
      <a
        href={note.path}
        target="_blank"
        rel="noreferrer"
        className="flex-1 bg-white text-black py-3 rounded-xl font-bold hover:bg-gray-200 transition text-sm shadow-lg flex items-center justify-center"
      >
        View
      </a>

      <button
        onClick={() => handleDownload(note.path, note.filename || "notes.pdf")}
        className="flex-1 border border-white/20 text-white py-3 rounded-xl font-bold hover:bg-white/10 transition text-sm cursor-pointer"
      >
        Download
      </button>
    </div>
  </div>
))}
    
            </>
)}

          {/* Centered No-Results Card - Moved INSIDE the Grid Div */}
          {!loading && filteredNotes.length === 0 && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center w-full py-1">
              <div className="bg-black/70 text-white p-10 rounded-2xl flex flex-col items-center text-center gap-6 shadow-2xl border border-white/5 w-full max-w-sm backdrop-blur-md">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest bg-red-400/10 px-3 py-1 rounded-full w-fit mx-auto">
                    Notice
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight">No Matching Notes</h3>
                </div>
                
                  <p className="text-gray-400 text-sm leading-relaxed">
                    No notes are available right now.
                  </p>

              </div>
                        </div>
          )}

         {/* Load More Button */}

        </div> {/* Grid End */}
        {/* Load More Button */}
{!loading && visibleCount < filteredNotes.length && (
 <div className="w-full flex justify-center pb-24 -mt-12">  
    <button
      onClick={() => setVisibleCount(prev => prev + 3)}
      className="px-12 py-4 rounded-xl font-bold text-white text-base tracking-wide bg-purple-600/80 border border-purple-400/40 shadow-2xl backdrop-blur-md hover:bg-purple-500 hover:scale-105 transition duration-300 cursor-pointer"
    >
      Load More
    </button>
  </div>
)}
      </div>
    </div>
  );
};

export default memo(Students);