import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './app/store'
import { Provider } from 'react-redux';
import App from './App'
import Hero from './components/Hero/Hero'
import Fiction from './pages/Categories/Fiction/Fiction';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<App />}>
            <Route path='/' element={<Hero />} />
            <Route path='/categories/fiction' element={<Fiction />} />
          </Route>
        </Routes>
      </Provider>
    </Router>
  </React.StrictMode>
)
