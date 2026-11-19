import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import Slides from './Slides.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Slides />
  </StrictMode>,
)
