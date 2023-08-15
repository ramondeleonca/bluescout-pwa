import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./global.scss"
import { BrowserRouter, Route, Routes } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <React.StrictMode>
      <BrowserRouter future={{ v7_startTransition: true }}>
        <Routes>
          <Route path="/" element={<App></App>} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </>
)
