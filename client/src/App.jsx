import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Notes from './pages/Notes'
import Path from './pages/Portals/Path'
function App() {
  
  return (
    <>
  
    <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/Notes" element={<Notes/>} />
     <Route path='/Path' element={<Path/>} />
    </Routes> 
    </>
  )
}

export default App
