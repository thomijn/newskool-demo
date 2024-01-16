import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import ImageScrollAnimation from './OnScrollTest'
import ReactLenis from '@studio-freight/react-lenis'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReactLenis root>
      <ImageScrollAnimation />
    </ReactLenis>
  </React.StrictMode>,
)
