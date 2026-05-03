import { memo, useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer';



const Students = () => {
  
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/notes")
      .then(res => setNotes(res.data))
      .catch(err => console.log(err));
  }, []);
  return (
    <>
    <div className='bg-black w-screen min-h-screen relative'>
        <Navbar />
      <h2> Students</h2>
      <div className="relative z-10 flex flex-col items-center mt-10 gap-4 text-white">
  {notes.map((note, index) => (
    <a
      key={index}
      href={`http://localhost:5000${note.path}`}
      target="_blank"
      rel="noreferrer"
      className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
    >
      {note.filename}
    </a>
  ))}
</div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black to-green-900">

  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"10%",left:"20%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"15%",left:"50%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"20%",left:"80%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"30%",left:"10%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"40%",left:"70%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"50%",left:"30%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"60%",left:"90%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"70%",left:"40%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"80%",left:"60%"}}></div>
  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top:"90%",left:"15%"}}></div>

  <div className="absolute w-2 h-2 bg-purple-300 rounded-full animate-pulse" style={{top:"25%",left:"45%"}}></div>
  <div className="absolute w-2 h-2 bg-blue-200 rounded-full animate-pulse" style={{top:"55%",left:"75%"}}></div>

</div>
    </div>
    
    </>
  );
};

export default memo(Students);