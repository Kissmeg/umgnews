import { useState } from 'react'
import Login from './Pages/Login'
import { useAuth } from './Context/useAuth'
import Dashboard from './Pages/Dashboard'

function App() {
  const {isAuthenticated} = useAuth();

  return (
    <div className=''>
      {isAuthenticated ? <Dashboard/> : <Login/>}    
    </div>
  )
}

export default App
