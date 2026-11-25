import { Route, Routes, useLocation } from 'react-router-dom'
import StarsBackground from './components/StarBackground'
import Home from './pages/Home/Home'
import Path from './pages/Portals/Path'
import Students from "./pages/Portals/Students"
import AdminLogin from "./pages/Portals/AdminLogin"
import Admin from "./pages/Portals/Admin"
import AdminManageNotes from "./pages/Portals/AdminManageNotes"
import AdminStats from "./pages/Portals/AdminStats";
import SuperAdmin from "./pages/Portals/SuperAdmin";
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import StaffRegister from "./pages/Portals/StaffRegister";
import ProtectedRoute from "./pages/Portals/ProtectedRoute";
import { Toaster } from 'react-hot-toast'

function App() {
  const location = useLocation();
  return (
    
    
  <div className="flex flex-col min-h-screen">
    <Toaster 
        position="center-top"
       toastOptions={{
  style: {
    background: '#1a1717', 
    color: '#fff',        
    borderRadius: '16px',
    fontSize: '14px',
    padding: '16px',
  
  },
  success: {
   
    iconTheme: {
      primary: '#22c55e',   
      secondary: '#fff',  
    },
  
  },
  error: {
    iconTheme: {
      primary: '#ef4444',   
      secondary: '#fff',
    },
  
  }
}}
      />
    
        <ScrollToTop />
    <StarsBackground semester={location.pathname + location.search} />
    <main className="flex-grow">
    <Routes>
      <Route path='/Contact' element={<ContactUs />} />
      <Route path="/" element={<Home />} />
     <Route path='/Path' element={<Path/>} />
     <Route path="/Student" element={<Students/>} />
     <Route path="/Admin-login" element={<AdminLogin/>} />
     <Route path="/Staff-register" element={<StaffRegister/>} />
     <Route
  path="/Admin/manage-notes"
  element={
    <ProtectedRoute>
      <AdminManageNotes />
    </ProtectedRoute>
  }
/>
     <Route
  path="/admin"
  element={
    <ProtectedRoute>
      <Admin />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/stats"
  element={
    <ProtectedRoute>
      <AdminStats />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/super-admin"
  element={
    <ProtectedRoute>
      <SuperAdmin />
    </ProtectedRoute>
  }
/>
     <Route path="/about" element={<AboutUs />} />
    </Routes> 
    </main>
        <div className="relative z-10">
      <Footer />
    </div>
    </div>
    
  )
}

export default App
