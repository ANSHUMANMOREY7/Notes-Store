import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Notes from './pages/Notes'
function App() {
  
  return (
    <>
  <h1>Notes Store</h1>
    <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/Notes" element={<Notes/>} />
    </Routes> 
    </>
  )
}

export default App
