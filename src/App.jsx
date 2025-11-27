import { useState } from 'react'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Homepage from './component/Homepage'
import NotFound from './component/NotFound'
import './App.css'
import Header from './component/Header'
import Footer from './component/Footer'
// import Work from './component/Work';
// import About from './component/About';
// import Journal from './component/Journal';
// import Contact from './component/Contact';
// import Project from './component/Project';
// import JournalItem from './component/JournalItem';

function App() {
  const [count, setCount] = useState(0)
  const footerText = "Raffaele Martone - Portfolio";


  return (
    <>
      <div className="page-container">
        <Header />
        <main className="content">
          <Routes>
            <Route
              path="/portfolioMartons" element={
                <Homepage />
              }>
            </Route>
            {/* <Route
              path="/portfolioMartons/work" element={
                <Work />
              }>
            </Route>
            <Route
              path="/portfolioMartons/work/:id" element={<Project/>
              }>
            </Route>
            <Route
              path="/portfolioMartons/about" element={
                <About />
              }>
            </Route>
            <Route
              path="/portfolioMartons/journal" element={
                <Journal />
              }>
            </Route>
            <Route
              path="/portfolioMartons/journal/:id" element={
                <JournalItem />
              }>
            </Route>
            <Route
              path="/portfolioMartons/contact" element={
                <Contact />
              }>
            </Route> */}
            <Route path="/portfolioMartons/*" element={<NotFound />}> </Route> 
          </Routes> 
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
