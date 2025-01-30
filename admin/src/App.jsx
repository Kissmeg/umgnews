import { useState } from 'react'
import Login from './Pages/Login'
import { useAuth } from './Context/useAuth'
import Dashboard from './Pages/Dashboard'
import MobileMenu from './Components/MobileMenu';

function App() {
  const {isAuthenticated} = useAuth();

  return (
    <div className=''>
      {isAuthenticated ? <Dashboard/> : <Login/>} 
    </div>
  )
}

export default App
