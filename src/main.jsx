import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useGLTF } from '@react-three/drei'
useGLTF.preload('/portfolioMartons/models/laptop.glb')
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
