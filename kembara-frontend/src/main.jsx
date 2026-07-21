import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import DestinationDetail from './pages/DestinationDetail.jsx'
import BookingPage from './pages/BookingPage.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/destination/:slug" element={<DestinationDetail />} />
        <Route path="/booking/:slug" element={<BookingPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
