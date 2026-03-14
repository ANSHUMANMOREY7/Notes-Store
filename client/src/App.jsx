import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Notes from './pages/Notes'
import Path from './pages/Portals/Path'
import Students from "./pages/Portals/Students"
import AdminLogin from "./pages/Portals/AdminLogin"
function App() {
  
  return (
    <>
  
    <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/Notes" element={<Notes/>} />
     <Route path='/Path' element={<Path/>} />
     <Route path="/Student" element={<Students/>} />
     <Route path="/Admin" element={<AdminLogin/>} />
    </Routes> 
    </>
  )
}

export default App
