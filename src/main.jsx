import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useGLTF } from '@react-three/drei'
useGLTF.preload('/portfolioMartons/models/laptop.glb')
useGLTF.preload('/portfolioMartons/models/hacker_room.glb')
import React, { use } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import './index.css'

const router = createBrowserRouter([{path: "/*", element: <App/>}]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
