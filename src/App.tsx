import { useState, useEffect } from 'react'
import './App.scss'
import NavBar from './components/Navbar/NavBar';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './app/store';
import { fetchCart } from './features/cartSlice';

function App() {
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector(
    (state: RootState) => state.cart,
  );

  useEffect(() => {
    dispatch(fetchCart());
  }, [cart?.total_items, cart?.updated])

  return (
    <div className="App">
      <header>
        <NavBar totalBooks={cart?.total_items} />
      </header>
      <main className='mt-main mb-5'>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App
