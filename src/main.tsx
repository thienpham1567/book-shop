import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import App from './App';
import Home from './pages/Home/Home';
import Fiction from './pages/Categories/Fiction/Fiction';
import Book from './components/Book/Book';
import Cart from './pages/Cart/Cart';
import SearchBooksList from './pages/SearchBooksList/SearchBooksList';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="search/" element={<SearchBooksList />} />
            <Route path="cart" element={<Cart />} />
            <Route path="categories/fiction" element={<Fiction />}>
              <Route path=":title/:id" element={<Book />} />
              <Route path=":category/" element={<Fiction />}>
                <Route path=":title/:id" element={<Book />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Provider>
    </Router>
  </React.StrictMode>,
);
