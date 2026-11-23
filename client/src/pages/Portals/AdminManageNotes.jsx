import { memo, useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import StarsBackground from '../../components/StarBackground';
import { toast } from 'react-hot-toast';
const API_URL = import.meta.env.VITE_API_URL;
import { BookOpen } from "lucide-react";

const AdminManageNotes = () => {
  
  const [notes, setNotes] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/notes`
);
      setNotes(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load notes. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    fetchNotes();
  }, []);

  const handleDelete = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-4">
        <p className="text-white font-medium text-center">
          Delete this PDF permanently?
        </p>
        <div className="flex gap-3 justify-center">

          <button
            onClick={async () => {
              toast.dismiss(t.id);
              await executeDeletion(id);
            }}
            className="px-6 py-2 border border-red-600 text-red-600 rounded-xl font-bold hover:bg-red-500/10 transition hover:text-red transition-all duration-300 cursor-pointer"
          >
            Yes, Delete
          </button>

          {/* Styled CANCEL Button - Matching your card's View button style */}
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-6 py-2 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-all duration-300 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: 10 * 1000, // 20 seconds = 20000 milliseconds
      position: 'top-center',
      // Removed the red border here
      style: {
        background: '#1a1a1a',
        border: '1px solid #333', // Subtle dark border instead of red
        padding: '24px',
        borderRadius: '20px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
      }
    });
  };

  // Separated Deletion Logic
  const executeDeletion = async (id) => {
    const loadingId = toast.loading("Purging from database...");
    try {
      setDeletingId(id);

const token = sessionStorage.getItem("adminToken");

await axios.delete(`${API_URL}/api/notes/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted!", { id: loadingId });
    } catch (err) {
      console.error("Delete Error:", err);
      toast.error("Failed to delete.", { id: loadingId });
    } finally {
      setDeletingId(null);
    }
  };

  const availableSubjects = [...new Set(
    notes
      .filter((note) =>
        selectedSemester === "all" || String(note.semester) === selectedSemester
      )
      .map((note) => note.subject)
      .filter((subject) => typeof subject === "string")
      .map((subject) => subject.trim())
      .filter(Boolean)
  )].sort((a, b) => a.localeCompare(b));

  
const getUnitOrder = (unit) => {
  if (String(unit).toUpperCase() === "QB") return 0;

  const number = Number(unit);
  return Number.isInteger(number) && number >= 1 && number <= 5
    ? number
    : 6;
};

const filteredNotes = notes
  .filter((note) =>
    (selectedSemester === "all" ||
      String(note.semester) === selectedSemester) &&
    (selectedSubject === "all" ||
      note.subject?.trim() === selectedSubject)
  )
  .sort((a, b) => {
    const semesterDiff =
      Number(a.semester) - Number(b.semester);

    if (semesterDiff !== 0) return semesterDiff;

    const subjectDiff = (a.subject || "").localeCompare(
      b.subject || ""
    );

    if (subjectDiff !== 0) return subjectDiff;

    return getUnitOrder(a.unit) - getUnitOrder(b.unit);
  });


  const visibleNotes = filteredNotes.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 relative overflow-x-hidden">
      <Navbar />
      

      <div className="relative z-10 flex flex-col items-center pt-24 px-4 w-full">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 text-center leading-tight">
  Admin Notes Manager
</h2>
        <p className="text-gray-300 mb-10 text-center max-w-2xl">
          Review all uploaded notes, open them for inspection, or remove outdated content .
        </p>

        <div className="w-full max-w-4xl mb-12 flex flex-col md:flex-row gap-3">
          {/* Semester buttons */}
          <div className="grid grid-cols-4 gap-3 md:flex-1">
            {["1", "2", "3", "4"].map((sem) => (
              <button
                key={sem}
                onClick={() => {
                  setSelectedSemester(selectedSemester === sem ? "all" : sem);
                  setSelectedSubject("all");
                  window.dispatchEvent(new Event("stars-shuffle"));
                }}
                className={`py-3 rounded-xl text-sm font-semibold text-white transition cursor-pointer ${selectedSemester === sem
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl px-6 pb-24">
          {loading ? (
            <>
              
{[1, 2, 3].map((item) => (
  <div
    key={item}
    className="bg-black/70 text-white p-6 min-h-[340px] rounded-2xl flex flex-col gap-4 shadow-2xl border border-white/5 animate-pulse"
  >
    {/* Badge + Book Icon */}
    <div className="flex items-center justify-between">
      <div className="w-28 h-8 bg-purple-400/20 rounded-full" />
      <div className="w-12 h-12 bg-purple-400/10 rounded-full" />
    </div>

    {/* Subject */}
    <div className="w-3/4 h-7 bg-white/10 rounded-lg" />

    {/* Description */}
    <div className="flex flex-col gap-3">
      <div className="w-full h-3 bg-white/10 rounded" />
      <div className="w-4/5 h-3 bg-white/10 rounded" />
    </div>

    {/* PDF Information */}
    <div className="w-1/2 h-3 bg-white/10 rounded mt-auto" />

    {/* Buttons */}
    <div className="flex gap-4 w-full pt-4">
      <div className="flex-1 h-12 bg-white/10 rounded-xl" />
      <div className="flex-1 h-12 bg-red-500/10 rounded-xl" />
    </div>
  </div>
))}

            </>
          ) : filteredNotes.length === 0 ? (
            
<div className="col-span-1 w-full h-full">
  <div className="bg-black/70 text-white p-6 min-h-[340px] rounded-2xl flex flex-col gap-4 shadow-2xl border border-white/5 w-full h-full backdrop-blur-md">

    {/* Badge + Book Icon */}
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs font-bold text-purple-400 uppercase tracking-widest bg-purple-400/10 px-4 py-2 rounded-full">
        Manage Resources
      </span>

      <div className="w-12 h-12 shrink-0 rounded-full bg-purple-500/10 flex items-center justify-center">
        <BookOpen className="w-6 h-6 text-purple-400" />
      </div>
    </div>

    {/* Heading + Description */}
    <div className="flex flex-col gap-2">
      <h3 className="text-2xl font-bold tracking-tight">
        {notes.length === 0 ? "No Notes Available" : "No Notes Found"}
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed">
        {notes.length === 0
          ? "No study materials have been uploaded yet."
          : "No notes match your selected filters. Try another semester or subject."}
      </p>
    </div>

    {/* Reset Filters */}
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

          ) : (
            
visibleNotes.map((note) => (
  <div
    key={note._id}
    className="bg-black/70 text-white p-6 min-h-[340px] rounded-2xl flex flex-col gap-4 shadow-2xl border border-white/5 md:hover:scale-105 hover:bg-purple-900/50 transition duration-300"
  >
    {/* Unit Badge + Book Icon */}
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs font-bold text-purple-400 uppercase tracking-widest bg-purple-400/10 px-4 py-2 rounded-full">
        {String(note.unit).toUpperCase() === "QB"
          ? "QUESTION BANK"
          : note.unit
          ? `UNIT ${note.unit}`
          : "NO UNIT"}
      </span>

      <div className="w-12 h-12 shrink-0 rounded-full bg-purple-500/10 flex items-center justify-center">
        <BookOpen className="w-6 h-6 text-purple-400" />
      </div>
    </div>

    {/* Subject + Description */}
    <div className="flex flex-col gap-2">
      <h3 className="text-2xl font-bold tracking-tight break-words">
        {note.title || note.subject || "Untitled Note"}
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed break-words">
        {note.description?.trim() || "No description provided."}
      </p>
    </div>

    {/* PDF Information */}
    {(note.pages || note.fileSize) && (
      <p className=" text-xs text-gray-500 font-semibold tracking-wide">
        📄 {note.pages
          ? `${note.pages} ${note.pages === 1 ? "page" : "pages"}`
          : "PDF"}
        {note.fileSize
          ? ` · ${(note.fileSize / (1024 * 1024)).toFixed(1)} MB`
          : ""}
      </p>
    )}

    {/* View + Delete Buttons */}
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
        type="button"
        onClick={() => handleDelete(note._id)}
        disabled={deletingId === note._id}
        className="flex-1 border border-red-600 text-red-600 bg-transparent py-3 rounded-xl font-bold hover:bg-red-600/10 transition text-sm cursor-pointer disabled:opacity-50"
      >
        {deletingId === note._id ? "Deleting…" : "Delete"}
      </button>
    </div>
  </div>
))

                    )}
        </div>

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

export default memo(AdminManageNotes);
