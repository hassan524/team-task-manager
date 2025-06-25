// import { StrictMode } from 'react' 
import { createRoot } from 'react-dom/client'
import './assets/globals.css'
import './assets/style.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
