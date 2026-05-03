import { memo, useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';

const AdminManageNotes = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/notes");
      setNotes(res.data);
    } catch (err) {
      console.error(err);
      alert("Unable to load notes. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this note permanently?");
    if (!confirmed) return;
    try {
      setDeletingId(id);
      await axios.delete(`http://localhost:5000/api/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      console.error(err);
      alert("Unable to delete note. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 relative overflow-x-hidden">
      <Navbar />
      <div className="absolute inset-0 z-0">
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

        <div className="absolute w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{top:"12%",left:"65%"}}></div>
        <div className="absolute w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{top:"38%",left:"82%"}}></div>
        <div className="absolute w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{top:"58%",left:"18%"}}></div>
        <div className="absolute w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{top:"72%",left:"72%"}}></div>

        <div className="absolute w-2 h-2 bg-purple-300 rounded-full animate-pulse" style={{top:"22%",left:"45%"}}></div>
        <div className="absolute w-2 h-2 bg-blue-200 rounded-full animate-pulse" style={{top:"55%",left:"75%"}}></div>
        <div className="absolute w-2 h-2 bg-yellow-200 rounded-full animate-pulse" style={{top:"33%",left:"85%"}}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center pt-24 px-4 w-full">
        <h2 className="text-4xl font-bold text-white mb-2">Admin Notes Manager</h2>
        <p className="text-gray-300 mb-10 text-center max-w-2xl">
          Review all uploaded notes, open them for inspection, or remove outdated content from the library.
        </p>

        <div className="w-full max-w-md mb-16">
          <input
            type="text"
            placeholder="Search notes by title or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 rounded-xl bg-black/60 border border-purple-500/30 text-white outline-none focus:border-purple-400 transition backdrop-blur-md shadow-2xl"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl px-6 pb-24">
          {loading ? (
            <div className="col-span-full text-center text-white/80">Loading notes...</div>
          ) : filteredNotes.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 italic">No matching notes found.</div>
          ) : (
            filteredNotes.map((note) => (
              <div
                key={note._id}
                className="bg-black/70 text-white p-10 rounded-2xl flex flex-col items-center text-center gap-6 shadow-2xl border border-white/5 hover:scale-105 hover:bg-purple-900/50 transition duration-300"
              >
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest bg-purple-400/10 px-3 py-1 rounded-full w-fit mx-auto">
                    {note.subject || "General"}
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight">{note.title || "Untitled Note"}</h3>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed">
                  Manage this upload by viewing the file or deleting it from the collection.
                </p>

                <div className="flex gap-4 w-full mt-auto pt-4">
                  <a
                    href={`http://localhost:5000${note.path}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-white text-black py-3 rounded-xl font-bold hover:bg-gray-200 transition text-sm shadow-lg"
                  >
                    View
                  </a>
                  <button
                    type="button"
                    onClick={() => handleDelete(note._id)}
                    disabled={deletingId === note._id}
                    className="flex-1 border border-white/20 text-white py-3 rounded-xl font-bold hover:bg-white/10 transition text-sm disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {deletingId === note._id ? 'Deleting…' : 'Delete'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(AdminManageNotes);
