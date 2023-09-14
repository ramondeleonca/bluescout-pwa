import React from 'react'
import ReactDOM from 'react-dom/client'
import Index from './pages/index'
import "./styles/global.scss"
import { BrowserRouter, Route, Routes } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <React.StrictMode>
      <BrowserRouter future={{ v7_startTransition: true }}>
        <Routes>
          <Route path="/" element={<Index></Index>} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </>
)
