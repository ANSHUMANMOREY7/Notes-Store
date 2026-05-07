import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Path from './pages/Portals/Path'
import Students from "./pages/Portals/Students"
import AdminLogin from "./pages/Portals/AdminLogin"
import Admin from "./pages/Portals/Admin"
import AdminManageNotes from "./pages/Portals/AdminManageNotes"
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import { Toaster } from 'react-hot-toast'

function App() {
  
  
  return (
    
    
  <div className="flex flex-col min-h-screen">
    <Toaster 
        position="center-top"
        toastOptions={{
         
          style: {
            background: '#1a1a1a', 
            color: '#fff',        
            border: '1px solid #a855f7', 
            borderRadius: '16px',
            fontSize: '14px',
            padding: '16px',
            boxShadow: '0 4px 20px rgba(168, 85, 247, 0.2)',
          },
          success: {
            iconTheme: {
              primary: '#a855f7',
              secondary: '#fff',
            },
          },
        }}
      />
    
    <ScrollToTop />
    <main className="flex-grow">
    <Routes>
      <Route path='/Contact' element={<ContactUs />} />
      <Route path="/" element={<Home />} />
     <Route path='/Path' element={<Path/>} />
     <Route path="/Student" element={<Students/>} />
     <Route path="/Admin-login" element={<AdminLogin/>} />
     <Route path='/Admin' element={<Admin/>}/>
     <Route path='/Admin/manage-notes' element={<AdminManageNotes/>} />
     <Route path="/about" element={<AboutUs />} />
     <Route path='/Footer' element={<Footer/>} />
    </Routes> 
    </main>
    <Footer />
    </div>
    
  )
}

export default App
