import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Notes from './pages/Notes'
function App() {
  
  return (
    <>
  
    <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/Notes" element={<Notes/>} />
    </Routes> 
    </>
  )
}

export default App
