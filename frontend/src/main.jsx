import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { DocsContextProvider } from './context/DocsContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <DocsContextProvider>

  <App />
  </DocsContextProvider>
  </BrowserRouter>,
)
