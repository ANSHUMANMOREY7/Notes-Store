import { memo, useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import StarsBackground from '../../components/StarBackground';
import { toast } from 'react-hot-toast';
import { BookOpen } from "lucide-react";
import MobileLoader from "../../components/Loader/MobileLoader";
const API_URL = import.meta.env.VITE_API_URL;

const getUnitLabel = (u) => (u === "QB" ? "Question Bank" : `Unit ${u}`);

const sortNotes = (notes, order) => {
  return [...notes].sort((a, b) => {
    const aQB = a.unit === "QB";
    const bQB = b.unit === "QB";

    // Question Bank always on top
    if (aQB && !bQB) return -1;
    if (!aQB && bQB) return 1;
    if (aQB && bQB) return 0;

    const diff = Number(a.unit) - Number(b.unit);
    return order === "asc" ? diff : -diff;
  });
};

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
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");

   const unitOrder = "asc"; // "asc" = 1 to 5

 
useEffect(() => {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });

  toast.success("Student login successful!");

  const startTime = Date.now();
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const minimumLoadingTime = isMobile ? 1500 : 0;

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/notes`);

      if (!Array.isArray(res.data)) {
        throw new Error("Invalid notes response");
      }

      setNotes(res.data);

    } catch (err) {
      console.error("Notes fetch error:", err);
      setNotes([]);
      toast.error("Unable to load notes. Please try again.");

    } finally {
      const elapsedTime = Date.now() - startTime;

      const remainingTime = Math.max(
        0,
        minimumLoadingTime - elapsedTime
      );

      await new Promise(resolve =>
        setTimeout(resolve, remainingTime)
      );

      setLoading(false);

if (isMobile) {
  window.dispatchEvent(new Event("stars-shuffle"));
}
    }
  };

  fetchNotes();
}, []);


  // Subjects that exist in the selected semester (taken from the database notes)
const safeNotes = Array.isArray(notes) ? notes : [];

const availableSubjects = [
  ...new Set(
    safeNotes
  .filter(note => selectedSemester === "all" || String(note.semester) === selectedSemester)
      .map(note => note.subject?.trim())
      .filter(Boolean)
  ),
].sort();

const filteredNotes = safeNotes.filter(note =>
  (selectedSemester === "all" || String(note.semester) === selectedSemester) &&
  (selectedSubject === "all" || note.subject?.trim() === selectedSubject)
);
const sortedNotes = sortNotes(filteredNotes, unitOrder);
const visibleNotes = sortedNotes.slice(0, visibleCount);
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 relative overflow-x-hidden font-[font1]">
      <Navbar />
{/* Mobile Loading Animation */}
{loading && (
  <MobileLoader
    title="Loading Notes"
    description="Fetching your study materials..."
    icon={BookOpen}
  />
)}
      
      <div className={`relative z-10 flex flex-col items-center pt-24 px-4 w-full ${
  loading ? "invisible md:visible" : ""
}`}>
        <h2 className="text-4xl font-bold text-white mb-2 font-[font1]">Study Resources</h2>
        <p className="text-gray-300 font-normal font-sans mb-10 text-center">Find verified materials by Semester and Subject</p>

      <div className="w-full max-w-4xl mb-8 flex flex-col md:flex-row gap-3">
  {/* Semester buttons */}
  <div className="grid grid-cols-4 gap-3 md:flex-1">
    {["1", "2", "3", "4"].map((sem) => (
      <button
        key={sem}
        onClick={() => {
          setSelectedSemester(selectedSemester === sem ? "all" : sem);
          setSelectedSubject("all");
          setVisibleCount(3);
          window.dispatchEvent(new Event("stars-shuffle"));
        }}
        className={`py-3 rounded-xl text-sm font-semibold text-white transition cursor-pointer ${
          selectedSemester === sem
            ? "bg-purple-600"
            : "bg-white/10 hover:bg-white/20"
        }`}
      >
        Sem {sem}
      </button>
    ))}
  </div>

  {/* Subject dropdown */}
  <select
    value={selectedSubject}
    onChange={(e) => {
      setSelectedSubject(e.target.value);
      setVisibleCount(3);
    }}
    className="md:w-72 px-4 py-3 rounded-xl text-sm font-semibold bg-black/60 border border-purple-500/30 text-white outline-none focus:border-purple-400 transition backdrop-blur-md cursor-pointer"
  >
    <option value="all" className="bg-black text-white">All Subjects</option>
    {availableSubjects.map((subject) => (
      <option key={subject} value={subject} className="bg-black text-white">
        {subject}
      </option>
    ))}
  </select>
    {/* Unit order dropdown */}
  
</div>


        {/* Grid Container */}
        <div className="study-resource-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl px-6 pb-24 min-h-[400px] content-start">
          {/* Note Cards */}

          {loading ? (
            <>
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="hidden md:flex bg-black/70 p-10 rounded-2xl flex-col items-center gap-6 shadow-2xl border border-white/5 animate-pulse min-h-[300px]"
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
    className="bg-black/70 min-h-[340px] text-white p-6 rounded-2xl flex flex-col gap-4 shadow-2xl border border-white/5 md:hover:scale-105 hover:bg-purple-900/50 transition duration-300"
  >
    {/* Badge + Book Icon */}
    <div className="flex items-center justify-between">
      <span className="text-xs font-bold text-purple-400 uppercase tracking-widest bg-purple-400/10 px-4 py-2 rounded-full">
        {note.unit ? getUnitLabel(note.unit) : "N/A"}
      </span>

      <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
        <BookOpen className="w-6 h-6 text-purple-400" />
      </div>
    </div>

    {/* Subject and Description */}
    <div className="flex flex-col gap-2">
      <h3 className="text-2xl font-bold tracking-tight">
        {note.subject || "General"}
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed">
        {note.description?.trim() ||
          "Access and download this verified study material for your preparation."}
      </p>
    </div>

    {/* PDF Information */}
    {note.pages && (
      <p className="text-xs text-gray-500 font-semibold tracking-wide">
        📄 {note.pages} {note.pages === 1 ? "page" : "pages"}
        {note.fileSize
          ? ` · ${(note.fileSize / (1024 * 1024)).toFixed(1)} MB`
          : ""}
      </p>
    )}

    {/* View and Download */}
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
        onClick={() =>
          handleDownload(note.path, note.filename || "notes.pdf")
        }
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
  <div className="col-span-1 w-full h-full">
    <div className="bg-black/70 text-white p-6 rounded-2xl flex flex-col gap-4 shadow-2xl border border-white/5 w-full h-full min-h-[340px] backdrop-blur-md">

    {/* Badge + Book Icon */}
<div className="flex items-center justify-between">

  <span className="text-xs font-bold text-red-400 uppercase tracking-widest bg-red-500/15 px-4 py-2 rounded-full flex items-center gap-2">
    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
    Study Materials
  </span>

  <div className="w-12 h-12 rounded-full bg-red-500/15 flex items-center justify-center shadow-[0_0_25px_rgba(239,68,68,0.15)]">
    <BookOpen className="w-6 h-6 text-red-400" />
  </div>

</div>

      {/* Heading + Description */}
      <div className="flex flex-col gap-3">
        <h3 className="text-2xl font-bold tracking-tight">
          {notes.length === 0
            ? "No Notes Available"
            : "Nothing Here Yet!"}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed">
          {notes.length === 0
            ? "Study materials haven't been uploaded yet. Check back soon!"
            : "No study materials match your selected filters. Try another semester or subject."}
        </p>
      </div>

      {/* View All Notes */}
      {notes.length > 0 && (
        <button
          onClick={() => {
            setSelectedSemester("all");
            setSelectedSubject("all");
            setVisibleCount(3);
            window.dispatchEvent(new Event("stars-shuffle"));
          }}
          className="w-full mt-auto bg-white text-black py-3 rounded-xl font-bold hover:bg-gray-200 transition text-sm shadow-lg cursor-pointer"
        >
          View All Notes
        </button>
      )}
    </div>
  </div>
)}


          {/* Load More Button */}

        </div> {/* Grid End */}
        {/* Load More Button */}
<div className="w-full flex justify-center items-center h-24 -mt-12">
  {!loading && visibleCount < filteredNotes.length && (
    <button
      onClick={() => setVisibleCount(prev => prev + 3)}
      className="px-12 py-4 rounded-xl font-bold text-white text-base tracking-wide bg-purple-600/80 border border-purple-400/40 shadow-2xl backdrop-blur-md hover:bg-purple-500 hover:scale-105 transition duration-300 cursor-pointer"
    >
      Load More
    </button>
  )}
</div>
      </div>
    </div>
  );
};

export default memo(Students);