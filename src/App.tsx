import { useState, useEffect } from 'react'
import './App.scss'
import NavBar from './components/Navbar/NavBar';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App
