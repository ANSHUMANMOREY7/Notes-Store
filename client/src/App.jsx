import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Path from './pages/Portals/Path'
import Students from "./pages/Portals/Students"
import AdminLogin from "./pages/Portals/AdminLogin"
import Admin from "./pages/Portals/Admin"
import Footer from './components/Footer'

function App() {
  
  return (
    
    
  <div className="flex flex-col min-h-screen">
    <main className="flex-grow">
    <Routes>
     <Route path="/" element={<Home />} />
     <Route path='/Path' element={<Path/>} />
     <Route path="/Student" element={<Students/>} />
     <Route path="/Admin-login" element={<AdminLogin/>} />
     <Route path='/Admin' element={<Admin/>}/>
     <Route path='/Footer' element={<Footer/>} />
    </Routes> 
    </main>
    <Footer />
    </div>
    
  )
}

export default App
