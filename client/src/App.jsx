import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Notes from './pages/Notes'
import Path from './pages/Portals/Path'
import Students from "./pages/Portals/Students"
function App() {
  
  return (
    <>
  
    <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/Notes" element={<Notes/>} />
     <Route path='/Path' element={<Path/>} />
     <Route path="/Student" element={<Students/>} />
    </Routes> 
    </>
  )
}

export default App
