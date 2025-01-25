import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Context/useAuth.jsx'
import JSXContext from './Context/JSXContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <JSXContext>
        <App />
      </JSXContext>
    </AuthProvider>
  </BrowserRouter>,
)
