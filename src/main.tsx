import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './app/store'
import { Provider } from 'react-redux';
import App from './App'
import Home from './pages/Home/Home';
import Fiction from './pages/Categories/Fiction/Fiction';
import Horror from './pages/Categories/Fiction/Horror';
import Historical from './pages/Categories/Fiction/Historical';
import Manga from './pages/Categories/Fiction/Manga';
import ComicAndGraphicNovels from './pages/Categories/Fiction/ComicAndGraphicNovels';
import Fantasy from './pages/Categories/Fiction/Fantasy';
import Romance from './pages/Categories/Fiction/Romance';
import Book from './components/Book/Book';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<App />}>
            <Route path='' element={<Home />} />
            <Route path='books/:id' element={<Book />} />
            <Route path='categories/fiction/' element={<Fiction />} >
              <Route path='fantasy' element={<Fantasy />} />
              <Route path='manga' element={<Manga />} />
              <Route path='romance' element={<Romance />} />
              <Route path='comics-graphic-novels' element={<ComicAndGraphicNovels />} />
              <Route path='historical-fiction' element={<Historical />} />
              <Route path='horror' element={<Horror />} />
            </Route>
          </Route>
        </Routes>
      </Provider>
    </Router>
  </React.StrictMode>
)
