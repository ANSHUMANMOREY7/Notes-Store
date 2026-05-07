import { memo, useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import StarsBackground from '../../components/StarBackground';
import { toast } from 'react-hot-toast';

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
      toast.error("Unable to load notes. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
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
    duration: 10 * 1000 , // 20 seconds = 20000 milliseconds
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
    await axios.delete(`http://localhost:5000/api/notes/${id}`);
    setNotes((prev) => prev.filter((note) => note._id !== id));
    toast.success("Note deleted!", { id: loadingId });
  } catch (err) {
    toast.error("Failed to delete.", { id: loadingId });
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
     <StarsBackground />

      <div className="relative z-10 flex flex-col items-center pt-24 px-4 w-full">
        <h2 className="text-4xl font-bold text-white mb-2">Admin Notes Manager</h2>
        <p className="text-gray-300 mb-10 text-center max-w-2xl">
          Review all uploaded notes, open them for inspection, or remove outdated content .
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
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center w-full py-1">
              <div className="bg-black/70 text-white p-10 rounded-2xl flex flex-col items-center text-center gap-6 shadow-2xl border border-purple-500/20 w-full max-w-sm backdrop-blur-md">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest bg-red-400/10 px-3 py-1 rounded-full w-fit mx-auto">
                    Admin Notice
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight">No Records Found</h3>
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed">
                  There are currently no notes matching "<span className="text-purple-300 font-semibold">{searchTerm}</span>" in the repository. 
                  
                </p>

                <button 
                  onClick={() => setSearchTerm("")}
                  className="w-full bg-white text-black py-3 rounded-xl font-bold  transition text-sm shadow-lg cursor-pointer "
                >
                  Reset Admin View
                </button>
              </div>
            </div>
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
                    className="flex-1 border border-red-600 text-red-600 bg-transparent py-3 rounded-xl font-bold hover:bg-red-600/10 transition text-sm cursor-pointer disabled:opacity-50"
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
