import { memo, useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import StarsBackground from '../../components/StarBackground';
import { toast } from 'react-hot-toast';

const Students = () => {
  const handleDownload = async (fileUrl, fileName) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName || 'download.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Download successful!");
    } catch (error) {
      toast.error("Download failed:", error);
      toast.error("Could not download the file. Please try again.");
    }
  };

  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get("http://localhost:5000/api/notes")
      .then(res => {
        setNotes(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const filteredNotes = notes.filter(note => 
    note.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 relative overflow-x-hidden font-[font1]">
      <Navbar />
      
      <StarsBackground />
      <div className="relative z-10 flex flex-col items-center pt-24 px-4 w-full">
        <h2 className="text-4xl font-bold text-white mb-2 font-[font1]">Study Resources</h2>
        <p className="text-gray-300 mb-10 text-center">Find verified materials by subject or title</p>

        <div className="w-full max-w-md mb-16">
          <input 
            type="text"
            value={searchTerm}
            placeholder="Search for notes..."
            className="w-full p-4 rounded-xl bg-black/60 border border-purple-500/30 text-white outline-none focus:border-purple-400 transition backdrop-blur-md shadow-2xl"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl px-6 pb-24 min-h-[400px]">
          {/* Note Cards */}
          {filteredNotes.map((note, index) => (
            <div 
              key={index} 
              className="bg-black/70 text-white p-10 rounded-2xl flex flex-col items-center text-center gap-6 shadow-2xl border border-white/5 hover:scale-105 hover:bg-purple-900/50 transition duration-300"
            >
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest bg-purple-400/10 px-3 py-1 rounded-full w-fit mx-auto">
                  {note.subject || "General"}
                </span>
                <h3 className="text-2xl font-bold tracking-tight">{note.title || "Untitled Note"}</h3>
              </div>
              
              <p className="text-gray-400 text-sm leading-relaxed">
                Access and download this verified study material for your preparation.
              </p>

              <div className="flex gap-4 w-full mt-auto pt-4">
                <a 
                  href={`http://localhost:5000${note.path}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex-1 bg-white text-black py-3 rounded-xl font-bold hover:bg-gray-200 transition text-sm shadow-lg flex items-center justify-center"
                >
                  View
                </a>
                
                <button 
                  onClick={() => handleDownload(`http://localhost:5000${note.path}`, note.title)}
                  className="flex-1 border border-white/20 text-white py-3 rounded-xl font-bold hover:bg-white/10 transition text-sm cursor-pointer"
                >
                  Download
                </button>
              </div>
            </div>
          ))}

          {/* Centered No-Results Card - Moved INSIDE the Grid Div */}
          {filteredNotes.length === 0 && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center w-full py-1">
              <div className="bg-black/70 text-white p-10 rounded-2xl flex flex-col items-center text-center gap-6 shadow-2xl border border-white/5 w-full max-w-sm backdrop-blur-md">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest bg-red-400/10 px-3 py-1 rounded-full w-fit mx-auto">
                    Notice
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight">No Matching Notes</h3>
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed">
                  We couldn't find any documents for "<span className="text-white font-semibold">{searchTerm}</span>". 
                  Check your spelling or try another keyword.
                </p>

                <button 
                  onClick={() => setSearchTerm("")}
                  className="w-full bg-white text-black py-3 rounded-xl font-bold hover:bg-gray-200 transition text-sm shadow-lg cursor-pointer"
                >
                  Clear Search
                </button>
              </div>
            </div>
          )}
        </div> {/* Grid End */}
      </div>
    </div>
  );
};

export default memo(Students);