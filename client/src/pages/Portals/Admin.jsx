import { memo, useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ShieldCheck, CloudUpload } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const getUnitLabel = (u) => (u === "QB" ? "Question Bank" : `Unit ${u}`);

const Admin = () => {
  const isAuth = sessionStorage.getItem("adminToken");

  const [showModal, setShowModal] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [file, setFile] = useState(null);

  const [subject, setSubject] = useState("");
  const [existingNotes, setExistingNotes] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [subjectLoadError, setSubjectLoadError] = useState(false);
  const [addingNewSubject, setAddingNewSubject] = useState(false);
  const [semester, setSemester] = useState("");
  const [unit, setUnit] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const checkSuperAdmin = async () => {
      try {
        const token = sessionStorage.getItem("adminToken");

        if (!token) return;

        await axios.get(`${API_URL}/api/super-admin/faculty`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsSuperAdmin(true);

      } catch {
        setIsSuperAdmin(false);
      }
    };

    checkSuperAdmin();
  }, []);
  // Fetch existing subjects when upload modal opens
  useEffect(() => {
    if (!showModal) return;

    const fetchSubjects = async () => {
      setLoadingSubjects(true);
      setSubjectLoadError(false);
      setExistingNotes([]);

      try {
        const res = await axios.get(`${API_URL}/api/notes`);
        setExistingNotes(res.data);
      } catch (error) {
        setSubjectLoadError(true);
        console.error("Failed to fetch subjects:", error);
        toast.error("Failed to load subjects");
      } finally {
        setLoadingSubjects(false);
      }
    };

    fetchSubjects();
  }, [showModal]);

  const availableSubjects = [
    ...new Map(
      existingNotes
        .filter((note) => Number(note.semester) === Number(semester))
        .filter((note) => note.subject?.trim())
        .map((note) => {
          const name = note.subject.trim().replace(/\s+/g, " ");
          return [name.toLowerCase(), name];
        })
    ).values(),
  ].sort((a, b) => a.localeCompare(b));

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData();

    formData.append("title", subject);
    formData.append("subject", subject);
    formData.append("semester", semester);
    formData.append("unit", unit);
    formData.append("description", description);
    formData.append("file", file);

    try {

      const token = sessionStorage.getItem("adminToken");

      await axios.post(`${API_URL}/api/notes/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      toast.success("Note uploaded successfully!");

      setShowModal(false);
      setFile(null);
      setSubject("");
      setSemester("");
      setAddingNewSubject(false);
      setUnit("");
      setDescription("");
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Error uploading file."
      );
    } finally {
      setUploading(false);
    }
  };

  if (!isAuth) return <Navigate to="/admin-login" />;

  return (
    <>
      <Navbar />
      <div className=" font-[font1] min-h-screen bg-gradient-to-b from-black to-purple-900 text-white relative transition-colors duration-500">

<div className="admin-content max-w-7xl mx-auto p-10 !pt-24 relative z-10">

<div className="relative pb-1 mb-4">
  <div className="text-center">
    <h2 className="text-4xl font-bold text-white mb-2 font-[font1]">
      Admin Panel
    </h2>
    <p className="text-gray-300 font-normal font-sans mb-2 md:mb-10 text-center">
      Manage your notes and uploads. Add, view, and delete study materials from a single secure dashboard.
    </p>
  </div>
</div>

            <div className="admin-card-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 !gap-10 !mt-6">
              <div className="bg-black/70 backdrop-blur-md p-10 min-h-[340px] w-full rounded-2xl flex flex-col items-center text-center gap-6 border border-white/5 shadow-2xl hover:scale-105 transition hover:bg-purple-900 group ">
                <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center text-4xl animate-pulse group-hover:animate-none">➕</div>
                <h2 className="text-2xl font-bold">Upload Notes</h2><p className="text-gray-400 text-center text-sm leading-relaxed">
                  upload your PDF study materials and notes to the repository with few clicks.
                </p>
                <button onClick={() => setShowModal(true)} className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg font-bold w-full transition cursor-pointer">Start Upload</button>
              </div>

              <div className=" bg-black/70 backdrop-blur-md p-10 min-h-[340px] w-full rounded-2xl flex flex-col items-center text-center  border border-white/5 shadow-2xl hover:scale-105 transition hover:bg-blue-900 group gap-6">
                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center text-4xl animate-pulse group-hover:animate-none">📝</div>
                <h2 className="text-2xl font-bold">Manage Notes</h2>
                <p className="text-gray-400 text-center text-sm leading-relaxed">
                  Manage your existing library. You can permanently delete outdated files.
                </p>
                <button onClick={() => navigate('/Admin/manage-notes')} className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-bold w-full transition cursor-pointer">View Library</button>

              </div>

              <div className="bg-black/70 backdrop-blur-md p-10 min-h-[340px] w-full rounded-2xl flex flex-col items-center text-center gap-6 border border-white/5 shadow-2xl hover:scale-105 transition hover:bg-green-900 group">
                <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center text-4xl animate-pulse group-hover:animate-none">📊</div>
                <h2 className="text-2xl font-bold">View Stats</h2>
                <p className="text-gray-400 text-center text-sm leading-relaxed">
                  Track total storage and total number of active materials in your database.
                </p>
                <button
                onClick={() => navigate("/admin/stats")}

                  className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg font-bold w-full transition cursor-pointer"
                >
                  View Analytics
                </button>
              </div>

              {/* Super Admin Card */}
              {isSuperAdmin && (
                <div className="bg-black/70 backdrop-blur-md p-10 min-h-[340px] w-full rounded-2xl flex flex-col items-center text-center gap-6 border border-white/5 shadow-2xl hover:scale-105 transition hover:bg-amber-900 group">

                  <div className="w-16 h-16 bg-amber-600/20 rounded-full flex items-center justify-center animate-pulse group-hover:animate-none">
                    <ShieldCheck className="w-9 h-9 text-amber-400" />
                  </div>

                  <h2 className="text-2xl font-bold">Manage Faculty</h2>

                  <p className="text-gray-400 text-center text-sm leading-relaxed">
                    Authorize faculty emails and manage their access permissions.
                  </p>

                  <button
                    onClick={() => navigate("/admin/super-admin")}
                    className="bg-amber-600 hover:bg-amber-700 px-8 py-3 rounded-lg font-bold w-full transition cursor-pointer"
                  >
                    Manage Access
                  </button>

                </div>
              )}

            </div>
        </div>

  {showModal && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-2">
                <div className="relative bg-[#121212] border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl">
              <h2 className="text-2xl font-bold mb-2 text-purple-400">Add New Note</h2>
              <form onSubmit={handleUpload}>
                <fieldset
                  disabled={uploading}
                  className="flex flex-col gap-3 disabled:cursor-not-allowed"
                >
                  {/* Semester */}
                  <select
                    required
                    className="bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-purple-500 text-gray-400"
                    value={semester}
                    onChange={(e) => {
                      setSemester(e.target.value);
                      setSubject("");
                      setAddingNewSubject(false);
                    }}
                  >
                    <option value="" className="bg-black">
                      Select Semester
                    </option>

                    {[1, 2, 3, 4].map((sem) => (
                      <option key={sem} value={sem} className="bg-black">
                        Semester {sem}
                      </option>
                    ))}
                  </select>

                  {/* Subject */}
                  <select
                    required
                    disabled={!semester || loadingSubjects || uploading || subjectLoadError}
                    className="bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-purple-500 text-gray-400 disabled:opacity-40 disabled:cursor-not-allowed"
                    value={addingNewSubject ? "__new__" : subject}
                    onChange={(e) => {
                      if (e.target.value === "__new__") {
                        setAddingNewSubject(true);
                        setSubject("");
                      } else {
                        setAddingNewSubject(false);
                        setSubject(e.target.value);
                      }
                    }}
                  >
                    <option value="" className="bg-black">
                      {loadingSubjects
                        ? "Loading Subjects..."
                        : !semester
                          ? "Select Semester First"
                          : "Select Subject"}
                    </option>

                    {availableSubjects.map((sub) => (
                      <option key={sub} value={sub} className="bg-black">
                        {sub}
                      </option>
                    ))}

                    <option value="__new__" className="bg-black">
                      + Add New Subject
                    </option>
                  </select>

                  {/* Subject Name Box */}
                  <input
                    type="text"
                    placeholder={
                      addingNewSubject
                        ? "Enter New Subject Name"
                        : "Selected Subject Name"
                    }
                    required={addingNewSubject}
                    disabled={!addingNewSubject || uploading}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className={`w-full min-w-0 h-[50px] p-3 rounded-xl outline-none transition-all duration-300 ${addingNewSubject
                        ? "bg-white/5 border border-white/10 text-white focus:border-purple-500"
                        : "bg-white/[0.02] border border-dashed border-white/10 text-gray-500 cursor-not-allowed"
                      }`}
                  />

                  {/* Unit */}
                  <select
                    required
                    className="bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-purple-500 text-gray-400"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                  >
                    <option value="" className="bg-black">Select Unit</option>
                    {[1, 2, 3, 4, 5, "QB"].map((u) => (
                      <option key={u} value={u} className="bg-black">
                        {getUnitLabel(u)}
                      </option>
                    ))}
                  </select>

                  {/* About Notes */}
                  <textarea
                    placeholder="About these notes (optional)"
                    rows="3"
                    className="bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-purple-500 text-white resize-none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <input
                    type="file" accept="application/pdf" required
                    className="text-sm text-gray-400 file:bg-purple-600 file:text-white file:border-0 file:px-4 file:py-3 file:rounded-xl"
                    onChange={(e) => {
                      const selectedFile = e.target.files[0];

                      if (!selectedFile || selectedFile.type !== "application/pdf") {
                        setFile(null);
                        e.target.value = "";
                        if (selectedFile) {
                          toast.error("Please select a valid PDF file");
                        }
                        return;
                      }

                      setFile(selectedFile);
                    }}
                  />
                  <div className="flex gap-3 mt-4 h-12">

  {/* Cancel Button */}
  <button
    type="button"
    disabled={uploading}
    onClick={() => {
      setShowModal(false);
      setSubject("");
      setSemester("");
      setUnit("");
      setDescription("");
      setFile(null);
      setAddingNewSubject(false);
    }}
    className="flex-1 bg-white/10 py-3 rounded-xl hover:bg-white/20 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
  >
    Cancel
  </button>

  {/* Upload Button */}
  <button
    type="submit"
    disabled={
      uploading ||
      loadingSubjects ||
      subjectLoadError ||
      !semester ||
      !subject.trim() ||
      !unit ||
      !file
    }
    className="flex-1 bg-purple-600 py-3 rounded-xl font-bold hover:bg-purple-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
  >
    Upload
  </button>

</div>
                    
                </fieldset>
              </form>
              {/* Half Card Upload Animation */}
{uploading && (
  <div
    role="status"
   className="absolute bottom-0 left-0 right-0 h-[45%] z-20 bg-gradient-to-b from-[#121212] to-[#241334] rounded-b-3xl flex flex-col items-center justify-center gap-2 px-6 text-center border-t border-purple-500/20"
  >

    {/* Animated Upload Ring */}
    <div className="relative w-16 h-16 sm:w-[88px] sm:h-[88px] shrink-0 flex items-center justify-center">

      {/* Background Ring */}
      <div className="absolute inset-0 rounded-full border-[3px] border-purple-500/20" />

      {/* Rotating Ring */}
      <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-purple-500 border-r-purple-500/30 animate-spin" />

      {/* Animated Cloud Icon */}
      <CloudUpload className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400 animate-[uploadFloat_1.5s_ease-in-out_infinite]" />

    </div>

    <h2 className="font-[font1] text-xl sm:text-2xl font-bold tracking-wide">
      Uploading Notes
    </h2>

    <p className="text-gray-400 text-xs sm:text-sm">
      Securely uploading your PDF...
    </p>

    {/* Animated Loading Bar */}
    <div className="w-[85%] h-1 bg-purple-500/20 rounded-full overflow-hidden">
      <div className="h-full w-1/3 bg-purple-500 rounded-full animate-[uploadSlide_1.5s_ease-in-out_infinite]" />
    </div>

    <p className="text-gray-500 text-[11px]">
      Please do not close this page.
    </p>

  </div>
)}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default memo(Admin);